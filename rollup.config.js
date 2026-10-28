import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
export default {
    input: 'src/index.js',
    output: [
        { file: 'dist/index.mjs', format: 'es' },
        { file: 'dist/index.js', format: 'umd', name: 'UnifiedDirectory' },
    ],
    plugins: [
        svelte({
            compilerOptions: {
                // Ensure your component is compiled to a custom element
                customElement: false,
            },
        }),
        resolve({
            browser: true,
            exportConditions: ['svelte'],
            // .ts for src/Unified.ts, imported by the component
            extensions: ['.svelte', '.ts', '.mjs', '.js'],
        }),
        // Rollup cannot parse TypeScript on its own (src/Unified.ts failed the build)
        typescript({ include: ['src/**/*.ts'], compilerOptions: { target: 'ES2020', module: 'ESNext', moduleResolution: 'bundler', strict: false, noEmitOnError: false } }),
    ],
    external: ['svelte'],
    exports: {
        '.': {
            svelte: './src/UnifiedDirectory.svelte',
        },
    },
};
