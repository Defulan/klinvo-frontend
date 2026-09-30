import { Link } from "react-router-dom";
import { useState } from 'react';
import api from '../../lib/api'

function Registration() {
    const [errorText, setErrorText] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        repassword: ""
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post("/users", formData);
            window.account.href = "/account";
        } catch (error) {
            console.error(error);
            setErrorText(error);
        }
    };

    const changeFormData = (event) => {
        const { name, value } = event.target;
        setFormData(previousData => ({...previousData, [name]: value}));
    };

    return <div>
        <div className="error-text">{errorText}</div>
        <form onSubmit={handleSubmit}>
            <label>Имя пользователя:
                <input type="text" name="name" value={formData.name}
                    onChange={changeFormData} autoComplete="username"></input>
            </label><br/>

            <label>Пароль:
                <input type="password" name="password" value={formData.password}
                    onChange={changeFormData} autoComplete="new-password"></input>
            </label><br/>

            <label>Повторить пароль:
                <input type="password" name="repassword" value={formData.repassword}
                    onChange={changeFormData} autoComplete="new-password"></input>
            </label><br/>

            <button type="submit">Зарегистрироваться</button><br/>
            <Link to="/login">Уже есть аккаунт? (Войти)</Link>
        </form>
    </div>
}

export default Registration;
