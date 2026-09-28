import { useContext } from 'react';
import klinvoIcon from '../assets/nounLanguage.svg';
import { authContext } from '../context/AuthContext';

function Navbar() {
    const {isAuth, userId, isLoading } = useContext(authContext);

    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={klinvoIcon} width={32} height={32} className="d-inline-block align-text-top"/>
                    Klinvo
                </a>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Тест</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Справочник
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Функционал</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="#">Звуки и МФА</a></li>
                            <li><a className="dropdown-item" href="#">Эволюция языков</a></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        {isLoading && (
                            isAuth ? (
                                <a className="nav-link" href="/account">Аккаунт</a>
                            ) : <a className="nav-link" href="/login">Вход</a>
                        )}
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Поиск..." aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Искать</button>
                </form>
            </div>
        </nav>
    </>
}

export default Navbar;