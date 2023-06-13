import { SideBar } from "@/components/share/Sidebar/SideBar";
import { Auth } from "@/features";

export default function ServiceLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			<SideBar />
			<div className="md:pl-[230px] pt-20 ">
				<div className="p-10">
					{/* @ts-expect-error Server Component */}
					<Auth>{children}</Auth>
				</div>
			</div>
		</main>
	);
}
