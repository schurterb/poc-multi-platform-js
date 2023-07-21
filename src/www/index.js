function showOutput(outputId) {
  const output = document.getElementById(outputId);
  if (output) {
    switch (outputId) {
      case 'output1':
        output.textContent = getOutput1();
        break;
      case 'output2':
        output.textContent = getOutput2();
        break;
      case 'output3':
        output.textContent = getOutput3();
        break;
      default:
        console.error(`Invalid output ID: ${outputId}`);
    }
  } else {
    console.error(`Output element not found: ${outputId}`);
  }
}

function getOutput1() {
  return 'Output 1 text';
}

function getOutput2() {
  return 'Output 2 text';
}

function getOutput3() {
  return 'Output 3 text';
}

// ################################################
// ### Call the Lambda Function from the Client ###
// ################################################

AWS.config.region = 'us-west-2';

const lambda = new AWS.Lambda();

const functionName = 'YOUR_FUNCTION_NAME';

const params = {
  FunctionName: functionName,
  Payload: JSON.stringify({ /* your payload here */ })
};

lambda.invoke(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
});