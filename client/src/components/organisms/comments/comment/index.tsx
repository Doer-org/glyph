import { FC } from "react";
type TProps = {
	comment: string;
};
export const Comment: FC<TProps> = ({ comment }) => {
	return (
		<div>
			<p>{comment}</p>
		</div>
	);
};
