import { appConfig } from "@configs/app.config";
import { ProcessAvatarQueue, ProcessBioQueue, ProcessWelcomeEmailQueue } from "@resources/sqs";
import { getFirstKeyOfObject } from "@utils/helpers.utils";

export const SignUpTopic = {
  Type: "AWS::SNS::Topic",
  Properties: {
    TopicName: appConfig.TOPIC_NAME,
    ContentBasedDeduplication: false,
    FifoTopic: false,
    Subscription: [
      {
        Endpoint: {
          "Fn::GetAtt": [getFirstKeyOfObject({ ProcessBioQueue }), "Arn"]
        },
        Protocol: "sqs"
      },
      {
        Endpoint: {
          "Fn::GetAtt": [getFirstKeyOfObject({ ProcessAvatarQueue }), "Arn"]
        },
        Protocol: "sqs"
      },
      {
        Endpoint: {
          "Fn::GetAtt": [getFirstKeyOfObject({ ProcessWelcomeEmailQueue }), "Arn"]
        },
        Protocol: "sqs"
      }
    ]
  }
}