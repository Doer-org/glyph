import { SideBar } from "@/components/share/Sidebar/SideBar";

export default function ServiceLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<main>
			<SideBar />
			<div className="md:pl-[240px] pl-0">
				<div className=" xl:p-20  lg:p-10">{children}</div>
			</div>
		</main>
	);
}
