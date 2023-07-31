import type { AWS } from "@serverless/typescript";
import signup from "@functions/signup";
import processBio from "@functions/process-bio";
import processAvatar from "@functions/process-avatar";
import processAvatarRetry from "@functions/process-avatar-dlq";
import processWelcomeEmail from "@functions/process-welcome-email";
import { appConfig } from "@configs/app.config";
import { LambdaExecutorDefaultRole, SignUpTopicToQueuePolicy } from "@resources/policies";
import { SignUpTopic } from "@resources/sns";
import { ProcessAvatarQueue, ProcessAvatarQueueDLQ, ProcessBioQueue, ProcessWelcomeEmailQueue } from "@resources/sqs";
import { UserTable } from "@resources/dynamodb";
import { HellishTrainBucket } from "@resources/s3";
import { getFirstKeyOfObject } from "@utils/helpers.utils";

const serverlessConfiguration: AWS = {
  service: "serverless-localstack-aws",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-localstack"
  ],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      ACCOUNT: appConfig.ACCOUNT,
      REGION: appConfig.REGION,
      TOPIC_NAME: appConfig.TOPIC_NAME,
      DYNAMODB_ENDPOINT: appConfig.DYNAMODB_ENDPOINT,
      SNS_ENDPOINT: appConfig.SNS_ENDPOINT,
      SES_ENDPOINT: appConfig.SES_ENDPOINT,
      S3_ENDPOINT: appConfig.S3_ENDPOINT,
      EMAIL_FROM: appConfig.EMAIL_FROM
    },
    iam: {
      role: getFirstKeyOfObject({ LambdaExecutorDefaultRole })
    }
  },
  functions: { signup, processBio, processAvatar, processAvatarRetry, processWelcomeEmail },
  resources: {
    Resources: {
      ProcessBioQueue,
      ProcessAvatarQueueDLQ,
      ProcessAvatarQueue,
      ProcessWelcomeEmailQueue,
      SignUpTopic,
      HellishTrainBucket,
      UserTable,
      SignUpTopicToQueuePolicy,
      LambdaExecutorDefaultRole
    }
  },
  package: { individually: true },
  custom: {
    localstack: {
      stages: ["local"],
      debug: true,
      lamda: {
        mountCode: true
      },
      host: "127.0.0.1",
    }
  },
};

module.exports = serverlessConfiguration;
