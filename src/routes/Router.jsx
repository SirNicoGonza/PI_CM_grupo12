import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LayoutSinNav from './LayoutSinNav';
import ProtectedRoute from './ProtectedRoute';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import Home from '../components/Home';
import ArtistsList from '../components/artists/ArtistsList';
import Profile from '../components/profile/Profile';
import GenresList from '../components/genres/GenresList';
import AlbumsList from '../components/albums/AlbumsList';
import Playlists from '../components/playlists/Playlists';
import SongsLists from '../components/songs/SongsList';
import SongNew from '../components/songs/SongNew';
import ArtistIdDetail from '../components/artists/ArtistIdDetail';
import ArtistNew from '../components/artists/ArtistNew';
import PlaylistDetail from '../components/playlists/PlaylistDetail';
import PlaylistNew from '../components/playlists/PlaylistNew';
import GenresDetail from '../components/genres/GenresDetail';
import GenreNew from '../components/genres/GenreNew';

const Router = createBrowserRouter([
	{
		element: <LayoutSinNav />,
		children: [
			{
				index: true,
				element: <Login />,
			},
			{
				path: 'login',
				element: <Login />,
			},
		],
	},
	{
		element: <Layout />,
		children: [
			{
				path: 'home',
				element: <Home />,
			},
			{
				path: 'artists',
				element: (
					<ProtectedRoute>
						<ArtistsList />
					</ProtectedRoute>
				),
			},
			{
				path: 'artists/:id',
				element: (
					<ProtectedRoute>
						<ArtistIdDetail />
					</ProtectedRoute>
				),
			},
			{
				path: 'artists/new',
				element: (
					<ProtectedRoute>
						<ArtistNew />
					</ProtectedRoute>
				),
			},
			{
				path: 'albums',
				element: (
					<ProtectedRoute>
						<AlbumsList />
					</ProtectedRoute>
				),
			},
			{
				path: 'playlists',
				element: (
					<ProtectedRoute>
						<Playlists />
					</ProtectedRoute>
				),
			},
			{
				path: 'playlists/new',
				element: (
					<ProtectedRoute>
						<PlaylistNew />
					</ProtectedRoute>
				),
			},
			{
				path: 'playlists/:id',
				element: (
					<ProtectedRoute>
						<PlaylistDetail />
					</ProtectedRoute>
				),
			},
			{
				path: 'genres',
				element: (
					<ProtectedRoute>
						<GenresList />
					</ProtectedRoute>
				),
			},
			{
				path: 'genres/:id',
				element: (
					<ProtectedRoute>
						<GenresDetail />
					</ProtectedRoute>
				),
			},
			{
				path: 'genres/new',
				element: (
					<ProtectedRoute>
						<GenreNew />
					</ProtectedRoute>
				),
			},
			{
				path: 'songs',
				element: (
					<ProtectedRoute>
						<SongsLists />
					</ProtectedRoute>
				),
			},
			{
				path: 'songs/new',
				element: (
					<ProtectedRoute>
						<SongNew />
					</ProtectedRoute>
				),
			},
			{
				path: 'profile',
				children: [
					{
						index: true,
						element: (
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						),
					},
					{
						path: ':id',
						element: (
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						),
					},
				],
			},
			{
				path: 'genres',
				children: [
					{
						index: true,
						element: (
							<ProtectedRoute>
								<GenresList />
							</ProtectedRoute>
						),
					},
					{
						path: 'id',
						element: (
							<ProtectedRoute>
								<GenresDetail />
							</ProtectedRoute>
						),
					},
				],
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
],
{
	basename: "/PI_CM_grupo12"
}
);

export { Router };
