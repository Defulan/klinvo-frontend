import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function App() {
    return <>
        <Navbar/>
        <main className="container-sm mt-5 text-center">
            <Outlet/>
        </main>
    </>
}

export default App;
