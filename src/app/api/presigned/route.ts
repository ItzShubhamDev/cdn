import { NextRequest, NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import S3Client from "@/lib/aws";
import { config } from "@/lib/config";

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const key = searchParams.get("key");
    const mimeType = searchParams.get("type");
    if (!key || key.length == 0)
        return NextResponse.json({ error: "No key provided" }, { status: 400 });
    if (!mimeType || mimeType.length == 0)
        return NextResponse.json(
            { error: "Mime type not present" },
            { status: 400 }
        );
    const prefix = config.prefix.endsWith("/")
        ? config.prefix
        : `${config.prefix}/`;

    const command = new PutObjectCommand({
        Bucket: config.name,
        Key: `${prefix}${key}`,
        ContentType: mimeType,
        ACL: "public-read",
    });
    const presignedUrl = await getSignedUrl(S3Client, command);

    return NextResponse.json({ url: presignedUrl });
}
