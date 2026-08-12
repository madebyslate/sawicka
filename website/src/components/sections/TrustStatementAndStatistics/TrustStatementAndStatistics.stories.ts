import TrustStatementAndStatistics from './TrustStatementAndStatistics.astro';

export default {
  title: 'Sections/TrustStatementAndStatistics',
  component: TrustStatementAndStatistics,
};

export const Default = {
  args: {
    tagline: 'Trust Statement and Statistics',
    heading:
      'Supporting Businesses with Reliable Accounting, Transparent Communication, and Long-Term Financial Confidence.',
    stats: [
      { value: '8', suffix: '+', label: 'Years of Experience' },
      { value: '100', suffix: '+', label: 'Businesses Supported' },
      { value: '99', suffix: '%', label: 'On-Time Tax Filing' },
      { value: '100', suffix: '%', label: 'Zero penalties for clients' },
    ],
  },
};
