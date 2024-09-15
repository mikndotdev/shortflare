"use client";

import { Button } from "../shadcn/button";
import { Input } from "../shadcn/input";
import { Card } from "../shadcn/card";
import { toast } from "sonner";
import { useState } from "react";

import { IoLinkSharp } from "react-icons/io5";

import { useRouter } from "next/navigation";

export default function LinkForm() {
    const [slug, setSlug] = useState("");
    const [destination, setDestination] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const create = async () => {
        setLoading(true);
        if (!slug || !destination) {
            toast.error("Please fill in all fields");
            setLoading(false);
            return;
        }
        const response = await fetch(`/api/worker/create?slug=${slug}&destination=${destination}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            toast.error("Failed to create link");
            setLoading(false);
            return;
        }

        if (response.ok) {
            toast.success("Link created successfully");
            setLoading(false);
            setTimeout(() => {
                router.push("/dashboard");
            }
            , 3000);
        }
    };

    return (
        <Card className="w-[500px] h-[300px] flex flex-col justify-center items-center bg-black">
            <Input
                placeholder="URL Slug"
                className="bg-white text-black w-96"
                onChange={(e) => setSlug(e.target.value)}
            />
            <Input
                placeholder="Destination URL"
                className="bg-white text-black w-96 mt-2"
                onChange={(e) => setDestination(e.target.value)}
            />
            <Button
                className="w-[300px] h-[40px] mt-2 bg-blue-700 text-white"
                onClick={() => create()}
                disabled={loading}
            >
                <IoLinkSharp className="inline-block mr-2" size={20} />
                Create
            </Button>
        </Card>
    );
}
