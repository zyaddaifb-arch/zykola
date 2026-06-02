'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>حدث خطأ ما</h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>Something went wrong</p>
          <button
            onClick={() => reset()}
            style={{ padding: '0.75rem 2rem', borderRadius: '9999px', border: 'none', background: '#8B1A1A', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
