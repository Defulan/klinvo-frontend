import { Link } from "react-router-dom";
import { useState } from 'react';
import api from '../../lib/api'
import { getErrorDetails } from "../../lib/errorDetails";

function Login() {
    const [errorText, setErrorText] = useState("");
    const [formData, setFormData] = useState({
        id: "",
        password: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post("/auth/login", formData);
            window.location.href = "/account";
        } catch (error) {
            console.error(error);
            setErrorText(getErrorDetails(error));
        }
    };

    const changeFormData = (event) => {
        const { name, value } = event.target;
        setFormData(previousData => ({...previousData, [name]: value}));
    };

    return <div>
        <div className="error-text">{errorText && "Произошла ошибка:"} {errorText}</div>
        <form onSubmit={handleSubmit}>
            <label>ID пользователя:
                <input type="text" name="id" value={formData.id}
                    onChange={changeFormData} autoComplete="off"></input>
            </label><br/>

            <label>Пароль:
                <input type="password" name="password" value={formData.password}
                    onChange={changeFormData} autoComplete="current-password"></input>
            </label><br/>

            <button type="submit">Войти</button><br/>
            <Link to="/registration">Нет аккаунта? Зарегистрироваться</Link>
        </form>
    </div>
}

export default Login;
