import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import path from 'path';

export default ({ mode }) => {
  // const isProduction = mode === 'production';
  // const base = isProduction ? './' : './';
  const base = './';

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    base: base,
  });
};
