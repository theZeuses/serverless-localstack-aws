import { getFirstKeyOfObject } from "@utils/helpers.utils";
import { UserTable } from "@resources/dynamodb";
import { HellishTrainBucket } from "@resources/s3";

export const LambdaExecutorDefaultRole = {
    Type: "AWS::IAM::Role",
    Properties: {
        RoleName: "LambdaExecutorDefaultRole",
        AssumeRolePolicyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: "Allow",
                    Principal: {
                        Service: [
                            "lambda.amazonaws.com",
                        ]
                    },
                    Action: "sts:AssumeRole"
                }
            ]
        },
        Policies: [
            {
                PolicyName: "LambdaExecutorDefaultRole-DDB-Policy",
                PolicyDocument: {
                    Version: '2012-10-17',
                    Statement: [
                        {
                            Effect: "Allow",
                            Action: [
                                "dynamodb:PutItem"
                            ],
                            Resource: [
                                {
                                    "Fn::GetAtt": [getFirstKeyOfObject({ UserTable }), "Arn"]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                PolicyName: "LambdaExecutorDefaultRole-SES-Policy",
                PolicyDocument: {
                    Version: '2012-10-17',
                    Statement: [
                        {
                            Effect: "Allow",
                            Action: [
                                "ses:SendEmail",
                                "ses:SendRawEmail"
                            ],
                            Resource: "*"
                        }
                    ]
                }
            },
            {
                PolicyName: "LambdaExecutorDefaultRole-S3-Policy",
                PolicyDocument: {
                    Version: '2012-10-17',
                    Statement: [
                        {
                            Effect: "Allow",
                            Action: [
                                "s3:PutObject",
                                "s3:PutObjectAcl"
                            ],
                            Resource: {
                                "Fn::GetAtt": [getFirstKeyOfObject({ HellishTrainBucket }), "Arn"]
                            }
                        }
                    ]
                }
            },
            {
                PolicyName: "LambdaExecutorDefaultRole-SNS-Policy",
                PolicyDocument: {
                    Version: '2012-10-17',
                    Statement: [
                        {
                            Effect: "Allow",
                            Action: [
                                "sns:*",
                            ],
                            Resource: "*"
                        }
                    ]
                }
            },
            {
                PolicyName: "LambdaExecutorDefaultRole-SQS-Policy",
                PolicyDocument: {
                    Version: '2012-10-17',
                    Statement: [
                        {
                            Effect: "Allow",
                            Action: [
                                "sqs:ReceiveMessage",
                                "sqs:DeleteMessage",
                                "sqs:GetQueueAttributes"
                            ],
                            Resource: "*"
                        }
                    ]
                }
            },
        ]
    }
}