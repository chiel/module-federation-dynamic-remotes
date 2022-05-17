const pkg = require('./package.json');
const [major] = pkg.version.split('.');

module.exports = {
	name: pkg.name,
	version: parseInt(major, 10),
	consumes: {
		'@lemonade-hq/home-blender': 1,
	},
};
