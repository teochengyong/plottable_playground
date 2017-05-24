import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
export default {
  entry: 'src/js/app.js',
  dest: 'build/app.js',
  format: 'iife',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs()
  ],
  sourceMap: true
}
