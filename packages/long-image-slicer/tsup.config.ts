import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts'],
  clean: true,
  dts: false, // tsup@8.0.2有bug暂时关闭，https://github.com/egoist/tsup/issues/840
  outDir: 'dist',
  format: ['cjs', 'esm']
})
