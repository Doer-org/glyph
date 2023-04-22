import Link from "next/link";
import { FC, ReactNode } from "react";
type TProps = {
	href: string;
	children: ReactNode;
};
export const LinkTo: FC<TProps> = ({ href, children }) => {
	return <Link href={href}>{children}</Link>;
};
