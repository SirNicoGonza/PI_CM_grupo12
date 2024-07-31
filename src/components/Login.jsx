import { Link } from "react-router-dom";
//import "./Login.css";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [triggerFetch, setTriggerFetch] = useState(false);

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
        window.location.href = "/home";
    }
    
    if (error) {
        alert("Usuario o contraseña incorrectos");
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
        
        useEffect(() => {
            if (data && !error && triggerFetch) {
                login(data.token);
            }
        }, [data, error, triggerFetch]);
    };

    return (
        <>
            <div className="login-container container">
                <div className="container">
                    <div className="row justify-content-center">
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label
                                        htmlFor="formUsername"
                                        className="formLabel"
                                    >
                                        Nombre de Usuario
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="formInput"
                                        id="formUsername"
                                        placeholder="Ingresa tu usuario"
                                        value={username}
                                        onChange={handleUsernameChange}
                                    />
                                </div>
                                <br />
                                <div className="form-group">
                                    <label
                                        htmlFor="formPassword"
                                        className="formLabel"
                                    >
                                        Contraseña
                                    </label>
                                    <input
                                        required
                                        type="password"
                                        className="formInput"
                                        id="formPassword"
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
                                </div>
                            </form>

                            <div className="mt-3" style={{ fontSize: "15px" }}>
                                <br />
                                Si todavía no tienes una cuenta, puedes{" "}
                                <a href="/signup">Regístrate</a>.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Login;