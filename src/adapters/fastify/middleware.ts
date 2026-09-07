import type { FastifyReply, FastifyRequest } from "fastify";

import type { CipherLogger } from "../../core/create-cipher-logger";

export type FastifyMiddleware = (
	request: FastifyRequest,
	reply: FastifyReply,
) => void;

function getHeader(req: FastifyRequest, name: string): string | undefined {
	const value = req.headers[name];

	if (value === undefined) {
		return undefined;
	}

	return Array.isArray(value) ? String(value[0]) : String(value);
}

function parseQuery(req: FastifyRequest): Record<string, string> | undefined {
	try {
		const raw = req.raw.url ?? req.url ?? "";
		const url = new URL(raw, "http://localhost");
		const result: Record<string, string> = {};

		for (const [key, value] of url.searchParams.entries()) {
			result[key] = value;
		}

		return Object.keys(result).length > 0 ? result : undefined;
	} catch {
		return undefined;
	}
}

export function createFastifyMiddleware(
	cipher: CipherLogger,
): FastifyMiddleware {
	return (request, reply) => {
		const start = Date.now();

		reply.raw.once("finish", () => {
			const protocol =
				(request.headers["x-forwarded-proto"] as string | undefined) ||
				(request.raw.socket && (request.raw.socket as any).encrypted ? "https" : "http");

			cipher.logRequest({
				method: request.method,
				path: (request.raw.url ?? request.url) as string,
				status: reply.statusCode,
				duration: Date.now() - start,
				ip:
					(request.headers["x-forwarded-for"] as string | undefined)
						? (request.headers["x-forwarded-for"] as string).split(",")[0].trim()
						: (request.ip as string | undefined) ||
							(request.socket?.remoteAddress as string | undefined) ||
							(request.raw.socket?.remoteAddress as string | undefined),
				userAgent: getHeader(request, "user-agent"),
				referer: getHeader(request, "referer"),
				protocol,
				host: getHeader(request, "host"),
				query: parseQuery(request),
				requestId: getHeader(request, "x-request-id"),
			});
		});
	};
}
