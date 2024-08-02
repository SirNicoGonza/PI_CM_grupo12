import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import Home from "../components/Home";

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path:"home",
                element: <Home />,
            },
            // Aqui poner las rutas que falten
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    }
]);

export { Router };