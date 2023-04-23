import { Title } from "@/components/atoms/Title";
import { Txt } from "@/components/atoms/Txt";
import { AnimatedSvgLogo } from "@/components/atoms/svgs/AnimatedSvgLogo";
import { type NextPage } from "next";

const About: NextPage = () => {
	return (
		<main className="text-center mt-24">
			<div className="my-6">
				<Txt elm="h1" size="text-6xl" weight="font-bold">
					<Title stroke />
				</Txt>
				<Txt elm="p" className="my-4" size="text-2xl">
					Glyph is a document sharing application
				</Txt>
			</div>
			<div className="m-auto">
				<AnimatedSvgLogo />
			</div>
		</main>
	);
};
export default About;
