import copy from 'rollup-plugin-copy'
import {nodeResolve} from "@rollup/plugin-node-resolve"




const banner = `/*!
 * Firepad is an open-source, collaborative code and text editor. It was designed
 * to be embedded inside larger applications. Since it uses Firebase as a backend,
 * it requires no server-side code and can be added to any web app simply by
 * including a couple JavaScript files.
 *
 * Firepad 0.0.0
 * http://www.firepad.io/
 * License: MIT
 * Copyright: 2014 Firebase
 * With code from ot.js (Copyright 2012-2013 Tim Baumann)
 */
`

export default {
  input: 'src/firepad.js',
  context: 'this',
  output: {
    banner,
    name: 'Firepad',
    file: 'dist/firepad.js',
    format: 'umd'
  },
  plugins: [
    nodeResolve(),
    copy({
      targets: [
        { src: ['src/firepad.css', 'font/firepad.eot'], dest: 'dist' },
      ]
    }),
  ],

};
