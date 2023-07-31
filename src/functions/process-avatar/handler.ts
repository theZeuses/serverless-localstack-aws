import { getBucketName } from "@libs/resources";
import { uploadStreamToS3 } from "@libs/s3";
import { HellishTrainBucket } from "@resources/s3";
import { documentClient, s3Client } from "@src/service";
import { makeDownloadStream } from "@utils/helpers.utils";
import { SQSEvent, SQSHandler } from "aws-lambda";
import { nanoid } from "nanoid";

const processAvatar: SQSHandler = async (event: SQSEvent) => {
  const data = JSON.parse(JSON.parse(event.Records[0].body).Message);

  const responseOfStreamData = await makeDownloadStream(data.avatar);

  const response = await uploadStreamToS3(
    s3Client, 
    responseOfStreamData.data, 
    getBucketName(HellishTrainBucket), 
    nanoid()
  );

  const newAvatar = response.Location;

  await documentClient.update({
    TableName: "users",
    Key: {
      id: data.id
    },
    UpdateExpression: "set avatar = :newAvatar",
    ExpressionAttributeValues: {
      ":newAvatar": newAvatar,
    }
  }).promise()
};

export const main = processAvatar;
