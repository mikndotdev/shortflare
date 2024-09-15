export default {
    async fetch(request, env) {
        return await handleRequest(request, env);
    },
};

async function handleRequest(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Check if it's an API endpoint
    if (path.startsWith("/api/")) {
        // Verify Bearer token
        const authHeader = request.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return new Response("Unauthorized", { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        if (token !== env.API_TOKEN) {
            return new Response("Unauthorized", { status: 401 });
        }

        // Handle API endpoints
        try {
            if (path === "/api/add" && request.method === "POST") {
                return handleAdd(request, env);
            } else if (path === "/api/delete" && request.method === "POST") {
                return handleDelete(request, env);
            } else if (path === "/api/list" && request.method === "GET") {
                return handleList(env);
            } else {
                return new Response("Not Found", { status: 404 });
            }
        } catch (error) {
            if (error.message === "No JSON in request") {
                return new Response(
                    "Bad Request: No JSON found in request body",
                    { status: 400 },
                );
            }
            throw error; // Re-throw other errors
        }
    }

    // Handle redirect for short URLs
    return handleRedirect(request, env);
}

async function getJSONFromRequest(request) {
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        throw new Error("No JSON in request");
    }

    try {
        return await request.json();
    } catch (error) {
        throw new Error("No JSON in request");
    }
}

async function handleAdd(request, env) {
    const { slug, destination } = await getJSONFromRequest(request);

    if (!slug || !destination) {
        return new Response("Missing slug or destination", { status: 400 });
    }

    try {
        // Check if the slug already exists
        const existingSlug = await env.DB.prepare(
            "SELECT slug FROM urls WHERE slug = ?",
        )
            .bind(slug)
            .first();

        if (existingSlug) {
            return new Response("Slug already exists", { status: 409 });
        }

        // If the slug doesn't exist, proceed with insertion
        await env.DB.prepare(
            "INSERT INTO urls (slug, destination) VALUES (?, ?)",
        )
            .bind(slug, destination)
            .run();
        return new Response("URL added successfully", { status: 200 });
    } catch (error) {
        return new Response("Error adding URL: " + error.message, {
            status: 500,
        });
    }
}

async function handleDelete(request, env) {
    const { slug } = await getJSONFromRequest(request);

    if (!slug) {
        return new Response("Missing slug", { status: 400 });
    }

    try {
        // First, check if the slug exists
        const checkResult = await env.DB.prepare(
            "SELECT slug FROM urls WHERE slug = ?",
        )
            .bind(slug)
            .first();

        if (!checkResult) {
            return new Response("Slug not found", { status: 404 });
        }

        // If the slug exists, proceed with deletion
        await env.DB.prepare("DELETE FROM urls WHERE slug = ?")
            .bind(slug)
            .run();

        return new Response("URL deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting URL:", error);
        return new Response("Error deleting URL: " + error.message, {
            status: 500,
        });
    }
}

async function handleList(env) {
    try {
        const result = await env.DB.prepare("SELECT * FROM urls").all();
        return new Response(JSON.stringify(result.results), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response("Error listing URLs: " + error.message, {
            status: 500,
        });
    }
}

async function trackVisit(slug, request, env) {
    const country = request.headers.get("CF-IPCountry") || "Unknown";
    try {
        await fetch(env.TRACKING_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${env.TRACKING_API_TOKEN}`,
            },
            body: JSON.stringify({
                slug,
                country,
            }),
        });
    } catch (error) {
        // Log the error, but don't prevent the redirect
        console.error("Error tracking visit:", error);
    }
}

async function handleRedirect(request, env) {
    const url = new URL(request.url);
    const slug = url.pathname.slice(1); // Remove leading slash

    if (!slug) {
        return Response.redirect(env.NOT_FOUND_URL, 302);
    }

    try {
        const result = await env.DB.prepare(
            "SELECT destination FROM urls WHERE slug = ?",
        )
            .bind(slug)
            .first();
        if (result && result.destination) {
            // Track the visit before redirecting
            await trackVisit(slug, request, env);
            return Response.redirect(result.destination, 302);
        } else {
            return Response.redirect(env.NOT_FOUND_URL, 302);
        }
    } catch (error) {
        console.error("Error redirecting:", error);
        return Response.redirect(env.NOT_FOUND_URL, 302);
    }
}
