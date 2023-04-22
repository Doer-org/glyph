import { FC, ReactNode } from "react";
type TProps = {
	children: ReactNode;
};
export const SideBarList: FC<TProps> = ({ children }) => {
	return <div className="pl-5 flex flex-col gap-5">{children}</div>;
};
