export function ErrorFallback({ error, resetErrorBoundary }) {
    return <div>
        <h1>Произошла ошибка</h1>
        <p>{error}</p>
        <button onClick={resetErrorBoundary}>Перезагрузить</button>
    </div>
}