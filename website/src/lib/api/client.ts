import { env } from "@/config/env";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Minimal HTTP helper for feature services.
 * Reserved for feature services that use an external HTTP API.
 */
export async function apiGet<T>(path: string): Promise<T> {
  if (!env.apiBaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not set. Provide an API base URL to use this service.",
    );
  }

  const response = await fetch(`${env.apiBaseUrl}${path}`);

  if (!response.ok) {
    throw new ApiError(
      `Request failed: ${response.status} ${response.statusText}`,
      response.status,
    );
  }

  return (await response.json()) as T;
}
