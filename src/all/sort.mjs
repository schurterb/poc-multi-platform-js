
export function doSort() {
  const go = new Go();
  WebAssembly.instantiateStreaming(fetch("./js/sort.wasm"), go.importObject).then((result) => {
    console.log("result:",result);
    const output = go.run(result.instance);
    console.log("output:",output);
  });
}