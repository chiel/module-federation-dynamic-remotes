const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const contract = require('.');

function slugify(name) {
	const slug = name
		.replace(/^@/, '')
		.replace(/[^a-z0-9]+/g, '_')
		.toLowerCase();

	return /^[0-9]/.test(slug)
		? `_${slug}`
		: slug;
}

const remoteLoader = fs.readFileSync(`${__dirname}/remoteLoader.js`, 'utf8');

const remotes = Object.entries(contract.consumes).reduce((acc, [depName, depVersion]) => {
	const slug = slugify(depName);
	const moduleLoader = remoteLoader
		.replace('APP_NAME', slug)
		.replace('DEVELOPMENT_URL', 'http://localhost:3011/remoteEntry.js')
		.replace('PRODUCTION_URL', 'http://localhost:3010/remoteEntry.js')
		.replace('STAGING_URL', 'http://localhost:3002/remoteEntry.js')
		.replace('TICKET_URL', 'http://localhost:3003/remoteEntry.js');
	return { ...acc, [`${depName}/remote`]: `promise ${moduleLoader}` };
}, {});

module.exports = {
	mode: 'development',
	target: 'web',
	entry: ['./loadRemote', './src'],
	devServer: {
		port: 3001,
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
			name: slugify(contract.name),
			filename: 'remoteEntry.js',
			remotes,
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	]
};
