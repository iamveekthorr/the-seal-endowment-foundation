import { NextResponse } from 'next/server'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { writeClient } from '@/sanity/lib/writeClient'

// TEMPORARY one-time seed route — uploads public/logo.png as a Sanity asset
// and sets it as the `logo` field on the siteSettings singleton. Delete this
// route after running it once.
export async function POST() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'logo.png')
    const buffer = await readFile(filePath)

    const asset = await writeClient.assets.upload('image', buffer, {
      filename: 'the-seals-logo.png',
      contentType: 'image/png',
    })

    const result = await writeClient
      .patch('siteSettings')
      .set({
        logo: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
          alt: 'The Seals Endowment Foundation official logo',
        },
      })
      .commit()

    return NextResponse.json({ ok: true, assetId: asset._id, documentId: result._id })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}
