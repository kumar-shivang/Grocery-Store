echo "Running preview server"
npm install
echo "Generating icons"
pwa-assets-generator -p minimal  ./src/assets/logo.svg
echo "Generating manifest"
vite build
echo "Starting preview server"
vite preview --host --port 4000
