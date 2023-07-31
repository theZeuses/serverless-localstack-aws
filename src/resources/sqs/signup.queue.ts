import { getFirstKeyOfObject } from "@utils/helpers.utils"

export const ProcessBioQueue = {
    Type: "AWS::SQS::Queue",
    Properties: {
      FifoQueue: false,
      QueueName: "process-bio-queue"
    }
}

export const ProcessAvatarQueueDLQ = {
  Type: "AWS::SQS::Queue",
  Properties: {
    FifoQueue: false,
    QueueName: "process-avatar-queue-dlq"
  }
}

export const ProcessAvatarQueue = {
  Type: "AWS::SQS::Queue",
  Properties: {
    FifoQueue: false,
    QueueName: "process-avatar-queue",
    RedrivePolicy: {
      deadLetterTargetArn: {
        "Fn::GetAtt": [ getFirstKeyOfObject({ ProcessAvatarQueueDLQ }), "Arn" ]
      },
      maxReceiveCount: 3
    }
  }
}

export const ProcessWelcomeEmailQueue = {
  Type: "AWS::SQS::Queue",
  Properties: {
    FifoQueue: false,
    QueueName: "process-welcome-email-queue",
  }
}