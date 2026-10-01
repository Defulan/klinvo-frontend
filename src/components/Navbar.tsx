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
                        {!isLoading && (
                            isAuth ? (
                                <a className="nav-link" href="/account">Аккаунт</a>
                            ) : <a className="nav-link" href="/login">Вход</a>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    </>
}

export default Navbar;