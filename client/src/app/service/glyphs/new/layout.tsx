import { Txt } from "@/components/atoms/Txt";

export default function GlyphsLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<Txt elm="h2" size="text-3xl" className="text-center pt-20 pb-10">
				Glyph作成
			</Txt>
			{children}
		</>
	);
}
