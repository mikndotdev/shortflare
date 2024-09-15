"use client";
import Image from "next/image";

import { CgSpinnerTwo } from "react-icons/cg";

import { Card } from "./components/shadcn/card";
import { Button } from "./components/shadcn/button";
import { Input } from "./components/shadcn/input";
import { Alert, AlertTitle, AlertDescription } from "./components/shadcn/alert";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [password, setPassword] = useState("");

    const login = async (password: String) => {
        await signIn("credentials", { redirect: false, password: password });

        if (status === "authenticated") {
            toast.success("Successfully signed in!");
        } else {
            toast.error("Incorrect password!");
        }
    };

    if (status === "authenticated") {
        router.push("/dashboard");
        return (
            <main>
                <h1 className="text-center mt-10 text-4xl font-bold text-white">
                    ShortFlare UI
                </h1>
                <div className="flex justify-center mt-10">
                    <Card className="w-[500px] h-[300px] flex flex-col justify-center items-center bg-black">
                        <CgSpinnerTwo
                            size={90}
                            className="animate-spin text-white"
                        />
                    </Card>
                </div>
            </main>
        );
    }

    if (status === "loading") {
        return (
            <main>
                <h1 className="text-center mt-10 text-4xl font-bold text-white">
                    ShortFlare UI
                </h1>
                <div className="flex justify-center mt-10">
                    <Card className="w-[500px] h-[300px] flex flex-col justify-center items-center bg-black">
                        <CgSpinnerTwo
                            size={90}
                            className="animate-spin text-white"
                        />
                    </Card>
                </div>
            </main>
        );
    }

    if (status === "unauthenticated") {
        return (
            <main>
                <h1 className="text-center mt-10 text-4xl font-bold text-white">
                    ShortFlare UI
                </h1>
                <div className="flex justify-center mt-10">
                    <Card className="w-[500px] h-[300px] flex flex-col justify-center items-center bg-black">
                        <h1 className="text-2xl font-semibold text-white mb-4">
                            Sign In
                        </h1>
                        <div className="flex justify-center items-center space-x-2">
                            <Input
                                placeholder="Password"
                                className="bg-white text-black w-64"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                className="bg-white text-black"
                                onClick={() => login(password)}
                            >
                                Sign In
                            </Button>
                        </div>
                        <Alert
                            variant="destructive"
                            className="mt-4 w-90 mt-5 text-white"
                        >
                            <AlertTitle>Hint</AlertTitle>
                            <AlertDescription>
                                Set the password in the PASSWORD environment
                                variable
                            </AlertDescription>
                        </Alert>
                    </Card>
                </div>
            </main>
        );
    }
}
