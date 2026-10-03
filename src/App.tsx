import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
	return (
		<div className="app-container">
			<Navbar />
			<main className="container-sm mt-5">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default App;
