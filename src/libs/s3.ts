import { S3 } from "aws-sdk";
import { PassThrough, Stream } from "stream";

export async function uploadStreamToS3(
    s3Client: S3,
    stream: Stream,
    bucketName: string,
    fileKey: string
) {
    const passThrough = new PassThrough();

    const response = s3Client.upload({ Bucket: bucketName, Key: fileKey, Body: passThrough }).promise();

    stream.pipe(passThrough);

    return response;
}