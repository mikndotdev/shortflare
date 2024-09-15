"use client";
import Image from "next/image";

import { CgSpinnerTwo } from "react-icons/cg";

import { Card } from "@/app/components/shadcn/card";
import { Button } from "@/app/components/shadcn/button";
import { Input } from "@/app/components/shadcn/input";
import LinkForm from "@/app/components/custom/LinkForm";
import {
    Alert,
    AlertTitle,
    AlertDescription,
} from "@/app/components/shadcn/alert";
import {
    Menu,
    MenuIcon,
    MenuItem,
    MenuList,
    MenuSubContent,
} from "@/app/components/uiastra/menu";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/components/shadcn/table";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    if (status === "unauthenticated") {
        router.push("/");
        return (
            <main>
                <h1 className="text-center mt-10 text-4xl font-bold text-white">
                    ShortFlare Dashboard
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

    if (status === "authenticated" && session) {
        return (
            <main>
                <Menu className="min-w-[800px] bg-black text-white">
                    <MenuIcon>
                        <h1 className="text-2xl font-bold">ShortFlare</h1>
                        <h1 className="text-md font-bold ml-2 text-yellow-400">
                            UI v1.0
                        </h1>
                    </MenuIcon>
                    <MenuList>
                        <MenuItem onClick={() => router.push("/dashboard")}>
                            Overview
                        </MenuItem>
                        <MenuItem
                            isActive
                            onClick={() => router.push("/dashboard/create")}
                        >
                            Create Link
                        </MenuItem>
                        <MenuItem
                            className="text-red-600"
                            onClick={() => signOut({ redirect: false })}
                        >
                            Sign Out
                        </MenuItem>
                    </MenuList>
                </Menu>
                <h1 className="text-center mt-10 text-4xl font-bold text-white">
                    Shorten a link
                </h1>
                <div className="flex justify-center mt-10">
                    <LinkForm />
                </div>
            </main>
        );
    }
}
