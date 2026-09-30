export function ErrorFallback({ error, resetErrorBoundary }) {
    return <div className="container text-center mt-5">
        <h1>Произошла ошибка</h1>
        <p>{error.message}</p>
        <button onClick={resetErrorBoundary}>Перезагрузить</button>
    </div>
}