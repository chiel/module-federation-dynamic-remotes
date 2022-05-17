window.getEnvironment = function() {
	return 't12345';
};

window.loadRemote = function(url, done) {
	console.log('ATTEMPT TO LOAD', url);
	const script = document.createElement('script');
	script.src = url;

	script.onerror = () => {
		document.head.removeChild(script);
		done(new Error('Failed to load script'));
	};

	script.onload = () => {
		done();
	};

	document.head.appendChild(script);
};
