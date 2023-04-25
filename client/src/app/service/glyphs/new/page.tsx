import dynamic from "next/dynamic";
const Markdown = dynamic(
	() => import("@/components/organisms/service/glyphs/new/Markdown"),
	{ ssr: false },
);
export default function New() {
	return <Markdown />;
}
