import { appConfig } from "@configs/app.config";
import { DynamoDB } from "aws-sdk";

export const documentClient = new DynamoDB.DocumentClient({
  service: new DynamoDB({
    endpoint: appConfig.DYNAMODB_ENDPOINT,
    region: appConfig.REGION
  })
});