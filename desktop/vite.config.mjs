import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  root:here,
  base:'/',
  publicDir:path.resolve(here,'../public'),
  resolve:{alias:{react:path.resolve(here,'node_modules/react'),'react-dom':path.resolve(here,'node_modules/react-dom'),'lucide-react':path.resolve(here,'node_modules/lucide-react')}},
  plugins:[react()],
  build:{outDir:path.resolve(here,'dist-web'),emptyOutDir:true}
});
