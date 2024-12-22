"use client";

import FileIcon from "@/components/fileIcon";
import Navbar from "@/components/navbar";
import Protected from "@/components/protected";
import { formatBytes } from "@/lib/functions/formatBytes";
import { Card, Button, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BiCopy, BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";

interface File {
    key: string;
    url: string;
    name: string;
    size: number;
}

export default function Page() {
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/files")
            .then((res) => res.json())
            .then((data: File[] | { error: string }) => {
                if ("error" in data) {
                    toast.error(data.error);
                    setLoading(false);
                    return;
                }
                setFiles(data);
                setLoading(false);
            });
    }, []);

    async function deleteFile(key: string) {
        const res = await fetch("/api/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ key }),
        });
        if (res.ok) {
            setFiles(files.filter((file) => file.key !== key));
            toast.success("File deleted successfully");
        } else {
            toast.error("Failed to delete file");
        }
    }

    function copyURL(url: string, name: string) {
        navigator.clipboard.writeText(url);
        toast.dismiss();
        toast.success(
            `Copied ${name.slice(0, 3)}...${name
                .split(".")
                .pop()} URL to clipboard`,
            {
                icon: <FileIcon filename={name} className="w-8 h-8" />,
            }
        );
    }
    return (
        <Protected>
            <div className="h-full w-full px-8">
                <Navbar />
                <Card className="w-full p-4">
                    {!loading ? (
                        <ul className="space-y-3">
                            {files.length > 0 ? (
                                files.map((file) => (
                                    <li key={file.key}>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <FileIcon
                                                    filename={file.name}
                                                    className="w-8 h-8"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate">
                                                    {file.name}
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center font-semibold">
                                                {formatBytes(file.size)}
                                            </div>
                                            <div className="flex-shrink-0 space-x-2">
                                                <Button
                                                    size="md"
                                                    isIconOnly
                                                    onClick={() => {
                                                        deleteFile(file.key);
                                                    }}
                                                >
                                                    <BiTrash />
                                                </Button>
                                                <Button
                                                    size="md"
                                                    isIconOnly
                                                    onClick={() => {
                                                        copyURL(
                                                            file.url,
                                                            file.name
                                                        );
                                                    }}
                                                >
                                                    <BiCopy />
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p className="text-center text-xl">
                                    No files found
                                </p>
                            )}
                        </ul>
                    ) : (
                        <div className="flex w-full justify-center py-4">
                            <Spinner size="lg" color="default" />
                        </div>
                    )}
                </Card>
            </div>
        </Protected>
    );
}
