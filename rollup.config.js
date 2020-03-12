import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import { preprocess, createEnv, readConfigFile } from '@pyoner/svelte-ts-preprocess'

import pkg from './package.json'

const input = 'src/index.svelte'

const env = createEnv()
const compilerOptions = readConfigFile(env)
const opts = {
  env,
  compilerOptions: {
    ...compilerOptions,
    allowNonTsExtensions: true
  }
}

export default [
  {
    input,
    output: { file: pkg.main, format: 'umd', name: 'ItemList' },
    plugins: [
      svelte({
        preprocess: preprocess(opts)
      }),
      resolve(),
      typescript()
    ]
  },
  {
    input,
    output: { file: pkg.module, format: 'es' },
    external: ['svelte/internal'],
    plugins: [
      svelte({
        preprocess: preprocess(opts)
      }),
      typescript()
    ]
  }
]
