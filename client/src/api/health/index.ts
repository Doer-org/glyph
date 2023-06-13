import { apiClient } from "../core";
import { Health } from "./types";
export const healthCheck = async () => {
	return await apiClient.get<Health>(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/health`,
	);
};
