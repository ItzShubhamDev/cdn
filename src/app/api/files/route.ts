import S3Client from "@/lib/aws";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/authOptions";
import { config } from "@/lib/config";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 }
        );

    const prefix = config.prefix.endsWith("/")
        ? config.prefix
        : `${config.prefix}/`;

    const params = {
        Bucket: config.name,
        Prefix: prefix,
    };
    try {
        const data = await S3Client.listObjectsV2(params);

        const files = data.Contents
            ? data.Contents.map((file) => {
                  return {
                      key: file.Key,
                      size: file.Size,
                      url: `${config.cdnUrl}/${file.Key}`,
                      name: file.Key?.split("/").pop(),
                  };
              })
            : [];
        return NextResponse.json(
            files.filter((file) => !file.url.endsWith(prefix))
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed to list files" },
            { status: 500 }
        );
    }
}
