import './ErrorFallback.css'

export default function Fallback({ error, resetErrorBoundary }) {
  return (
    <section className="error">
      <div className="error-header">
        <h1>{error.message}</h1>
      </div>
      <div className="error-contant">
        <h3>There's a problem</h3>
        <p>Press f12 to see error OR click on the Reload button</p>
        <button className="link_404" onClick={resetErrorBoundary} role={'link'}>
          Reload
        </button>
      </div>
    </section>
  )
}
