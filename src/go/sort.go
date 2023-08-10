package main
import (
	"math/rand"
	"sort"
	"syscall/js"
)
//export GenerateAndSort
func GenerateAndSort(this js.Value, args []js.Value) interface{} {
	size := 100000
	nums := make([]int, size)
	for i := 0; i < size; i++ {
		nums[i] = rand.Intn(size)
	}
	sort.Ints(nums)
	return nil
}
func main() {
	c := make(chan struct{}, 0)
	println("WASM Go Initialized")
	js.Global().Set("generateAndSort", js.FuncOf(GenerateAndSort))
	<-c
}
