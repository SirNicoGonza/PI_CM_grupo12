import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import LayoutSinNav from "./LayoutSinNav";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import Home from "../components/Home";
import ArtistsList from "../components/artists/ArtistsList";
import Profile from "../components/profile/Profile";

const Router = createBrowserRouter([
    {
        element: <LayoutSinNav />,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: "login",
                element: <Login />
            }
        ]
    },
    {
        element: <Layout />,
        children: [
            {
                path:"home",
                element: <Home />,
            },
            {
                path: "artists",
                element: (
                <ProtectedRoute>
                    <ArtistsList />
                </ProtectedRoute>
                ),
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )
            },
            // Aqui poner las rutas que falten
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    }
]);

export { Router };