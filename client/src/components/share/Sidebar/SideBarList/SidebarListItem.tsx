import { LinkTo } from "@/components/atoms/LinkTo";
import { Txt } from "@/components/atoms/Txt";
import { FC, ReactNode } from "react";
type TProps = {
	children: ReactNode;
	href: string;
	logo?: ReactNode;
};
export const SideBarListItem: FC<TProps> = ({
	children,

	href,
	logo,
}) => {
	return (
		<LinkTo href={href} className="flex items-center gap-3">
			{logo}
			<Txt
				elm="p"
				weight={parent ? "font-bold" : undefined}
				className="hover:text-yellow-500"
			>
				{parent ? "" : "-"} {children}
			</Txt>
		</LinkTo>
	);
};
