const env = process.env;

const keys = {
    required: [
        "NAME",
        "KEY",
        "SECRET",
        "ENDPOINT",
        "REGION",
        "CDN_URL",
        "NEXTAUTH_SECRET",
        "USER_PASSWORD",
    ],
    optional: [
        "COMPANY_NAME",
        "COMPANY_DESC",
        "PREFIX",
        "USER_ID",
        "USER_NAME",
        "USER_EMAIL",
        "MAX_SIZE",
        "NEXTAUTH_URL",
    ],
};

function getRequiredKeys() {
    keys.required.forEach((key) => {
        if (!env[key]) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
    });
    return {
        name: env.NAME,
        key: env.KEY,
        secret: env.SECRET,
        endpoint: env.ENDPOINT,
        region: env.REGION,
        cdnUrl: env.CDN_URL,
        userPassword: env.USER_PASSWORD,
    };
}

function getOptionalKeys() {
    return {
        companyName: env.COMPANY_NAME || "CDN Web",
        companyDesc:
            env.COMPANY_DESC ||
            "A beautiful UI to upload your files to the S3 or S3 based buckets.",
        prefix: env.PREFIX || "/",
        userId: env.USER_ID || "1",
        userName: env.USER_NAME || "user",
        userEmail: env.USER_EMAIL || " ",
        maxSize: env.MAX_SIZE || (1024 * 1024 * 5).toString(),
    };
}

export const config = {
    ...getRequiredKeys(),
    ...getOptionalKeys(),
};
