import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import dts from 'rollup-plugin-dts';
import nodeBuiltins from 'rollup-plugin-node-builtins';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import sourcemaps from 'rollup-plugin-sourcemaps';

import packageJson from './package.json' assert { type: 'json' };

export default [
  {
    context: 'this',
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
      resolve({
        preferBuiltins: true,
      }),
      nodeBuiltins(),
      commonjs(),
      typescript({ 
        sourceMap: false,
        tsconfig: './tsconfig.json',
      }),
      sourcemaps(),
      terser(),
      copy({
        targets: [
          {
            src: 'src/theme.css',
            dest: 'dist',
          },
          {
            src: 'src/theme.min.css',
            dest: 'dist',
          },
        ]
      }),
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
];
