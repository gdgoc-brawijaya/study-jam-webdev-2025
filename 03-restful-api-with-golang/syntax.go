package main

import "fmt"

// Person is a simple struct type.
type Person struct {
	Name string
	Age  int
}

func add(a, b int) int {
	return a + b
}

func main() {
	// 1) Variable and constant
	var language string = "Go"
	version := 1.22 // short variable declaration
	const isFun = true

	fmt.Println("Language:", language, "Version:", version, "Fun:", isFun)

	// 2) Number and function
	x, y := 7, 5
	fmt.Println("add(x, y) =", add(x, y))

	// 3) if / else
	if x > y {
		fmt.Println("x is bigger than y")
	} else {
		fmt.Println("x is not bigger than y")
	}

	// 4) for loop (only loop in Go)
	for i := 1; i <= 3; i++ {
		fmt.Println("loop i =", i)
	}

	// 5) Slice and range
	nums := []int{10, 20, 30}
	for idx, val := range nums {
		fmt.Println("nums[", idx, "] =", val)
	}

	// 6) Map
	scores := map[string]int{"rusdi": 90, "gatot": 80}
	fmt.Println("score rusdi =", scores["rusdi"])

	// 7) Struct
	p := Person{Name: "Abi", Age: 20}
	fmt.Printf("Person: %+v\n", p)
}
