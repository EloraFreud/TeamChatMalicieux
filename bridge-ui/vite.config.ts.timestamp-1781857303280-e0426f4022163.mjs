// vite.config.ts
import { defineConfig } from "file:///Users/elogras/Documents/ClaudeCode/Jujotte-Bridge/Catalyst%20x%20Jujotte/bridge-ui/node_modules/vite/dist/node/index.js";
import react from "file:///Users/elogras/Documents/ClaudeCode/Jujotte-Bridge/Catalyst%20x%20Jujotte/bridge-ui/node_modules/@vitejs/plugin-react/dist/index.js";
import dts from "file:///Users/elogras/Documents/ClaudeCode/Jujotte-Bridge/Catalyst%20x%20Jujotte/bridge-ui/node_modules/vite-plugin-dts/dist/index.mjs";
import { fileURLToPath } from "node:url";
var __vite_injected_original_import_meta_url = "file:///Users/elogras/Documents/ClaudeCode/Jujotte-Bridge/Catalyst%20x%20Jujotte/bridge-ui/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    dts({ include: ["src"], insertTypesEntry: true, exclude: ["src/**/*.stories.tsx"] })
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", __vite_injected_original_import_meta_url)),
      formats: ["es", "cjs"],
      fileName: (format) => format === "es" ? "index.js" : "index.cjs"
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "@phosphor-icons/react"],
      output: {
        globals: { react: "React", "react-dom": "ReactDOM" }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZWxvZ3Jhcy9Eb2N1bWVudHMvQ2xhdWRlQ29kZS9KdWpvdHRlLUJyaWRnZS9DYXRhbHlzdCB4IEp1am90dGUvYnJpZGdlLXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZWxvZ3Jhcy9Eb2N1bWVudHMvQ2xhdWRlQ29kZS9KdWpvdHRlLUJyaWRnZS9DYXRhbHlzdCB4IEp1am90dGUvYnJpZGdlLXVpL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9lbG9ncmFzL0RvY3VtZW50cy9DbGF1ZGVDb2RlL0p1am90dGUtQnJpZGdlL0NhdGFseXN0JTIweCUyMEp1am90dGUvYnJpZGdlLXVpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJztcblxuLy8gTGlicmFyeSBidWlsZDogRVNNICsgQ0pTICsgLmQudHMuIFJlYWN0IHN0YXlzIGV4dGVybmFsIChwZWVyIGRlcGVuZGVuY3kpLlxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgZHRzKHsgaW5jbHVkZTogWydzcmMnXSwgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSwgZXhjbHVkZTogWydzcmMvKiovKi5zdG9yaWVzLnRzeCddIH0pLFxuICBdLFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvaW5kZXgudHMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgIGZvcm1hdHM6IFsnZXMnLCAnY2pzJ10sXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gKGZvcm1hdCA9PT0gJ2VzJyA/ICdpbmRleC5qcycgOiAnaW5kZXguY2pzJyksXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3QvanN4LXJ1bnRpbWUnLCAnQHBob3NwaG9yLWljb25zL3JlYWN0J10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczogeyByZWFjdDogJ1JlYWN0JywgJ3JlYWN0LWRvbSc6ICdSZWFjdERPTScgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtYSxTQUFTLG9CQUFvQjtBQUNoYyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxTQUFTO0FBQ2hCLFNBQVMscUJBQXFCO0FBSHdPLElBQU0sMkNBQTJDO0FBTXZULElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLElBQUksRUFBRSxTQUFTLENBQUMsS0FBSyxHQUFHLGtCQUFrQixNQUFNLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQUEsRUFDckY7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU8sY0FBYyxJQUFJLElBQUksa0JBQWtCLHdDQUFlLENBQUM7QUFBQSxNQUMvRCxTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsTUFDckIsVUFBVSxDQUFDLFdBQVksV0FBVyxPQUFPLGFBQWE7QUFBQSxJQUN4RDtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFNBQVMsYUFBYSxxQkFBcUIsdUJBQXVCO0FBQUEsTUFDN0UsUUFBUTtBQUFBLFFBQ04sU0FBUyxFQUFFLE9BQU8sU0FBUyxhQUFhLFdBQVc7QUFBQSxNQUNyRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
