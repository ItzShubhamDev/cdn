"use client";

import { Card, CardFooter, Button } from "@nextui-org/react";
import { BiSend, BiSolidFileImport, BiTrash, BiUpload } from "react-icons/bi";
import { useCallback, useRef, useState } from "react";
import FileIcon from "@/components/fileIcon";
import Protected from "@/components/protected";
import { toast } from "react-toastify";
import Navbar from "@/components/navbar";
import NProgress from "nprogress";
import { lookup } from "mime-types";
import { formatBytes } from "@/lib/functions/formatBytes";

interface URL {
    key: string;
    url: string;
    time: number;
}

export default function Page() {
    const [file, setFile] = useState<File | null>(null);
    const [urls, setUrls] = useState<URL[]>([]);

    const ref = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        if (!file) {
            toast.error("No file selected.");
            return;
        }
        const limit = parseInt(
            process.env.NEXT_PUBLIC_LIMIT || (1024 * 1024 * 5).toString()
        );
        if (file.size > limit) {
            toast.error(`File size exceeds ${formatBytes(limit)}`);
            return;
        }
        const mimeType = lookup(file.name) || "text/plain";

        NProgress.start();
        const temp = urls.find((u) => u.key === file.name);
        let url: string = "";

        if (temp && temp.time > Date.now()) {
            url = temp.url;
        } else {
            const r = await fetch(
                `/api/presigned?key=${file.name}&type=${mimeType}`
            );
            const json = await r.json();
            url = json.url ? json.url : "";
            setUrls([...urls, { key: file.name, url, time: Date.now() + 800 }]);
        }

        if (url === "") {
            return toast.error("Failed to get presigned URL.");
        }

        NProgress.start();
        try {
            const res = await fetch(url, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": mimeType,
                    "x-amz-acl": "public-read",
                },
            });

            NProgress.done();

            if (res.ok) {
                const u =
                    "https://" +
                    url.split("?")[0].split("/").slice(3).join("/");
                return toast.success(
                    `File uploaded successfully (Click to copy link)`,
                    {
                        onClick: () => {
                            navigator.clipboard.writeText(u);
                            toast.dismiss();
                        },
                        autoClose: false,
                    }
                );
            } else {
                console.log("Upload failed.", res.text());
                toast.error("Upload failed.");
            }
        } catch (e) {
            NProgress.done();
            console.error(e);
            toast.error("Upload failed.");
        }
    };

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    return (
        <Protected>
            <Navbar />
            <div className="h-full w-full px-8">
                <Card
                    isFooterBlurred
                    radius="lg"
                    className="border-gray-500/20 border-1"
                >
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="w-full h-[calc(100vh-40px)] max-h-96 flex flex-col justify-center items-center"
                    >
                        {file ? (
                            <FileIcon filename={file.name} className="h-10" />
                        ) : (
                            <label
                                htmlFor="file"
                                className="text-foreground hover:cursor-pointer"
                                aria-label="file"
                            >
                                <BiSolidFileImport size={40} />
                            </label>
                        )}
                        <p className="text-lg font-semibold mt-2 truncate max-w-full px-2">
                            {file ? file.name : "Drop Files Here"}
                        </p>
                    </div>
                    <CardFooter className="justify-center bg-default-200 border-gray-400/10 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                        <div className="flex space-x-2">
                            <Button
                                as="label"
                                htmlFor="file"
                                isIconOnly
                                color="warning"
                                className="text-white bg-warning dark:bg-warning/80"
                            >
                                <BiUpload />
                            </Button>
                            <Button
                                color="danger"
                                isIconOnly
                                className="bg-danger dark:bg-danger/80"
                                onClick={() => setFile(null)}
                            >
                                <BiTrash />
                            </Button>
                            <Button
                                color="success"
                                isIconOnly
                                className="text-white bg-success dark:bg-success/80"
                                onClick={handleSubmit}
                            >
                                <BiSend />
                            </Button>
                        </div>
                        <input
                            id="file"
                            type="file"
                            accept="*/*"
                            ref={ref}
                            className="opacity-0 absolute -z-10"
                            onChange={() => {
                                const file = ref.current?.files?.[0];
                                if (file) {
                                    setFile(file);
                                }
                            }}
                        />
                    </CardFooter>
                </Card>
            </div>
        </Protected>
    );
}
