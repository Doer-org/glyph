"use client";
import { SideBarList } from "./SideBarList/SideBarList";
import { SideBarListItem } from "./SideBarList/SidebarListItem";

export const SideBar = () => {
	return (
		<div className="bg-slate-200 text-black h-screen top-0 fixed w-[230px] md:block hidden pt-5 border-r-2 border-slate-500">
			<div className="mt-16">
				<SideBarList>
					<SideBarListItem parent>Glyph</SideBarListItem>
					<SideBarList>
						<SideBarListItem href="/service/glyphs">index</SideBarListItem>
						<SideBarListItem href="/service/glyphs/new">create</SideBarListItem>
					</SideBarList>

					<SideBarListItem parent>Comment</SideBarListItem>
					<SideBarList>
						<SideBarListItem href="/service/comments">index</SideBarListItem>
					</SideBarList>

					<SideBarListItem parent>Statics</SideBarListItem>
					<SideBarList>
						<SideBarListItem href="/service/statics">index</SideBarListItem>
					</SideBarList>
				</SideBarList>
			</div>
		</div>
	);
};
