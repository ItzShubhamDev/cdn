import { NextRequest, NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import S3Client from "@/lib/aws";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { config } from "@/lib/config";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 }
        );
    try {
        const body = await req.json();
        const key = body.key as string | undefined;

        if (!key) {
            return NextResponse.json({ error: "No file key" }, { status: 400 });
        }

        const command = new DeleteObjectCommand({
            Bucket: config.name,
            Key: key,
        });

        await S3Client.send(command);
        return NextResponse.json(key);
    } catch (error) {
        console.error("Failed to delete file", error);
        return NextResponse.json(
            { error: "Failed to delete file" },
            { status: 500 }
        );
    }
}
