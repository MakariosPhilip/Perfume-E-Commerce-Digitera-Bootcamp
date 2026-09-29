import {createReadStream, existsSync} from 'node:fs'
import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-09-23'})
const publishedClient = client.withConfig({perspective: 'published'})
const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const imageDirectories = [
  resolve(scriptDirectory, '../../website/public/images/products'),
  resolve(scriptDirectory, '../imgs'),
]

const catalog = [
  {
    name: 'Aurelian Bloom',
    slug: 'aurelian-bloom',
    description: 'A radiant floral extrait with luminous jasmine and soft white musk.',
    notes: 'Floral / Jasmine & White Musk',
    price: 195,
    category: 'pure-extractions',
    scentFamily: 'floral',
    occasion: 'personal-use',
    image: 'fleur-de-lune.png',
  },
  {
    name: 'Cedar Veil',
    slug: 'cedar-veil',
    description: 'Polished cedarwood meets creamy sandalwood in a quiet, lasting trail.',
    notes: 'Woody / Cedar & Sandalwood',
    price: 220,
    category: 'pure-extractions',
    scentFamily: 'woody',
    occasion: 'wedding',
    image: 'santal-parchment.png',
  },
  {
    name: 'Amber Current',
    slug: 'amber-current',
    description: 'A deep amber accord warmed by resin, spice, and a trace of tobacco.',
    notes: 'Oriental / Amber & Resin',
    price: 245,
    category: 'pure-extractions',
    scentFamily: 'oriental',
    occasion: 'gift-sets',
    image: 'noir-cocoon.png',
  },
  {
    name: 'Citrus Reverie',
    slug: 'citrus-reverie',
    description: 'Bright bergamot and sea air settle into a clean, mineral finish.',
    notes: 'Fresh / Bergamot & Sea Salt',
    price: 185,
    category: 'pure-extractions',
    scentFamily: 'fresh',
    occasion: 'birthday',
    image: 'sol-dor.png',
  },
  {
    name: 'Velvet Petal',
    slug: 'velvet-petal',
    description: 'Velvety rose petals unfold over a smooth base of amber and musk.',
    notes: 'Floral / Rose & Amber',
    price: 235,
    category: 'private-reserve',
    scentFamily: 'floral',
    occasion: 'wedding',
    image: 'rose-absolute.png',
  },
  {
    name: 'Smoked Santal',
    slug: 'smoked-santal',
    description: 'Sandalwood and cardamom are deepened with a fine, smoky accord.',
    notes: 'Woody / Santal & Cardamom',
    price: 275,
    category: 'private-reserve',
    scentFamily: 'woody',
    occasion: 'gift-sets',
    image: 'santal-parchment-2.png',
  },
  {
    name: 'Midnight Resin',
    slug: 'midnight-resin',
    description: 'Incense, dark woods, and golden resins create a warm evening scent.',
    notes: 'Oriental / Incense & Golden Resin',
    price: 290,
    category: 'private-reserve',
    scentFamily: 'oriental',
    occasion: 'birthday',
    image: 'atelier-oud.png',
  },
  {
    name: 'Salted Bergamot',
    slug: 'salted-bergamot',
    description: 'A crisp citrus opening softened by marine notes and pale woods.',
    notes: 'Fresh / Bergamot & Driftwood',
    price: 205,
    category: 'private-reserve',
    scentFamily: 'fresh',
    occasion: 'personal-use',
    image: 'santal-parchment-3.png',
  },
  {
    name: 'Rose Atelier',
    slug: 'rose-atelier',
    description: 'A concentrated rose oil with a green opening and a velvety dry-down.',
    notes: 'Floral / Damask Rose & Green Stem',
    price: 260,
    category: 'atelier-oils',
    scentFamily: 'floral',
    occasion: 'gift-sets',
    image: 'santal-parchment-4.png',
  },
  {
    name: 'Oud Nocturne',
    slug: 'oud-nocturne',
    description: 'Textured oud oil layered with cedar, saffron, and a smooth balsamic base.',
    notes: 'Woody / Oud & Saffron',
    price: 340,
    category: 'atelier-oils',
    scentFamily: 'woody',
    occasion: 'birthday',
    image: 'fleur-de-lune-detail.png',
  },
  {
    name: 'Saffron Ember',
    slug: 'saffron-ember',
    description: 'Saffron and warm amber glow above a rich, softly spiced heart.',
    notes: 'Oriental / Saffron & Amber',
    price: 315,
    category: 'atelier-oils',
    scentFamily: 'oriental',
    occasion: 'personal-use',
    image: 'noir-cocoon-detail.png',
  },
  {
    name: 'Neroli Tide',
    slug: 'neroli-tide',
    description: 'Neroli and petitgrain bring a fresh citrus clarity to soft white woods.',
    notes: 'Fresh / Neroli & Petitgrain',
    price: 255,
    category: 'atelier-oils',
    scentFamily: 'fresh',
    occasion: 'wedding',
    image: 'santal-parchment-2-detail.png',
  },
  {
    name: 'Petal Sketch',
    slug: 'petal-sketch',
    description: 'A playful floral study pairing delicate peony with sheer musk.',
    notes: 'Floral / Peony & Sheer Musk',
    price: 145,
    category: 'discovery-vault',
    scentFamily: 'floral',
    occasion: 'birthday',
    image: 'santal-parchment-3-detail.png',
  },
  {
    name: 'Timber Study',
    slug: 'timber-study',
    description: 'A dry woods composition balancing vetiver, cedar, and soft spice.',
    notes: 'Woody / Vetiver & Cedar',
    price: 155,
    category: 'discovery-vault',
    scentFamily: 'woody',
    occasion: 'personal-use',
    image: 'atelier-oud-detail.png',
  },
  {
    name: 'Golden Incense',
    slug: 'golden-incense',
    description: 'An inviting incense accord brightened with citrus and golden resin.',
    notes: 'Oriental / Incense & Citrus Resin',
    price: 165,
    category: 'discovery-vault',
    scentFamily: 'oriental',
    occasion: 'wedding',
    image: 'rose-absolute-detail.png',
  },
  {
    name: 'Coastal Fig',
    slug: 'coastal-fig',
    description: 'Green fig leaves and sea breeze make a light, easy-wearing composition.',
    notes: 'Fresh / Fig Leaf & Sea Air',
    price: 150,
    category: 'discovery-vault',
    scentFamily: 'fresh',
    occasion: 'gift-sets',
    image: 'sol-dor-detail.png',
  },
] as const

type TaxonomyDocument = {
  _id: string
  _type: string
  slug: string
}

type ProductDocument = {
  _id: string
  slug: string
}

type ImageAsset = {
  _id: string
  originalFilename: string
}

async function replaceCatalog() {
  const [taxonomies, existingProducts, assets] = await Promise.all([
    publishedClient.fetch<TaxonomyDocument[]>(
      `*[_type in ["category", "scentFamily", "occasion"] && defined(slug.current)] {
        _id,
        _type,
        "slug": slug.current
      }`,
    ),
    publishedClient.fetch<ProductDocument[]>(
      `*[_type == "product" && slug.current in $slugs] {
        _id,
        "slug": slug.current
      }`,
      {slugs: catalog.map((product) => product.slug)},
    ),
    publishedClient.fetch<ImageAsset[]>(
      `*[_type == "sanity.imageAsset" && originalFilename in $filenames] {
        _id,
        originalFilename
      }`,
      {filenames: [...new Set(catalog.map((product) => product.image))]},
    ),
  ])

  const taxonomyIds = new Map<string, string>()
  for (const taxonomy of taxonomies) {
    const key = `${taxonomy._type}:${taxonomy.slug}`
    if (taxonomyIds.has(key)) throw new Error(`Duplicate taxonomy: ${key}`)
    taxonomyIds.set(key, taxonomy._id)
  }

  const productIds = new Map<string, string>()
  for (const product of existingProducts) {
    if (productIds.has(product.slug)) throw new Error(`Duplicate product: ${product.slug}`)
    productIds.set(product.slug, product._id)
  }

  for (const product of catalog) {
    if (!productIds.has(product.slug)) throw new Error(`Missing product: ${product.slug}`)
  }

  const assetIds = new Map<string, string>()
  for (const asset of assets) {
    if (assetIds.has(asset.originalFilename)) {
      throw new Error(`Duplicate image asset: ${asset.originalFilename}`)
    }
    assetIds.set(asset.originalFilename, asset._id)
  }

  for (const product of catalog) {
    for (const [type, slug] of [
      ['category', product.category],
      ['scentFamily', product.scentFamily],
      ['occasion', product.occasion],
    ]) {
      if (!taxonomyIds.has(`${type}:${slug}`)) {
        throw new Error(`Missing taxonomy: ${type}:${slug}`)
      }
    }
    if (
      !assetIds.has(product.image) &&
      !imageDirectories.some((directory) => existsSync(join(directory, product.image)))
    ) {
      throw new Error(`Missing image asset and local file: ${product.image}`)
    }
  }

  for (const image of new Set(catalog.map((product) => product.image))) {
    if (assetIds.has(image)) continue

    const imagePath = imageDirectories
      .map((directory) => join(directory, image))
      .find((path) => existsSync(path))
    if (!imagePath) throw new Error(`Missing local image file: ${image}`)

    const asset = await client.assets.upload('image', createReadStream(imagePath), {filename: image})
    assetIds.set(image, asset._id)
  }

  const transaction = client.transaction()

  for (const product of catalog) {
    const imageId = assetIds.get(product.image)!

    transaction.patch(productIds.get(product.slug)!, {
      set: {
        images: [
          {
            _key: product.slug,
            _type: 'image',
            asset: {_type: 'reference', _ref: imageId},
            alt: `${product.name} perfume bottle`,
          },
        ],
      },
    })
  }

  await transaction.commit()

  const result = await publishedClient.fetch<Array<{slug: string; imageId?: string}>>(
    `*[_type == "product" && slug.current in $slugs] {
      "slug": slug.current,
      "imageId": images[0].asset._ref
    }`,
    {slugs: catalog.map((product) => product.slug)},
  )
  const distinctImageIds = new Set(result.map((product) => product.imageId).filter(Boolean))

  console.log(`Updated images for ${result.length} products.`)
  console.log(`Distinct product images: ${distinctImageIds.size}`)

  if (
    result.length !== catalog.length ||
    distinctImageIds.size !== catalog.length ||
    result.some((product) => !product.imageId)
  ) {
    throw new Error('Product image verification failed after update')
  }
}

replaceCatalog().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})