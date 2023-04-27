import { useState } from "react";

export const useToggle = (initialValue?: boolean) => {
	const [bool, setBool] = useState(initialValue === undefined ? false : true);
	const toggle = () => setBool(!bool);
	const toTrue = () => setBool(true);
	const toFalse = () => setBool(false);
	return { bool, toggle, toTrue, toFalse };
};
