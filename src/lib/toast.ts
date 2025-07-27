import { toast } from 'sonner'

export function toastWarning(message: string) {
  toast.warning(message, {
    style: {
      '--normal-bg': 'var(--background)',
      '--normal-text':
        'light-dark(var(--color-amber-500), var(--color-amber-300))',
      '--normal-border':
        'light-dark(var(--color-amber-500), var(--color-amber-300))',
    } as React.CSSProperties,
  })
}
