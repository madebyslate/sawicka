interface LexicalNode {
  type: string;
  children?: LexicalNode[];
  text?: string;
  format?: number | string;
  tag?: string;
  listType?: 'number' | 'bullet' | 'check';
  checked?: boolean;
  url?: string;
  newTab?: boolean;
  [key: string]: unknown;
}

interface RenderContext {
  listType?: 'number' | 'bullet' | 'check';
}

interface LexicalRoot {
  root: {
    children: LexicalNode[];
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extractPlainText(node: LexicalNode): string {
  if (node.type === 'text') return node.text ?? '';
  return (node.children ?? []).map(extractPlainText).join('');
}

const FORMAT_BOLD = 1;
const FORMAT_ITALIC = 1 << 1;
const FORMAT_STRIKETHROUGH = 1 << 2;
const FORMAT_UNDERLINE = 1 << 3;
const FORMAT_CODE = 1 << 4;

function renderText(node: LexicalNode): string {
  let text = escapeHtml(node.text ?? '');
  const format = typeof node.format === 'number' ? node.format : 0;

  if (format & FORMAT_CODE) text = `<code>${text}</code>`;
  if (format & FORMAT_BOLD) text = `<strong>${text}</strong>`;
  if (format & FORMAT_ITALIC) text = `<em>${text}</em>`;
  if (format & FORMAT_UNDERLINE) text = `<u>${text}</u>`;
  if (format & FORMAT_STRIKETHROUGH) text = `<s>${text}</s>`;

  return text;
}

function renderChildren(nodes: LexicalNode[] | undefined, context: RenderContext = {}): string {
  return (nodes ?? []).map((node) => renderNode(node, context)).join('');
}

function renderNode(node: LexicalNode, context: RenderContext = {}): string {
  switch (node.type) {
    case 'text':
      return renderText(node);
    case 'linebreak':
      return '<br />';
    case 'horizontalrule':
      return '<hr />';
    case 'paragraph':
      return `<p>${renderChildren(node.children)}</p>`;
    case 'heading': {
      const tag = node.tag ?? 'h2';
      const id = tag === 'h2' ? ` id="${slugify(extractPlainText(node))}"` : '';
      return `<${tag}${id}>${renderChildren(node.children)}</${tag}>`;
    }
    case 'list': {
      const listType = node.listType;
      const tag = node.tag ?? (listType === 'number' ? 'ol' : 'ul');
      const className = listType === 'check' ? ' class="list-checklist"' : '';
      return `<${tag}${className}>${renderChildren(node.children, { listType })}</${tag}>`;
    }
    case 'listitem': {
      if (context.listType === 'check') {
        const checked = Boolean(node.checked);
        return `<li class="list-item-checkbox${checked ? ' is-checked' : ''}"><label><input type="checkbox" disabled${checked ? ' checked' : ''} /> ${renderChildren(node.children, context)}</label></li>`;
      }
      return `<li>${renderChildren(node.children, context)}</li>`;
    }
    case 'quote':
      return `<blockquote>${renderChildren(node.children)}</blockquote>`;
    case 'link': {
      const href = typeof node.url === 'string' ? escapeHtml(node.url) : '#';
      const target = node.newTab ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${href}"${target}>${renderChildren(node.children)}</a>`;
    }
    default:
      return renderChildren(node.children);
  }
}

export function lexicalToHtml(content: LexicalRoot | null | undefined): string {
  if (!content?.root?.children) return '';
  return renderChildren(content.root.children);
}

export function getPlainText(content: LexicalRoot | null | undefined): string {
  if (!content?.root?.children) return '';
  return content.root.children
    .map((node) => extractPlainText(node))
    .filter(Boolean)
    .join('\n\n');
}

export interface Heading2 {
  id: string;
  text: string;
}

export function getH2Headings(content: LexicalRoot | null | undefined): Heading2[] {
  if (!content?.root?.children) return [];

  const headings: Heading2[] = [];

  function walk(nodes: LexicalNode[]) {
    for (const node of nodes) {
      if (node.type === 'heading' && node.tag === 'h2') {
        const text = extractPlainText(node);
        headings.push({ id: slugify(text), text });
      }
      if (node.children) walk(node.children);
    }
  }

  walk(content.root.children);
  return headings;
}
