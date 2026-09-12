import { defineCliConfig } from 'sanity/cli'

// Filled in automatically once you run `pnpm dlx sanity@latest init --env` here,
// or set these in studio/.env (SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET)
// after creating the project at sanity.io/manage.
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '<your-project-id>',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // New projects get this on by default — the Studio's core bundle is then
  // served from Sanity's CDN at whatever the current `latest` release is,
  // rather than whatever happened to be in node_modules at install time.
  // Since this project was hand-written rather than scaffolded with
  // `sanity init`, it's set explicitly here. The `sanity`/`@sanity/vision`/
  // `@sanity/icons` versions in package.json still matter for TypeScript
  // types and for `sanity build`'s dependency resolution — run
  // `pnpm outdated` after your first install and bump them if newer
  // versions are out.
  autoUpdates: true,
})
