import { handlerPath } from "@libs/handler-resolver";
import { ProcessAvatarQueue } from "@resources/sqs";
import { getFirstKeyOfObject } from "@utils/helpers.utils";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: {
          "Fn::GetAtt": [getFirstKeyOfObject({ ProcessAvatarQueue }), "Arn"]
        }
      }
    },
  ],
};
