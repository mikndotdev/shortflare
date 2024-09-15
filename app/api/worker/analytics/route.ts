import type { NextRequest } from "next/server";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
    const headersList = headers();
    const auth = headersList.get("authorization");
    const token = auth?.replace("Bearer ", "");

    if (token !== process.env.WORKER_TRACKING_TOKEN) {
        return new Response("Unauthorized", {
            status: 401,
            statusText: "Unauthorized",
        });
    }

    const json = await request.json();

    const slug = json.slug;
    const country = json.country;

    console.log(`Received analytics for ${slug} from ${country}`);

    return new Response("OK", {
        status: 200,
        statusText: "OK",
    });
}
