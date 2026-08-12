import AccordionItem from './AccordionItem.astro';

export default {
  title: 'UI/AccordionItem',
  component: AccordionItem,
};

export const Closed = {
  args: {
    question: 'Can you help me switch from my current accountant?',
    slots: {
      default:
        "<p>Yes — I'll coordinate the transfer of documents and formalities with your previous accountant wherever possible.</p>",
    },
  },
};

export const Open = {
  args: {
    question: 'How much do your accounting services cost?',
    open: true,
    slots: {
      default:
        "<p>Every business is different, so pricing depends on the services you need, the size of your business, and the complexity of your accounting.</p>",
    },
  },
};
