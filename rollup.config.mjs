// import commonjs from '@rollup/plugin-commonjs';
// import eslint from '@rollup/plugin-eslint';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import { createTransform } from 'rollup-copy-transform-css';
import dts from 'rollup-plugin-dts';
// import nodeBuiltins from 'rollup-plugin-node-builtins';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
// import sourcemaps from 'rollup-plugin-sourcemaps';
import packageJson from './package.json' assert { type: 'json' };

// TODO: Optimise sourcemap generation
// TODO: Optimise css minification
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
            // eslint(),
            peerDepsExternal(),
            resolve({
                jsnext: true,
                main: true,
                browser: true,
            }),
            babel(),
            // resolve({
            //     jsnext: true,
            //     main: true,
            //     browser: true,
            // }),
            // nodeBuiltins(),
            // commonjs(),
            typescript({
                // sourceMap: true,
                tsconfig: './tsconfig.json',
            }),
            postcss({
                plugins: [autoprefixer()],
                minimize: true,
                modules: true,
                extract: true,
                sourceMap: true,
            }),
            // sourcemaps(),
            terser(),
            copy({
                targets: [
                    {
                        src: 'src/*.css',
                        dest: 'dist',
                        transform: createTransform({ inline: true, minify: true }),
                    },
                ]
            }),
        ],
    },
    {
        input: 'dist/esm/types/index.d.ts',
        output: [{ file: packageJson.types, format: 'esm' }],
        plugins: [
            dts(),
        ],
        external: [/\.css$/],
    },
];