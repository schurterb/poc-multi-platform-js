const AWS = require('aws-sdk');
const iam = new AWS.IAM();
const logs = new AWS.CloudWatchLogs();
const lambda = new AWS.Lambda({ region: 'us-west-2' });

const roleName = 'YOUR_ROLE_NAME';
const functionName = 'YOUR_FUNCTION_NAME';
const handler = 'framework/cloud/lambda.handler';
const zipFile = 'YOUR_ZIP_FILE';

const rolePolicyDocument = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: {
        Service: "lambda.amazonaws.com",
      },
      Action: "sts:AssumeRole",
    },
  ],
};

async function createResources() {
  try {
    const role = await iam.createRole({
      AssumeRolePolicyDocument: JSON.stringify(rolePolicyDocument),
      RoleName: roleName,
    }).promise();
    const roleArn = role.Role.Arn;
    const policyArn = 'arn:aws:iam::aws:policy/AmazonS3FullAccess';
    const logsPolicyArn = 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole';

    await iam.attachRolePolicy({ RoleName: roleName, PolicyArn: policyArn }).promise();
    await iam.attachRolePolicy({ RoleName: roleName, PolicyArn: logsPolicyArn }).promise();

    const params = {
      FunctionName: functionName,
      Handler: handler,
      Role: roleArn,
      Runtime: 'nodejs14.x',
      Code: {
        ZipFile: zipFile
      }
    };

    await lambda.createFunction(params).promise();
    await logs.createLogGroup({ logGroupName: `/aws/lambda/${functionName}` }).promise();

    console.log('Lambda Function and associated CloudWatch Log Group created successfully.');
  } catch (err) {
    console.error('Error', err);
  }
}

createResources();
