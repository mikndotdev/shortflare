"use client";
import Image from "next/image";

import { CgSpinnerTwo } from "react-icons/cg";
import { IoReloadCircle, IoTrashBin, IoAnalytics } from "react-icons/io5";

import { Card } from "../components/shadcn/card";
import { Button } from "../components/shadcn/button";
import { Input } from "../components/shadcn/input";
import {
    Alert,
    AlertTitle,
    AlertDescription,
} from "../components/shadcn/alert";
import {
    Menu,
    MenuIcon,
    MenuItem,
    MenuList,
    MenuSubContent,
} from "../components/uiastra/menu";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/shadcn/table";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [list, setList] = useState<{ slug: string; destination: string }[]>(
        [],
    );
    const [loading, setLoading] = useState(false);

    const fetchList = async () => {
        setLoading(true);
        const response = await fetch("/api/worker/list");
        const json = await response.json();
        setList(json);
        setLoading(false);
    };

    useEffect(() => {
        fetchList();
    }, []);

    const remove = async (slug: string) => {
        const response = await fetch(`/api/worker/delete?slug=${slug}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            toast.success("Link removed successfully!");
            fetchList();
        } else {
            toast.error("Failed to remove link!");
        }
    };

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
                        <MenuItem
                            isActive
                            onClick={() => router.push("/dashboard")}
                        >
                            Overview
                        </MenuItem>
                        <MenuItem
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
                    Hello, {session.user?.name}
                </h1>
                <div className="flex justify-center mt-10">
                    <Button
                        onClick={fetchList}
                        className="bg-blue-700 text-white"
                        disabled={loading}
                    >
                        <IoReloadCircle className="mr-2" size={20} />
                        Fetch List
                    </Button>
                </div>
                <div className="flex justify-center mt-5">
                    <Card className="w-[1000px] min-h-36 flex flex-col justify-center items-center bg-black text-white">
                        {loading ? (
                            <CgSpinnerTwo
                                size={90}
                                className="animate-spin text-white"
                            />
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">
                                            Slug
                                        </TableHead>
                                        <TableHead>Destination</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {list.map((item) => (
                                        <TableRow key={item.slug}>
                                            <TableCell className="font-medium">
                                                {item.slug}
                                            </TableCell>
                                            <TableCell>
                                                {item.destination}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    className="bg-red-700 text-white mr-2"
                                                    onClick={() =>
                                                        remove(item.slug)
                                                    }
                                                >
                                                    <IoTrashBin
                                                        className=""
                                                        size={20}
                                                    />
                                                </Button>
                                                <Button
                                                    className="bg-green-700 text-white"
                                                    onClick={() =>
                                                        router.push(
                                                            `/analytics/${item.slug}`,
                                                        )
                                                    }
                                                >
                                                    <IoAnalytics
                                                        className=""
                                                        size={20}
                                                    />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </Card>
                </div>
            </main>
        );
    }
}
