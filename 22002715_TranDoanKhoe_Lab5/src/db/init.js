const {
  DynamoDBClient,
  CreateTableCommand,
  DescribeTableCommand,
} = require("@aws-sdk/client-dynamodb");

const TABLE_NAME = process.env.TABLE_NAME || "Products";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "fake",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "fake",
  },
});

async function tableExists() {
  try {
    await client.send(new DescribeTableCommand({ TableName: TABLE_NAME }));
    return true;
  } catch (err) {
    return false;
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForDynamo(retries = 10, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      // simple ping by listing/describe table (may return 404 if table not present)
      await client.send(new DescribeTableCommand({ TableName: TABLE_NAME }));
      return true;
    } catch (err) {
      // connection error or table not found both indicate service reachable or not
      if (err.name === "ResourceNotFoundException") return true;
      console.log(
        `DynamoDB not ready yet (attempt ${i + 1}/${retries}), retrying in ${delay}ms`,
      );
      await wait(delay);
      delay = Math.min(delay * 1.5, 5000);
    }
  }
  return false;
}

async function initDB() {
  const ready = await waitForDynamo(20, 500);
  if (!ready) {
    const e = new Error("DynamoDB did not become ready in time");
    console.error(e);
    throw e;
  }

  const exists = await tableExists();
  if (exists) {
    console.log(`${TABLE_NAME} exists`);
    return;
  }

  const params = {
    TableName: TABLE_NAME,
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
    BillingMode: "PAY_PER_REQUEST",
  };

  try {
    await client.send(new CreateTableCommand(params));
    console.log(`Created table ${TABLE_NAME}`);
  } catch (err) {
    console.error("Error creating table", err);
    throw err;
  }
}

module.exports = initDB;
