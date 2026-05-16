const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");

module.exports = defineConfig({
  plugins: [
    react(),
    {
      name: "serve-dev-index",
      configureServer(server) {
        server.middlewares.use((request, _response, next) => {
          if (request.url === "/" || request.url === "/index.html") {
            request.url = "/index.dev.html";
          }
          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: "index.dev.html",
    },
  },
});
