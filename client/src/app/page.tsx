import { Title } from "@/components/atoms/Title";
import { Txt } from "@/components/atoms/Txt";
import { type NextPage } from "next";
import Image from "next/image";

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
				<Image
					src="/glyph.svg"
					alt="Glyph Logo"
					width={280}
					height={40}
					className="m-auto"
				/>
			</div>
		</main>
	);
};
export default About;
