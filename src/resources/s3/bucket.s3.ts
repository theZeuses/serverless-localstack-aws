export const HellishTrainBucket = {
    Type: "AWS::S3::Bucket",
    Properties: {
        BucketName: "hellish-train",
        AccessControl: "PublicRead"
    }
}