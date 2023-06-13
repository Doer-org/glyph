"use client";

import { useWebSocketApi } from "@/hooks/useWebSocketApi";
import { useState } from "react";
import React from "react";

type Comment = {
	type: "comment";
	data: {
		user_name: string;
		user_img: string;
		user_id: string;
		comment: string;
	};
};

export default function Debug() {
	const [messages, setMessages] = useState<Comment[]>([]);
	const glyph_id = "aa";
	const { send, connectionStatus } = useWebSocketApi(
		`${process.env.NEXT_PUBLIC_WS_URL}/ws/${glyph_id}`,
		[
			(msg) => {
				if (msg.type !== "comment") return undefined;
				setMessages([...messages, msg as Comment]);
			},
		],
	);
	return (
		<div style={{ padding: "1rem" }}>
			<div>Connection: {connectionStatus}</div>
			<button
				style={{
					border: "solid",
					padding: "1rem 2rem",
					borderRadius: "1rem",
				}}
				onClick={() => {
					send(
						JSON.stringify({
							type: "comment",
							data: {
								user_name: "kengo",
								user_id: "deno id",
								user_img: "deno img",
								comment: "test",
							},
						}),
					);
				}}
			>
				Click Me!
			</button>
			{messages.map((msg, i) => (
				<div key={i} style={{ gap: "1rem" }}>
					<span>
						{msg.data.user_name}: {msg.data.comment}
					</span>
				</div>
			))}
		</div>
	);
}
