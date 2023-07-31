import { appConfig } from "@configs/app.config";
import { SNS } from "aws-sdk";

export const snsClient = new SNS({
    endpoint: appConfig.SNS_ENDPOINT
})