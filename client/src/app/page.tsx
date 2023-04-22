import { Title } from "@/components/atoms/Title";
import { Txt } from "@/components/atoms/Txt";
import { type NextPage } from "next";

const About: NextPage = () => {
	return (
		<main className="text-center my-14">
			<div className="my-6">
				<Txt elm="h1" size="7xl" weight="bold">
					<Title />
				</Txt>
				<Txt elm="p" className="my-4" size="2xl">
					<Title /> is a document sharing application
				</Txt>
			</div>
		</main>
	);
};
export default About;
