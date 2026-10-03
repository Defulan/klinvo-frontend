import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ErrorFallback } from "./components/ErrorFallback";
import { RouterErrorFallback } from "./components/RouterErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
const AccountPage = lazy(() => import("./pages/account/Account"));
const Registration = lazy(() => import("./pages/account/Registration"));
const Login = lazy(() => import("./pages/account/Login"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <RouterErrorFallback />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "account", element: <AccountPage /> },
			{ path: "registration", element: <Registration /> },
			{ path: "login", element: <Login /> },

			{ path: "*", element: <NotFoundPage /> },
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<AuthContextProvider>
				<RouterProvider router={router} />
			</AuthContextProvider>
		</ErrorBoundary>
	</StrictMode>,
);
