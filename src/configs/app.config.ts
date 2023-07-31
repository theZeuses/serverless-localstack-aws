import { config } from "dotenv";

config();

export const appConfig = {
    ACCOUNT: process.env.ACCOUNT,
    TOPIC_NAME: "signup",
    REGION: process.env.REGION,
    DYNAMODB_ENDPOINT: process.env.DYNAMODB_ENDPOINT,
    SNS_ENDPOINT: process.env.SNS_ENDPOINT,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    SES_ENDPOINT: process.env.SES_ENDPOINT,
    EMAIL_FROM: process.env.EMAIL_FROM
}