import { Title } from "../atoms/Title";
import { Txt } from "../atoms/Txt";

export const Header = () => {
	return (
		<header className="bg-slate-900 w-screen p-9 shadow-2xl text-white">
			<Txt elm="h1" size="3xl">
				<Title />
			</Txt>
		</header>
	);
};
