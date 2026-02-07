const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "fake",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "fake",
  },
});

const ddb = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME || "Products";

async function createProduct(product) {
  const params = {
    TableName: TABLE_NAME,
    Item: product,
  };
  await ddb.send(new PutCommand(params));
  return product;
}

async function getProduct(id) {
  const params = { TableName: TABLE_NAME, Key: { id } };
  const resp = await ddb.send(new GetCommand(params));
  return resp.Item;
}

async function listProducts() {
  const resp = await ddb.send(new ScanCommand({ TableName: TABLE_NAME }));
  return resp.Items || [];
}

async function updateProduct(id, attrs) {
  const UpdateExpression = [];
  const ExpressionAttributeNames = {};
  const ExpressionAttributeValues = {};

  let idx = 0;
  for (const k of Object.keys(attrs)) {
    idx++;
    const nameKey = `#k${idx}`;
    const valKey = `:v${idx}`;
    UpdateExpression.push(`${nameKey} = ${valKey}`);
    ExpressionAttributeNames[nameKey] = k;
    ExpressionAttributeValues[valKey] = attrs[k];
  }

  const params = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: "SET " + UpdateExpression.join(", "),
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  const resp = await ddb.send(new UpdateCommand(params));
  return resp.Attributes;
}

async function deleteProduct(id) {
  await ddb.send(new DeleteCommand({ TableName: TABLE_NAME, Key: { id } }));
  return { id };
}

module.exports = {
  createProduct,
  getProduct,
  listProducts,
  updateProduct,
  deleteProduct,
};
