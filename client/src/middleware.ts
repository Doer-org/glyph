import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const config = {
	matcher: ["/service(.)*"],
};

export const middleware = async (request: NextRequest) => {
	return NextResponse.next();
};
