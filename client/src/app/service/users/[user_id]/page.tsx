export default function UserSetting() {
	// TODO(mao):ここにユーザー情報、記事一覧、コメント一覧をとってくる処理を書いてもらえれば！（UI部分だけでも大丈夫です！）
	// memo: レイアウトは大体今書いてある感じでお願いします、確認してませんが
	// memo: componentを作るならorganisms配下にuser/を作って適切な名前で作ってもらえれば！（userGlyphsとかでいいと思います）
	return (
		<>
			<div>
				<p>ユーザー情報</p>
			</div>
			<div className="grid grid-cols-2">
				<div>Glyph一覧</div>
				<div>Comment一覧</div>
			</div>
		</>
	);
}
