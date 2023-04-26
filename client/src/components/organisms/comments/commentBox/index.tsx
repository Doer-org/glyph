import { FC, ReactNode } from "react";
type TProps = {
	children: ReactNode;
};
export const CommentBox: FC<TProps> = ({ children }) => {
	return (
		<div className="h-[50vh] border rounded-md w-full p-2 relative overflow-y-scroll">
			{children}
		</div>
	);
};
