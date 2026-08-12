'use client'

import { useRowLabel } from '@payloadcms/ui'

interface RowLabelData {
  title?: string
  label?: string
}

export const RowLabel = () => {
  const { data, rowNumber } = useRowLabel<RowLabelData>()
  const text = data?.title || data?.label

  return <div>{text || `Wiersz ${String(rowNumber ?? 0).padStart(2, '0')}`}</div>
}
