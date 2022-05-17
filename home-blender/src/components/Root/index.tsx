import React from 'react';

interface Props {
	children?: React.ReactNode;
}

export default function Root({ children }: Props) {
	return (
		<div>
			<p>ROOT</p>
			{children}
		</div>
	);
}
