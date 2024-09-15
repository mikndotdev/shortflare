import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const session = await getServerSession({ req: request });

    if (!session) {
        return new Response("Unauthorized", {
            status: 401,
            statusText: "Unauthorized",
        });
    }

    const response = await fetch(`${process.env.WORKER_URL}/api/list`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.WORKER_API_TOKEN}`,
        },
    });
    const json = JSON.stringify(await response.json());
    return new Response(json, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
