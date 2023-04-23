import { Header } from "@/components/share/Header";
import "./globals.css";

export const metadata = {
	title: "Glyph",
	description: "Glyph is a document sharing application.",
};

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<body className="font-mono">
				<Header />
				{children}
			</body>
		</html>
	);
}
