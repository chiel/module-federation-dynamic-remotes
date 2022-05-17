new Promise((resolve, reject) => {
	const appName = 'APP_NAME';
	const envUrls = {
		development: 'DEVELOPMENT_URL',
		production: 'PRODUCTION_URL',
		staging: 'STAGING_URL',
		ticket: 'TICKET_URL',
	};

	const env = window.getEnvironment();

	let urls = [envUrls[env]];
	if (/t\d+/.test(env)) {
		urls = [envUrls.ticket, envUrls.staging];
	}

	const next = (prevErr, done) => {
		const url = urls.shift();
		if (!url) return done(prevErr);

		window.loadRemote(url, err => {
			if (err) return next(err, done);
			done();
		});
	}

	next(null, err => {
		if (err) {
			return reject(err);
		}

		resolve({
			get: request => window[appName].get(request),
			init: arg => {
				try {
					return window[appName].init(arg);
				} catch (err) {
					console.error('Remote container already initialized', err);
				}
			},
		});
	});
});
