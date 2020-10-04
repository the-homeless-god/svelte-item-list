import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import svelte from 'rollup-plugin-svelte'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const svelteConfig = require('./svelte.config')
const input = 'src/index.svelte'

const mode = process.env.NODE_ENV
const dev = mode === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD

const dedupe = (importee) =>
  importee === 'svelte' || importee.startsWith('svelte/')
const extensions = ['.js', '.mjs', '.html', '.svelte', '.ts']

const plugins = [
  replace({
    'process.browser': true,
    'process.env.NODE_ENV': JSON.stringify(mode),
  }),
  svelte({
    dev,
    hydratable: true,
    emitCss: true,
    preprocess: svelteConfig.preprocess,
  }),
  resolve({
    browser: true,
    jsnext: true,
    extensions,
    dedupe,
  }),
  commonjs({
    include: /node_modules/,
  }),
  typescript({ sourceMap: dev }),
  json(),
  legacy &&
    !dev &&
    terser({
      module: true,
    }),
]

export default [
  {
    input,
    output: { file: pkg.main, format: 'umd', name: 'ItemList' },
    plugins,
  },
  {
    input,
    output: { file: pkg.module, format: 'es' },
    external: ['svelte/internal'],
    plugins,
  },
]
