import clsx from 'clsx'

export function ErrorBanner({
  className,
  message,
  onDismiss,
}: {
  className?: string
  message: string
  onDismiss: () => void
}) {
  return (
    <div
      role="alert"
      className={clsx(
        'flex items-center justify-between gap-4 rounded-lg bg-red-50 p-3 text-sm text-red-700',
        className,
      )}
    >
      <p>{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss error"
        className="rounded p-1 text-red-700 hover:bg-red-100 focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  )
}
