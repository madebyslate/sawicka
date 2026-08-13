export type LexicalBlock =
  | { h: 2 | 3 | 4; text: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { checklist: { text: string; checked?: boolean }[] }
  | { quote: string }
  | { hr: true }

const elementBase = { format: '' as const, indent: 0, direction: 'ltr' as const }

function textNode(text: string) {
  return { type: 'text', text, version: 1, format: 0, detail: 0, mode: 'normal' as const, style: '' }
}

function heading(tag: 'h2' | 'h3' | 'h4', text: string) {
  return { type: 'heading', tag, version: 1, ...elementBase, children: [textNode(text)] }
}

function paragraph(text: string) {
  return { type: 'paragraph', version: 1, ...elementBase, children: [textNode(text)] }
}

function list(tag: 'ul' | 'ol', listType: 'bullet' | 'number', items: string[]) {
  return {
    type: 'list',
    tag,
    listType,
    start: 1,
    version: 1,
    ...elementBase,
    children: items.map((item, index) => ({
      type: 'listitem',
      version: 1,
      value: index + 1,
      ...elementBase,
      children: [textNode(item)],
    })),
  }
}

function checklist(items: { text: string; checked?: boolean }[]) {
  return {
    type: 'list',
    tag: 'ul',
    listType: 'check',
    start: 1,
    version: 1,
    ...elementBase,
    children: items.map((item, index) => ({
      type: 'listitem',
      version: 1,
      value: index + 1,
      checked: Boolean(item.checked),
      ...elementBase,
      children: [textNode(item.text)],
    })),
  }
}

function quote(text: string) {
  return { type: 'quote', version: 1, ...elementBase, children: [textNode(text)] }
}

function horizontalRule() {
  return { type: 'horizontalrule', version: 1 }
}

export function buildContent(blocks: LexicalBlock[]) {
  const children = blocks.map((block) => {
    if ('h' in block) return heading(`h${block.h}` as 'h2' | 'h3' | 'h4', block.text)
    if ('p' in block) return paragraph(block.p)
    if ('ul' in block) return list('ul', 'bullet', block.ul)
    if ('ol' in block) return list('ol', 'number', block.ol)
    if ('checklist' in block) return checklist(block.checklist)
    if ('quote' in block) return quote(block.quote)
    return horizontalRule()
  })

  return {
    root: { type: 'root', direction: 'ltr' as const, format: '' as const, indent: 0, version: 1, children },
  }
}
