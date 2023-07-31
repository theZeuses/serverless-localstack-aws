import { getARNofSNS } from "@libs/resources";
import { getFirstKeyOfObject } from "@utils/helpers.utils";
import { SignUpTopic } from "@resources/sns";
import { ProcessAvatarQueue, ProcessBioQueue, ProcessWelcomeEmailQueue } from "@resources/sqs";

export const SignUpTopicToQueuePolicy = {
    Type: "AWS::SQS::QueuePolicy",
    Properties: {
      Queues: [
        {
          Ref: getFirstKeyOfObject({ ProcessBioQueue })
        },
        {
          Ref: getFirstKeyOfObject({ ProcessAvatarQueue })
        },
        {
          Ref: getFirstKeyOfObject({ ProcessWelcomeEmailQueue })
        }
      ],
      PolicyDocument: {
        Statement: [
          {
            Sid: "SignUpTopicToQueuePolicy001",
            Effect: "Allow",
            Principal: {
              Service: [
                "sns.amazonaws.com"
              ]
            },
            Action: "sqs:SendMessage",
            Resource: [
              {
                "Fn::GetAtt": [getFirstKeyOfObject({ ProcessBioQueue }), "Arn"]
              },
              {
                "Fn::GetAtt": [getFirstKeyOfObject({ ProcessAvatarQueue }), "Arn"]
              },
              {
                "Fn::GetAtt": [getFirstKeyOfObject({ ProcessWelcomeEmailQueue }), "Arn"]
              }
            ],
            Condition: {
              ArnEquals: {
                "aws:SourceArn": getARNofSNS(SignUpTopic)
              }
            }
          }
        ]
      }
    }
  }