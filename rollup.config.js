import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'src/js/app.js',
  dest: 'build/app.js',
  format: 'iife',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    })
  ],
  sourceMap: true,
}
