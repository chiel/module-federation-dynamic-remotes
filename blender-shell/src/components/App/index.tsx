import React from 'react';

const Home = React.lazy(() => import('@lemonade-hq/home-blender/remote/Entry'));

export default function App() {
	return (
		<div>
			<p>BLENDER SHELL APP</p>
			<React.Suspense fallback={<p>Loading...</p>}>
				<Home />
			</React.Suspense>
		</div>
	);
}
