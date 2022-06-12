import copy from 'rollup-plugin-copy'
import {nodeResolve} from "@rollup/plugin-node-resolve"
import { terser } from "rollup-plugin-terser";
import packageManifest from "./package.json"


const production = !process.env.ROLLUP_WATCH;



const banner = `/*!
 * Firepad is an open-source, collaborative code and text editor. It was designed
 * to be embedded inside larger applications. Since it uses Firebase as a backend,
 * it requires no server-side code and can be added to any web app simply by
 * including a couple JavaScript files.
 *
 * Firepad ${packageManifest.version}
 * http://www.firepad.io/
 * License: MIT
 * Copyright: 2014 Firebase
 * With code from ot.js (Copyright 2012-2013 Tim Baumann)
 */
`

const config = [ {
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
}, ]


// Add minified js on production
if(production){
  config.push({ 
    input: 'src/firepad.js',
    context: 'this',
    output: {
      banner,
      name: 'Firepad',
      file: 'dist/firepad.min.js',
      format: 'umd'
    },
    plugins: [
      nodeResolve(),
      terser()
    ],
  })
}

export default config