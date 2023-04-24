import { Txt } from "@/components/atoms/Txt";

export default function GlyphsLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<Txt elm="h2" size="text-3xl" className="text-center">
				Glyph作成
			</Txt>
			<div className="my-5">{children}</div>
		</>
	);
}
