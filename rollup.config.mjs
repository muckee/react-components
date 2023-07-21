import path from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

import packageJson from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      postcss({
        minimize: true,
        modules: true,
        extract: true,
        sourceMap: true,
      }),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [
      dts()
    ],
    external: [/\.css$/],
  },
  {
    input: 'src/index.css',
    output: [
      {
        file: path.resolve('dist/index.css'),
        format: 'es',
      },
    ],
    plugins: [
      peerDepsExternal(),
      postcss({
        minimize: true,
        modules: true,
        sourceMap: true,
      }),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
];
