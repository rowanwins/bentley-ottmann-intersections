import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import strip from 'rollup-plugin-strip'

const output = (file, plugins) => ({
    input: './src/main.js',
    output: {
        name: 'bentleyOttmann',
        file,
        format: 'umd',
        exports: 'default'
    },
    plugins
})

export default [
    output('./dist/bentleyOttmannIntersections.js', [
        strip({
            functions: ['debugEventAndSegment', 'debugEventAndSegments', 'debugIntersectionEventAndSegments']
        }),
        commonjs(),
        resolve()
    ]),
    output('./dist/bentleyOttmannIntersections.min.js', [
        strip({
            functions: ['debugEventAndSegment', 'debugEventAndSegments', 'debugIntersectionEventAndSegments']
        }),
        commonjs(),
        resolve(),
        terser()
    ])
]
