import React, { FC } from "react";

type TProps = {
	bool: boolean;
	toggle: () => void;
};
export const ToggleButton: FC<TProps> = ({ bool, toggle }) => {
	return (
		<button
			onClick={toggle}
			className={`${
				bool ? "bg-yellow-300" : "bg-gray-300"
			} relative inline-block w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none`}
		>
			<span
				className={`${
					bool ? "translate-x-6" : "translate-x-0"
				} absolute top-1 left-1 inline-block w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300`}
			/>
		</button>
	);
};
