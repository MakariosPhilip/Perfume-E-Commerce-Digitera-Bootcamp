import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-09-23'})

const taxonomies = {
  category: [
    {title: 'Pure Extractions', slug: 'pure-extractions'},
    {title: 'Private Reserve', slug: 'private-reserve'},
    {title: 'Atelier Oils', slug: 'atelier-oils'},
    {title: 'Discovery Vault', slug: 'discovery-vault'},
  ],
  scentFamily: [
    {title: 'Floral', slug: 'floral'},
    {title: 'Woody', slug: 'woody'},
    {title: 'Oriental', slug: 'oriental'},
    {title: 'Fresh', slug: 'fresh'},
  ],
  occasion: [
    {title: 'Personal Use', slug: 'personal-use'},
    {title: 'Wedding', slug: 'wedding'},
    {title: 'Gift Sets', slug: 'gift-sets'},
    {title: 'Birthday', slug: 'birthday'},
  ],
} as const

async function ensureTaxonomy(type: string, title: string, slug: string) {
  const existingId = await client.fetch<string | null>(
    `*[_type == $type && slug.current == $slug && !(_id in path("drafts.**"))][0]._id`,
    {type, slug},
  )

  if (existingId) return existingId

  const created = await client.create({
    _type: type,
    title,
    slug: {_type: 'slug', current: slug},
  })

  return created._id
}

async function seed() {
  for (const [type, items] of Object.entries(taxonomies)) {
    for (const item of items) {
      const id = await ensureTaxonomy(type, item.title, item.slug)
      console.log(`${type} ${item.slug} -> ${id}`)
    }
  }
}

seed().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
