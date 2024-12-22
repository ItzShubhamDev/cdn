# CDN Web

A beautiful UI to upload your files to the S3 or S3 based buckets.

## Run Locally

Clone the project

```bash
git clone https://github.com/ItzShubhamDev/cdn
```

Go to the project directory

```bash
cd cdn
```

Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

Configure the variables

Build the server

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Start the server

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`NAME` The Bucket Name

`ENDPOINT` The Connection Endpoint of S3 Bucket

`KEY` Bucket Secret Id

`SECRET` Bucket Secret Token

`REGION` Bucket Region

`CDN_URL` The URL at which CDN is configured

`NEXTAUTH_SECRET` A random string is used to hash tokens, sign/encrypt cookies and generate cryptographic keys.

`NEXTAUTH_URL` The URL of your website

`USER_PASSWORD` Password, used for login purpose

Optional Variables

`COMPANY_NAME` Used at Title of the Website, defaults to `CDN Web`

`COMPANY_DESC` Used at Description of Website, defaults to `A beautiful UI to upload your files to the S3 or S3 based buckets.`

`PREFIX` Prefix for storing the files, useful to make multiple UIs for a same bucket, defaults to `/`

`USER_ID` Random number, just for next auth, defaults to `1`

`USER_NAME` Username, used for login purpose, defaults to `user`

`USER_EMAIL` Email, just for next auth, defaults to ` `

`NEXT_PUBLIC_LIMIT` The limit for upload file size in bytes, defaults to 5 Mb
