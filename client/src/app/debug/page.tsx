'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import React from 'react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function Debug() {
	const [value, setValue] = useState<string | undefined>('**Hello world!!!**');
	return (
		<div>
			<MDEditor value={value} onChange={setValue} />
		</div>
	);
}
