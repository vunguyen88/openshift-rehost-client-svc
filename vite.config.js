import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsx: false
  })],
  build: {
    outDir: 'dist',
  },
  // esbuild: {
  //   jsxFactory: 'h', // if you're using a different JSX pragma, replace 'h' with your function name
  //   jsxFragment: 'Fragment', // if needed, replace 'Fragment' with your fragment component name
  //   jsxInject: `import { h, Fragment } from 'preact';` // if you're using Preact, otherwise import from 'react'
  // },
  // optimizeDeps: {
  //   include: ['@babel/plugin-transform-react-jsx'] // Include Babel plugin for JSX parsing
  // }
})
