import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

async function triggerDeployHook(): Promise<void> {
  const url = process.env.DEPLOY_HOOK_URL

  if (!url) {
    return
  }

  try {
    const res = await fetch(url, { method: 'POST' })
    if (!res.ok) {
      console.error(`[deploy-hook] Rebuild trigger failed: ${res.status} ${res.statusText}`)
    }
  } catch (err) {
    console.error('[deploy-hook] Rebuild trigger failed:', err)
  }
}

export const afterChangeGlobal: GlobalAfterChangeHook = async () => {
  void triggerDeployHook()
}

export const afterChangeCollection: CollectionAfterChangeHook = async () => {
  void triggerDeployHook()
}

export const afterDeleteCollection: CollectionAfterDeleteHook = async () => {
  void triggerDeployHook()
}
