import { getPayload } from 'payload'
import config from '../payload.config'
import { buildContent, type LexicalBlock as Block } from './lexicalBuilder'

const postContent: Record<string, Block[]> = {
  'tax-mistakes-every-business-owner-should-avoid': [
    { h: 2, text: 'Why These Mistakes Happen' },
    {
      p: "Most tax mistakes aren't the result of carelessness — they happen because business owners are juggling too many responsibilities at once. Recognizing the most common ones is the first step to avoiding them.",
    },
    { h: 3, text: 'The Most Common Mistakes' },
    {
      ul: [
        'Mixing personal and business expenses',
        'Missing quarterly filing deadlines',
        'Underreporting cash income',
        'Failing to keep receipts and supporting documents',
        'Misclassifying workers',
      ],
    },
    { h: 4, text: 'A Closer Look at Cash Reporting' },
    {
      p: 'Cash transactions are the easiest to underreport — and the easiest for tax authorities to flag during a review. Recording every cash payment as it happens, rather than from memory later, removes the guesswork entirely.',
    },
    { hr: true },
    { h: 2, text: 'The Cost of Getting It Wrong' },
    {
      p: 'Penalties for late or incorrect filings add up quickly, and repeated errors can trigger closer scrutiny from tax authorities. Beyond the financial cost, mistakes take time and energy away from running your business.',
    },
    {
      quote:
        "The businesses that struggle most with taxes aren't the ones with complicated finances — they're the ones without a system.",
    },
    { h: 3, text: 'Steps to Take Right Now' },
    {
      ol: [
        'Separate your business and personal accounts if you haven’t already',
        'Set calendar reminders for every filing deadline',
        'Start recording cash transactions daily',
        'Schedule a review with your accountant',
      ],
    },
    { h: 2, text: 'A Quick Self-Check' },
    {
      checklist: [
        { text: 'Business and personal expenses are kept separate', checked: true },
        { text: 'All quarterly deadlines are in a shared calendar', checked: true },
        { text: 'Cash income is logged as it comes in' },
        { text: 'Receipts are stored digitally, not in a shoebox' },
      ],
    },
    { h: 2, text: 'How to Stay Ahead' },
    { p: 'A simple routine — separate accounts, monthly bookkeeping, and a calendar of deadlines — prevents almost every mistake on this list before it happens.' },
  ],
  'what-every-employer-should-know-about-payroll': [
    { h: 2, text: 'The Basics of Running Payroll' },
    {
      p: 'Payroll is more than paying your employees on time. It covers tax withholding, social security contributions, and accurate recordkeeping — all of which carry legal obligations.',
    },
    { h: 3, text: 'What Every Pay Run Includes' },
    {
      ol: [
        'Calculating gross pay for each employee',
        'Withholding the correct taxes and contributions',
        'Issuing payslips',
        'Filing and remitting payments to the relevant authorities',
      ],
    },
    { h: 3, text: 'Common Employer Obligations' },
    {
      p: 'Employers are responsible for maintaining accurate employment records, meeting reporting deadlines, and staying current with changes in payroll regulations — even small errors can result in penalties.',
    },
    { h: 2, text: 'Getting Payroll Right From Day One' },
    { p: 'Setting up a clear payroll process early — rather than fixing problems after they appear — saves time and protects both the business and its employees.' },
  ],
  'when-is-the-right-time-to-hire-an-accountant': [
    { h: 2, text: 'Signs You Might Be Ready' },
    {
      ul: [
        "You're spending hours each week on bookkeeping instead of running your business",
        'Tax season feels stressful or confusing',
        "You're growing and your finances are getting more complex",
        "You've made costly mistakes in the past",
      ],
    },
    { h: 3, text: "It's Not Just About Size" },
    {
      p: "Even small businesses benefit from professional accounting support. It isn't about how big your business is — it's about how much time and confidence you want back.",
    },
    { h: 2, text: 'What to Expect From the Right Fit' },
    { p: 'A good accountant becomes a long-term partner — someone who understands your business well enough to give practical, timely advice, not just file your taxes once a year.' },
  ],
  'understanding-quarterly-tax-payments-for-small-businesses': [
    { h: 2, text: 'What Quarterly Payments Are For' },
    {
      p: 'Quarterly tax payments let you pay estimated taxes throughout the year instead of one large sum at the end. This helps avoid penalties and keeps your cash flow more predictable.',
    },
    { h: 3, text: 'How Payments Are Calculated' },
    {
      ol: [
        'Estimate your expected annual income',
        'Calculate the tax owed on that estimate',
        'Divide the total into four payments',
        'Adjust each quarter if your income changes',
      ],
    },
    { hr: true },
    { h: 2, text: 'What Happens If You Miss a Deadline' },
    { p: 'Missing a quarterly payment usually results in interest charges on the unpaid amount. Catching up as soon as possible limits how much extra you end up paying.' },
  ],
  'common-vat-mistakes-and-how-to-avoid-them': [
    { h: 2, text: 'Where VAT Errors Usually Start' },
    {
      p: 'VAT mistakes are rarely intentional — they usually come down to applying the wrong rate, missing a filing deadline, or misunderstanding what can be reclaimed.',
    },
    {
      ul: [
        'Applying the wrong VAT rate to a product or service',
        'Reclaiming VAT on non-eligible expenses',
        'Late or incomplete VAT returns',
        'Incorrect invoicing details',
      ],
    },
    { h: 2, text: 'Building a Reliable Process' },
    { p: 'Reviewing your VAT records monthly, rather than only at filing time, makes errors far easier to catch before they become a bigger problem.' },
  ],
  'year-end-tax-planning-checklist-for-business-owners': [
    { h: 2, text: 'Close the Year With Confidence' },
    { p: 'A little preparation before year-end can save significant time and stress once tax season arrives. Use this checklist as a starting point.' },
    {
      checklist: [
        { text: 'Reconcile bank and credit card statements', checked: true },
        { text: 'Review outstanding invoices and expenses', checked: true },
        { text: 'Confirm employee and contractor records are up to date' },
        { text: 'Estimate your tax liability for the year' },
        { text: 'Organize receipts and supporting documents' },
        { text: 'Schedule a year-end review with your accountant' },
      ],
    },
    { h: 3, text: "Why It's Worth Doing Early" },
    { p: "Starting this process in the fourth quarter — rather than in January — gives you time to make adjustments while they can still make a difference." },
  ],
  'how-to-correctly-classify-employees-vs-contractors': [
    { h: 2, text: 'Why Classification Matters' },
    {
      p: 'Misclassifying a worker affects tax withholding, benefits eligibility, and legal liability. Getting it wrong — even unintentionally — can lead to significant penalties.',
    },
    { h: 3, text: 'Key Differences to Look For' },
    {
      ul: [
        'How much control you have over how the work is done',
        'Whether the person works exclusively for your business',
        'Who provides the tools and equipment',
        'Whether the relationship is ongoing or project-based',
      ],
    },
    {
      quote: 'When in doubt, the safest approach is to review the relationship in detail — not just the job title.',
    },
    { h: 2, text: 'When to Ask for Help' },
    { p: "If you're unsure how a role should be classified, it's worth a short consultation before onboarding — correcting a misclassification later is far more disruptive." },
  ],
  'a-simple-guide-to-employee-benefits-and-payroll-deductions': [
    { h: 2, text: 'Mandatory vs. Optional Deductions' },
    {
      p: 'Every payslip includes a mix of deductions required by law and benefits your business chooses to offer. Understanding the difference helps you communicate pay clearly to employees.',
    },
    {
      ul: ['Income tax withholding', 'Social security contributions', 'Health insurance premiums', 'Retirement plan contributions'],
    },
    { h: 4, text: 'A Note on Voluntary Benefits' },
    { p: 'Optional benefits, like additional insurance or wellness programs, can be a strong recruitment tool — but they need to be tracked accurately in payroll to avoid errors.' },
    { h: 2, text: 'Keeping It Transparent' },
    { p: 'Clear, consistent payslips reduce employee questions and build trust — small details, like labeling deductions clearly, make a real difference.' },
  ],
  'what-to-do-when-payroll-goes-wrong': [
    { h: 2, text: 'First Steps After an Error' },
    {
      ol: [
        'Identify exactly what went wrong and which employees were affected',
        'Calculate the correct amount owed or overpaid',
        'Communicate with affected employees promptly',
        'Correct the payment as soon as possible',
        'Update your records and filings accordingly',
      ],
    },
    { hr: true },
    { h: 2, text: 'Preventing It From Happening Again' },
    {
      p: 'Most payroll errors come from manual data entry or last-minute changes. A consistent review step before every pay run catches the majority of issues before they reach employees.',
    },
  ],
  '5-signs-your-bookkeeping-needs-a-second-look': [
    { h: 2, text: 'Warning Signs to Watch For' },
    { p: "Bookkeeping problems rarely announce themselves clearly — they show up as small inconsistencies that add up over time." },
    {
      checklist: [
        { text: 'Bank statements no longer match your records' },
        { text: "Invoices are frequently sent late or forgotten" },
        { text: "You're unsure of your current cash position" },
        { text: 'Expenses are categorized inconsistently' },
        { text: 'Reports take longer than they should to prepare' },
      ],
    },
    { h: 3, text: 'What a Review Involves' },
    { p: 'A bookkeeping review checks that transactions are recorded correctly, accounts are reconciled, and reports reflect what is actually happening in your business.' },
  ],
  'how-to-prepare-your-business-for-a-successful-audit': [
    { h: 2, text: 'Audit-Ready, Year-Round' },
    {
      p: 'The businesses that handle audits smoothly are the ones that treat recordkeeping as an ongoing habit, not a last-minute scramble.',
    },
    { h: 3, text: 'What to Keep Organized' },
    {
      ul: ['Invoices and receipts', 'Bank and credit card statements', 'Payroll records', 'Tax filings and correspondence'],
    },
    {
      quote: 'An audit is far less stressful when your records already tell a clear, consistent story.',
    },
    { h: 2, text: 'During the Audit' },
    { p: 'Respond to requests promptly and clearly. Having a professional accountant involved from the start keeps communication accurate and reduces back-and-forth.' },
  ],
  'cash-flow-basics-every-business-owner-should-know': [
    { h: 2, text: 'Profit Is Not the Same as Cash' },
    {
      p: "It's possible to be profitable on paper and still run out of cash. Understanding the difference is one of the most important financial skills for a business owner.",
    },
    { h: 3, text: 'What Affects Your Cash Flow' },
    {
      ol: ['How quickly customers pay their invoices', 'How you manage inventory or upfront costs', 'Timing of loan repayments and large expenses', 'Seasonal changes in revenue'],
    },
    { hr: true },
    { h: 2, text: 'Building a Cash Flow Habit' },
    { p: 'Reviewing your cash position weekly — not just monthly — makes it far easier to spot problems early and plan ahead with confidence.' },
  ],
}

const postFaqs: Record<string, { question: string; answer: string }[]> = {
  'tax-mistakes-every-business-owner-should-avoid': [
    {
      question: 'What is the most common tax mistake small businesses make?',
      answer:
        'Mixing personal and business expenses is the most common one — it makes bookkeeping harder and can complicate what you are actually able to deduct.',
    },
    {
      question: 'How often should I review my books to avoid tax mistakes?',
      answer:
        'Monthly is a good baseline for most small businesses. Waiting until year-end makes it much harder to catch and fix errors before they become expensive.',
    },
    {
      question: 'Can a tax mistake trigger an audit?',
      answer:
        'Repeated or large discrepancies can increase scrutiny from tax authorities, but a single honest mistake, corrected promptly, is rarely a major issue on its own.',
    },
  ],
}

async function seed() {
  const payload = await getPayload({ config })

  for (const [slug, blocks] of Object.entries(postContent)) {
    const { docs } = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1 })
    const post = docs[0]

    if (!post) {
      console.log(`↷ Post "${slug}" nie istnieje — pomijam`)
      continue
    }

    if (post.content) {
      console.log(`↷ Post "${slug}" ma już treść — pomijam`)
    } else {
      await payload.update({
        collection: 'posts',
        id: post.id,
        data: { content: buildContent(blocks) },
      })
      console.log(`✓ Dodano treść do posta "${slug}"`)
    }

    const faqs = postFaqs[slug]
    if (faqs) {
      if (post.faqs && post.faqs.length > 0) {
        console.log(`↷ Post "${slug}" ma już FAQ — pomijam`)
      } else {
        await payload.update({
          collection: 'posts',
          id: post.id,
          data: { faqs },
        })
        console.log(`✓ Dodano FAQ do posta "${slug}"`)
      }
    }
  }

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
