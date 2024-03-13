import alias from '@rollup/plugin-alias';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import path from 'path';
import copy from 'rollup-plugin-copy';
import { createTransform } from 'rollup-copy-transform-css';
import dts from 'rollup-plugin-dts';
import gzip from 'rollup-plugin-gzip';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { uglify } from 'rollup-plugin-uglify';
import packageJson from './package.json' assert {
    type: 'json',
};

// TODO: Optimise sourcemap generation
// TODO: Optimise CSS
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
        external: [
            'react',
            'react-dom',
            'remixicon/fonts/remixicon.css',
        ],
        plugins: [
            eslint(),
            peerDepsExternal(),
            resolve({
                preferBuiltins: true,
                jsnext: true,
                main: true,
                browser: true,
                extensions: ['.css'],
            }),
            replace({
                preventAssignment: true,
                'process.browser': true,
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            uglify({
                output: {
                    comments: function (node, comment) {
                        if (comment.type === 'comment2') {
                            // multiline comment
                            return /@preserve|@license|@cc_on/i.test(comment.value);
                        }
                        return false;
                    }
                }
            }),
            gzip(),
            commonjs(),
            babel({ babelHelpers: 'bundled' }),
            typescript({
                // sourceMap: true,
                tsconfig: './tsconfig.json',
            }),
            postcss({
                plugins: [
                    autoprefixer(),
                    cssnano(),
                ],
                extensions: [
                    '.css',
                ],
                autoprefixer: true,
                minimize: true,
                modules: true,
                // exportGlobals: true,
                // autoModules: true,
                extract: false,
                sourceMap: true,
                // inject: false,
            }),
            terser(),
            copy({
                targets: [
                    {
                        src: 'src/*.css',
                        dest: 'dist',
                        transform: createTransform({
                            minify: true,
                            plugins: [
                                autoprefixer(),
                            ],
                        }),
                    },
                    {
                        src: 'src/scripts/*.js',
                        dest: 'dist/js',
                    },
                ]
            }),
        ],
    },
    {
        input: 'dist/esm/index.d.ts',
        output: [{ file: packageJson.types, format: 'esm' }],
        plugins: [
            alias({
                entries: [
                    {
                        find: '@application',
                        replacement: path.resolve('./dist/esm/'),
                    },
                    {
                        find: '@components',
                        replacement: path.resolve('./dist/esm/components/'),
                    },
                    {
                        find: '@hooks',
                        replacement: path.resolve('./dist/esm/hooks/'),
                    },
                ],
            }),
            dts(),
        ],
        external: [/\.css$/],
    },
];