import { FC, ReactNode } from 'react';
import { type DefaultTheme } from 'tailwindcss/types/generated/default-theme';

type FontSizeWithPrefix =
	| `${'text-'}${keyof DefaultTheme['fontSize']}`
	| undefined;

type FontWeightWithPrefix =
	| `${'font-'}${keyof DefaultTheme['fontWeight']}`
	| undefined;

type TProps = {
	elm: React.ElementType;
	children: ReactNode;
	size?: FontSizeWithPrefix;
	weight?: FontWeightWithPrefix;
	className?: string;
};

export const Txt: FC<TProps> = ({ elm, children, size, weight, className }) => {
	const Element: React.ElementType = elm;
	return (
		<Element className={`${className ?? ''} ${size} ${weight}`}>
			{children}
		</Element>
	);
};
