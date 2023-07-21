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