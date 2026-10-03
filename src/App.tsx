import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<Navbar />
			<main className="container-sm mt-5">
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default App;
