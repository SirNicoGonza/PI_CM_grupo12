import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../contexts/AuthContext";
import "../profile/Profile.css";

// Componente que genera el Perfil del Usuario.
function Profile() {
    const {token} = useAuth("state");

    const [{data, isError, isLoading}, doFetch] = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/profiles/profile_data/`,
        {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    )

    useEffect(()=>{
        doFetch();
    }, []);

    if(isLoading) return <p>Cargando...</p>;
    if(isError) return <p>Error al cargar los datos</p>;

    return (
        <div className="card">
            { data? (
                <>
                    <div className="content-card">
                        <div>
                            <div className="content-figura"> 
                                <figure className="circular-form">
                                    <img 
                                        src={data.image || 
                                            "src/assets/undraw_cat_epte.svg"
                                        } 
                                        alt="Profile image"
                                    />
                                </figure>
                            </div>
                            <div className="userName">
                                <p>{data.username}</p>
                            </div>
                        </div>
                        <div>
                            <div className="content-datos">
                                <p className="lable">Nombre</p>
                                <p className="data">{data.first_name}</p>
                                <p className="lable">Apellido</p>
                                <p className="data">{data.last_name}</p>
                                <br />
                                <p className="lable">Email:</p>
                                <p className="data">{data.email}</p>
                                <br />
                                <br />
                                <button disabled="disabled">Editar</button>
                            </div>
                        </div>
                        <div className="content-bio">
                            <p className="lable">Bio:</p>
                            <p className="data">{data.bio}</p>
                        </div>
                    </div>
                </>
            ):(<p className="data">No se encontraron datos del usuario.</p>)}
        </div>
    );
};

export default Profile;