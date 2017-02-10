import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	entry: 'src/index.js',
	// dest: 'dist/bundle.js',
	format: 'iife',
	moduleName: 'BaseAutocomplete',
	plugins: [
		buble(),
		commonjs({
			include: 'node_modules/**'
		}),
		nodeResolve({
			main: true
		})
	],
	external: [
		'module'
	]
};