import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const session = await getServerSession({ req: request });

    if (!session) {
        return new Response("Unauthorized", {
            status: 401,
            statusText: "Unauthorized",
        });
    }

    const params = request.nextUrl.searchParams;
    const slug = params.get("slug");
    const response = await fetch(`${process.env.WORKER_URL}/api/delete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.WORKER_API_TOKEN}`,
        },
        body: JSON.stringify({ slug: slug }),
    });
    if (!response.ok) {
        return new Response("Failed to delete link", {
            status: 500,
            statusText: "Internal Server Error",
        });
    }
    return new Response("Link deleted successfully", {
        status: 200,
        statusText: "OK",
    });
}
