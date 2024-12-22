import { S3 } from "@aws-sdk/client-s3";
import { config } from "./config";

const endpoint = config.endpoint;
const key = config.key;
const secret = config.secret;
const region = config.region;

if (!endpoint || !key || !secret || !region) {
    throw new Error("Missing required environment variables for Bucket");
}

const S3Client = new S3({
    endpoint,
    region: region,
    credentials: {
        accessKeyId: key,
        secretAccessKey: secret,
    },
});

export default S3Client;
