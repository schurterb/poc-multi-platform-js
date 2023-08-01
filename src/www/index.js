import { getIP } from './js/ip.mjs';

window.showOutput = async function(outputId) {
  const output = document.getElementById(outputId);
  if (output) {
    switch (outputId) {
      case 'Browser':
        output.textContent = await runInBrowser();
        break;
      case 'Server':
        output.textContent = await runOnServer();
        break;
      case 'Serverless':
        output.textContent = await runOnServerless();
        break;
      default:
        console.error(`Invalid output ID: ${outputId}`);
    }
  } else {
    console.error(`Output element not found: ${outputId}`);
  }
}

async function runInBrowser() {
  return await getIP();
}

async function runOnServer() {
  try {
    const response = await fetch('/ip');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.text();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

async function runOnServerless() {
  AWS.config.region = 'us-west-2';
  const lambda = new AWS.Lambda();
  const functionName = 'YOUR_FUNCTION_NAME';
  
  const params = {
    FunctionName: functionName,
    Payload: ''
  };
  
  try {
    const data = await lambda.invoke(params).promise();
    return data;
  } catch (err) {
    console.log(err, err.stack);
  }
}


// ################################################
// ### Call the Lambda Function from the Client ###
// ################################################
