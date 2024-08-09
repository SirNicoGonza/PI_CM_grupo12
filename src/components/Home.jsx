import { useNavigate } from "react-router-dom";
// Hay que completar

function Home(){
    const navigate= useNavigate();
     return (
        <div>
            <h1>Pagina de Ejemplo</h1>
            <p>Aun falta completar</p>
            <button onClick={()=> navigate("/artists")}>ir a Artistas </button>
        </div>
     );
}

export default Home;