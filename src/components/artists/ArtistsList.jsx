import ArtistsCard from "./ArtistsCard";
import useFetch from "../../hooks/useFetch";
import { useEffect , useCallback} from "react";

//Componente que genera una lista de card con todos los artistas de la api
function ArtistsList(){

    const [{data, isError, isLoading}, doFetch] = useFetch(
        `${import.meta.env.VITE_API_BASE_URL_HARMONY}/artists/`, {}
    );

    const fetchArtist = useCallback(()=> {
        doFetch();
    }, [doFetch]);

    useEffect(() =>{
        fetchArtist();
    }, [fetchArtist]);

    if(isLoading) return <p>Cargando...</p>;
    if(isError) return  <p>Error al cargar los artistas</p>;
    if(!data || !data.results || data.results.length===0) return <p>No hay artistas disponibles</p>

    return (
        <div>
            <div className="my-5">
                <h2 className="title"> Lista de Artistas</h2>
                <ul>
                    {data.results.map((artista)=>(
                        <div key={artista.id} className="column is-two-third">
                            <ArtistsCard artists={artista}/>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ArtistsList;