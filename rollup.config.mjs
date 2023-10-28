import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import cssnext from 'postcss-cssnext';
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
            }),
            replace({
                preventAssignment: true,
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
                    cssnext({
                        warnForDuplicates: false,
                    }),
                    cssnano(),
                ],
                extensions: [
                    '.css',
                ],
                minimize: true,
                modules: true,
                extract: true,
                sourceMap: true,
                inject: false,
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
                        src: 'dist/*.css',
                        dest: 'dist',
                        transform: createTransform({
                            inline: true,
                            rename: (name, extension) => `${name}.min.${extension}`,
                        }),
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