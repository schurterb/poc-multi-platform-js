import { doSort } from './js/sort.mjs';

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
  try {
    return await doSort();
  } catch(err) {
    console.log(err);
    return "FAIL";
  }
}

async function runOnServer() {
  try {
    const response = await fetch('/sort');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.text();
      return data;
    }
  } catch (error) {
    console.error(error);
    return "FAIL";
  }
}

async function runOnServerless() {
  try {
    AWS.config.region = 'us-west-2';
    const lambda = new AWS.Lambda();
    const functionName = 'YOUR_FUNCTION_NAME';

    const params = {
      FunctionName: functionName,
      Payload: ''
    };

    const data = await lambda.invoke(params).promise();
    return data;
  } catch(err) {
    console.log(err);
    return "FAIL";
  }
}


// ################################################
// ### Call the Lambda Function from the Client ###
// ################################################
