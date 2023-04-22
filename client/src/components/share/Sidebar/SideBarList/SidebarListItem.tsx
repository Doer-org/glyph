import { LinkTo } from "@/components/atoms/LinkTo";
import { Txt } from "@/components/atoms/Txt";
import { FC, ReactNode } from "react";
type TProps = {
	children: ReactNode;
	parent?: boolean;
	href?: string;
};
export const SideBarListItem: FC<TProps> = ({ children, parent, href }) => {
	return href ? (
		<LinkTo href={href}>
			<Txt
				elm="p"
				weight={parent ? "bold" : undefined}
				className="hover:text-yellow-500"
			>
				{parent ? "" : "-"} {children}
			</Txt>
		</LinkTo>
	) : (
		<Txt elm="p" weight={parent ? "bold" : undefined}>
			{parent ? "" : "-"} {children}
		</Txt>
	);
};
