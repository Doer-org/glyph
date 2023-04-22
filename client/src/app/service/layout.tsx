import { SideBar } from "@/components/share/SideBar";

export default function ServiceLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<main className="flex">
			<SideBar />
			<div>{children}</div>
		</main>
	);
}
