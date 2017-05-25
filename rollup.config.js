import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
export default {
  entry: 'src/js/app.js',
  dest: 'build/app.js',
  format: 'iife',
  plugins: [
    commonjs({
      include: 'node_modules/**'
    }),
    nodeResolve({
      jsnext: true,
      main: true
    })
  ],
  external: ['Plottable', 'd3'],
  sourceMap: true
}
