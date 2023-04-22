import { Header } from "@/components/share/Header";

export default function ServiceLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
}
