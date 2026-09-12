require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
})

async function main() {
  const programmes = await client.fetch(`*[_type=="programme"]{_id,title,"assetId":image.asset._ref}`)
  const homePage = await client.fetch(`*[_id=="homePage"][0]{"assetId":hero.image.asset._ref}`)
  const existingSingletons = await client.fetch(
    `*[_id in ["aboutPage","programmesPage","projectsImpactPage","newsEventsPage","donatePage","leadershipPage","contactPage"]]{_id}`,
  )
  const siteSettings = await client.fetch(`*[_id=="siteSettings"][0]{navLinks,footerColumns}`)
  console.log(JSON.stringify({ programmes, homePage, existingSingletons, siteSettings }, null, 2))
}
main().catch((e) => { console.error(e); process.exit(1) })
