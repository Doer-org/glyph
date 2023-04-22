import { FC, ReactNode } from "react";
import { type DefaultTheme } from "tailwindcss/types/generated/default-theme";
type TProps = {
	elm: React.ElementType;
	children: ReactNode;
	size?: keyof DefaultTheme["fontSize"];
	weight?: keyof DefaultTheme["fontWeight"];
	className?: string;
};

export const Txt: FC<TProps> = ({
	elm,
	children,
	size = "",
	weight = "",
	className,
}) => {
	const Element: React.ElementType = elm;

	return (
		<Element className={`${className ?? ""} text-${size} font-${weight}`}>
			{children}
		</Element>
	);
};
