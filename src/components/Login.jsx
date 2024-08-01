import { Link } from "react-router-dom";
import "../assets/Login.css";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [errorMensaje, setErrorMensaje] = useState("");

    const [{ data, error, isLoading}, doFetch ] = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}/api-auth/`, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
        });

    const {login} = useAuth("actions");

    if (data) {
        const token = data.token;
        localStorage.setItem("token", token.token);
        window.location.href = "/home"; // modificar?
        login(data.token)
    }
    
    if (error) {
        setErrorMensaje("Usuario y/o contraseña incorrectos");
    };


    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTriggerFetch(true);
        doFetch();
    };
        
    //useEffect(() => {
    //        if (data && !error && triggerFetch) {
    //            login(data.token);
    //        }
    //    }, [data, error, triggerFetch]);
    
    //console.log(error);

    return (
        <>
            <h1>Poné Play</h1>
            <div id="container-login">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <div id="title">
                    <i className="material-icons lock">lock</i> Login
                </div>

                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="input">
                        <div className="input-addon">
                            <i className="material-icons">face</i>
                        </div>
                        <input
                            required
                            type="text"
                            className="formInput"
                            id="username"
                            placeholder="Ingresa tu usuario"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className="clearfix"></div>
                    <div className="input">
                        <div className="input-addon">
                            <i className="material-icons">vpn_key</i>
                        </div>
                        <input
                            required
                            type="password"
                            className="formInput"
                            id="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-primary btn-login"
                        >
                            Iniciar Sesión
                        </button>
                        {isLoading && triggerFetch && (<p>Cargando...</p>)}
                        { errorMensaje && <p className="error-message">{errorMensaje}</p>}
                    </div>
                </form>
                <div className="forgot-password">
                    <a href="#">¿Olvistaste tu contraseña?</a>
                </div>
                <div className="privacy">
                    <a href="#">Politias de privacidad</a>
                </div>
                <div className="register">
                    ¿No tienes cuenta?
                    <a href="#"><button id="register-link">Registraste aquí</button></a>
                </div>
            </div>
        </>
    );

}

export default Login;