const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: 'us-west-2' });

const functionName = 'YOUR_FUNCTION_NAME';
const handler = 'framework/cloud/lambda.handler';
const role = 'arn:aws:iam::123456789012:role/YOUR_ROLE_NAME';
const zipFile = 'YOUR_ZIP_FILE';

const params = {
  FunctionName: functionName,
  Handler: handler,
  Role: role,
  Runtime: 'nodejs14.x',
  Code: {
    ZipFile: zipFile
  }
};

lambda.createFunction(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
});