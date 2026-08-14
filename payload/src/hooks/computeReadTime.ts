import type { CollectionBeforeChangeHook } from 'payload'

const WORDS_PER_MINUTE = 200

interface LexicalNode {
  type?: string
  text?: string
  children?: LexicalNode[]
}

function countWords(node: LexicalNode | null | undefined): number {
  if (!node) return 0

  let count = 0
  if (node.type === 'text' && typeof node.text === 'string') {
    count += node.text.trim().split(/\s+/).filter(Boolean).length
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) count += countWords(child)
  }
  return count
}

export const computeReadTime: CollectionBeforeChangeHook = ({ data }) => {
  if (!data || data.autoReadTime === false) return data

  const root = (data.content as { root?: LexicalNode } | null | undefined)?.root
  const wordCount = countWords(root)
  if (wordCount === 0) return data

  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
  data.readTime = `${minutes} min czytania`

  return data
}
