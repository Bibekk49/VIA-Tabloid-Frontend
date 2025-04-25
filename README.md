# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Running with Docker

This project includes a Docker setup for building and serving the production build with Nginx.

- **Node version:** 22.13.1 (used for building the app)
- **Nginx:** stable-alpine (serves the built static files)

### Build and Run

To build and run the app using Docker Compose:

```sh
# Build and start the container
docker compose up --build
```

- The app will be available at [http://localhost](http://localhost) (port 80).
- No environment variables are required by default.
- No volumes or external dependencies are needed; the static site is built into the image.

### Ports

- **js-app:** Exposes port `80` (Nginx static site)

### Notes

- If you need to use environment variables, uncomment the `env_file` line in `docker-compose.yml` and provide a `.env` file.
- The Docker image is built in two stages: first with Node.js for building, then served by Nginx as a non-root user for security.
