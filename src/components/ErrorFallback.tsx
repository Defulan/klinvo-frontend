export function ErrorFallback({ error, resetErrorBoundary }) {
    return <div className="container text-center mt-5">
        <h1>Произошла ошибка</h1>
        <p>Во время работы страницы где-то произошла ошибка</p>
        <div className="d-flex justify-content-center gap-2">
            <button className="btn" onClick={() => window.location.href = "/"}>На заглавную</button>
            <button className="btn" onClick={resetErrorBoundary}>Перезайти на страницу</button>
        </div>
    </div>
}