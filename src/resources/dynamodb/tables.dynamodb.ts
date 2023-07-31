export const UserTable = {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        TableName: "users",
        BillingMode: "PAY_PER_REQUEST",
        AttributeDefinitions: [
            {
                AttributeName: "id",
                AttributeType: "S"
            },
        ],
        KeySchema: [
            {
                AttributeName: "id",
                KeyType: "HASH"
            }
        ]
    }
}