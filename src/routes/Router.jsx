import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import LayoutSinNav from "./LayoutSinNav";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import Home from "../components/Home";
import ArtistsList from "../components/artists/ArtistsList";
import Profile from "../components/profile/Profile";
import AlbumsList from "../components/albums/AlbumsList";
import Playlists from "../components/playlists/Playlists";
import SongsLists from "../components/songs/SongsList";
import ArtistIdDetail from "../components/artists/ArtistIdDetail";

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
                path: "artists/:id",
                element: (
                <ProtectedRoute>
                    <ArtistIdDetail />
                </ProtectedRoute>
                ),
            },
            {
                path: "albums",
                element: (
                <ProtectedRoute>
                    <AlbumsList />
                </ProtectedRoute>
                ),
            },
            {
                path: "playlists",
                element: (
                <ProtectedRoute>
                    <Playlists />
                </ProtectedRoute>
                ),
            },
            {
                path: "songs",
                element: (
                <ProtectedRoute>
                    <SongsLists />
                </ProtectedRoute>
                ),
            },
            {
                path: "profile",
                children:[
                    {
                        index: true,
                        element: (
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path:":id",
                        element: (
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        )
                    }

                ],
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