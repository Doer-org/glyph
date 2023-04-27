import { useState } from "react";

export const useToggle = () => {
	const [bool, setBool] = useState(false);
	const toggle = () => setBool(!bool);
	const toTrue = () => setBool(true);
	const toFalse = () => setBool(false);
	return { bool, toggle, toTrue, toFalse };
};
