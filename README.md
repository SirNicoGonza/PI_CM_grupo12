
# Pone Play

Pone Play es una aplicación web de música desarrollada con ReactJS y Vite, utilizando una API RESTful para consumir y manipular datos de canciones, artistas, géneros, y playlists.

## Características

- Crear y gestionar playlists personalizadas.
- Buscar y explorar canciones, artistas, y géneros.
- Diseño moderno y responsivo.

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```bash
npm install
```

## Ejecución

Para iniciar la aplicación en modo de desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

Esto iniciará un servidor local y abrirá la aplicación en tu navegador predeterminado.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- **`public/`**: Archivos estáticos y de configuración pública.
- **`src/`**: Código fuente de la aplicación.
  - **`assets/`**: Imágenes y estilos globales.
  - **`components/`**: Componentes React organizados por funcionalidad.
    - **`albums/`**: Componentes relacionados con álbumes.
    - **`artists/`**: Componentes relacionados con artistas.
    - **`genres/`**: Componentes relacionados con géneros.
    - **`navbar/`**: Componentes de la barra de navegación.
    - **`playlists/`**: Componentes relacionados con playlists.
    - **`profile/`**: Componentes relacionados con el perfil del usuario.
    - **`songs/`**: Componentes relacionados con canciones.
  - **`contexts/`**: Contextos de React para manejo de estado global.
  - **`hooks/`**: Custom hooks de React.
  - **`routes/`**: Configuración de las rutas de la aplicación.
  - **`App.jsx`**: Componente principal de la aplicación.
  - **`index.css`**: Estilos globales.
  - **`main.jsx`**: Punto de entrada de la aplicación.
- **`package.json`**: Dependencias y scripts del proyecto.
- **`.eslintrc.cjs`**: Configuración de ESLint para mantener la calidad del código.
- **`vite.config.js`**: Configuración de Vite.

## Dependencias

El proyecto utiliza las siguientes dependencias:

- **React**: Biblioteca para construir interfaces de usuario.
- **React Router DOM**: Librería para manejar las rutas en la aplicación.
- **Vite**: Herramienta para crear proyectos frontend modernos.

## Scripts Disponibles

- **`npm run dev`**: Inicia la aplicación en modo de desarrollo.
- **`npm run build`**: Construye la aplicación para producción.
- **`npm run lint`**: Ejecuta ESLint para analizar el código en busca de errores.
- **`npm run preview`**: Previsualiza la versión de producción de la aplicación.

## Autores

- Nicolás Gonza
- Francisco Lopez
- Fernando Maldonado
