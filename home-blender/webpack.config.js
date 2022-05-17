const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const deps = require('./package.json').dependencies;

module.exports = {
	mode: 'development',
	target: 'web',
	entry: './src',
	devServer: {
		port: 3002,
		static: {
			directory: './public',
		},
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'lemonade_hq_home_blender',
			filename: 'remoteEntry.js',
			exposes: {
				'./Entry': './src/Entry',
			},
			shared: {
				react: {
					requiredVersion: deps.react,
					singleton: true,
				},
				// 'react-dom': {
				// 	requiredVersion: deps['react-dom',
				// 	singleton: true,
				// },
			},
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	]
};
