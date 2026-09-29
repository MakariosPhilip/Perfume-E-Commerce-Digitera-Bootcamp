import {createReadStream} from 'node:fs'
import {readdir} from 'node:fs/promises'
import {randomUUID} from 'node:crypto'
import {dirname, extname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-09-23'})
const imageDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '../../website/public/images/products')

type ProductDocument = {
  _id: string
  name: string
  slug: string
  images?: unknown[] | null
}

async function importProductImages() {
  const files = (await readdir(imageDirectory))
    .filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
    .sort((left, right) => left.localeCompare(right, undefined, {numeric: true}))
  const filesBySlug = new Map<string, string[]>()

  for (const file of files) {
    const slug = file.replace(extname(file), '').replace(/-\d+$/, '')
    filesBySlug.set(slug, [...(filesBySlug.get(slug) ?? []), file])
  }

  const slugs = [...filesBySlug.keys()]
  const products = await client.fetch<ProductDocument[]>(
    `*[_type == "product" && slug.current in $slugs && !(_id in path("drafts.**"))] {
      _id,
      name,
      "slug": slug.current,
      images
    }`,
    {slugs},
  )

  for (const slug of slugs) {
    const matches = products.filter((product) => product.slug === slug)

    if (matches.length !== 1) {
      console.log(`${slug}: skipped (${matches.length ? 'multiple matching products' : 'no product'})`)
      continue
    }

    const product = matches[0]
    if (product.images?.length) {
      console.log(`${slug}: skipped (images already exist)`)
      continue
    }

    const images = []
    for (const [index, file] of (filesBySlug.get(slug) ?? []).entries()) {
      const asset = await client.assets.upload('image', createReadStream(join(imageDirectory, file)), {
        filename: file,
      })

      images.push({
        _key: randomUUID(),
        _type: 'image' as const,
        asset: {_type: 'reference' as const, _ref: asset._id},
        alt: `${product.name} product image ${index + 1}`,
      })
    }

    await client.patch(product._id).set({images}).commit()
    console.log(`${slug}: imported ${images.length} image(s)`)
  }
}

importProductImages().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})