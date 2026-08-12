import { execFile } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import { fileURLToPath } from 'url'

const execFileAsync = promisify(execFile)

const dirname = path.dirname(fileURLToPath(import.meta.url))

const seeds = [
  'seedCta.ts', // tworzy Homepage
  'seedHero.ts',
  'seedPainPoints.ts',
  'seedServices.ts',
  'seedExperienceAndTrust.ts',
  'seedOnboardingProcess.ts',
  'seedPersonalRelationship.ts',
  'seedTestimonials.ts',
  'seedTrustStatementAndStatistics.ts',
  'seedMenus.ts',
  'seedCategories.ts',
  'seedBlog.ts',
]

async function runSeed(file: string) {
  console.log(`\n▶ Running ${file}...`)

  try {
    const { stdout, stderr } = await execFileAsync(
      'pnpm',
      ['exec', 'tsx', path.join(dirname, file)],
      {
        // Payload's default upload.staticDir is relative to the process cwd.
        // Run every child seed from the Payload project root so uploads land
        // in /app/payload/media, which is the persistent Docker volume.
        cwd: path.resolve(dirname, '../..'),
      },
    )

    if (stdout) {
      process.stdout.write(stdout)
    }

    if (stderr) {
      process.stderr.write(stderr)
    }

    console.log(`✓ ${file} completed`)
  } catch (error) {
    console.error(`✗ ${file} failed`)
    throw error
  }
}

async function seed() {
  console.log('🌱 Starting Payload seed...\n')

  for (const seedFile of seeds) {
    await runSeed(seedFile)
  }

  console.log('\n✓ All seeds completed successfully')
}

seed().catch((error) => {
  console.error('\n✗ Seed failed')
  console.error(error)
  process.exit(1)
})
