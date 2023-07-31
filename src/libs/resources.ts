import { appConfig } from "@configs/app.config"

export const getARNofSNS = (snsResource) => {
    return `arn:aws:sns:${appConfig.REGION}:${appConfig.ACCOUNT}:${snsResource.Properties.TopicName}`
}

export const getBucketName = (s3BucketResource) => {
    return s3BucketResource.Properties.BucketName;
}