echo "running dev server"
npm install
echo "generating icons"
pwa-assets-generator -p minimal  ./src/assets/logo.svg
echo "generating manifest"
vite build
echo "starting dev server"
vite dev --host --port 3000

