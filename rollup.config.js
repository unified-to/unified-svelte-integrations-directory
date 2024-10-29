import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
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
            extensions: ['.svelte'],
        }),
    ],
    external: ['svelte'],
    exports: {
        '.': {
            svelte: './src/UnifiedDirectory.svelte',
        },
    },
};
