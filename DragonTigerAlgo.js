const drawNumbers = [
    [9, 8, 3, 2, 7],
    [9, 1, 3, 2, 7],
    [2, 8, 3, 2, 7],
    [8, 8, 3, 2, 7],
    [7, 7, 3, 2, 7],
    [7, 1, 3, 2, 7],
    [9, 5, 3, 2, 7],
    [4, 3, 3, 2, 7],
    [4, 3, 3, 2, 7],
    [6, 8, 3, 2, 7],
    [4, 3, 3, 2, 7]
  ];

  const evenAndOdd = (drawNumbers, type) => {
    const columns = [0, 1, 2, 3, 4];
    const boolArray = columns.map((item) =>
      type === "even"
        ? drawNumbers.map((array, i) => array[item] % 2 === 0)
        : drawNumbers.map((array, i) => array[item] % 2 !== 0)
    );
    const consecutiveArray = {};
    let count = 1;
    columns.forEach((value) => {
      boolArray[value].forEach((item, index) =>
        item === boolArray[value][index + 1] && item === true
          ? count++
          : (count > 1 && (consecutiveArray[value + 1 + type] = count),
            (count = 1))
      );
    });
  
    return Object.entries(consecutiveArray);
  };
  // console.log(evenAndOdd(drawNumbers, "even"));
  
  function getCombinations(array, r) {
    const result = [];
  
    // Recursive function to generate combinations
    function generateCombos(combination, index) {
      if (combination.length === r) {
        result.push(combination);
        return;
      }
  
      if (index >= array.length) {
        return;
      }
  
      const newCombo = [...combination];
      newCombo.push(array[index]);
  
      generateCombos(newCombo, index + 1);
      generateCombos(combination, index + 1);
    }
  
    generateCombos([], 0);
    return result;
  }
  
  // let finalArray = [];
  // const dragonAndTiger = () =>{
  
   let testResults =  getCombinations([1, 2, 3, 4, 5], 2).map(
      (testIndexArr, pos) => {
        // const testIndexArr = [1,2];
    
        const filteredTestIndexArr = testIndexArr.map((column) =>
          drawNumbers.map((arr) => arr[column - 1])
        );
        const transpose = filteredTestIndexArr[0].map((col, i) =>
          filteredTestIndexArr.map((row) => row[i])
        );
        const reduceArray = transpose.map((arr) =>
          arr.reduce((prev, curr) => (prev > curr ? "Dragon" : prev < curr ? "Tiger" : "And"))
        );
        let results = {};
        let counter = 1;
    
        reduceArray.forEach((val, index) => {
          if (val === reduceArray[index + 1]) {
            counter++;
          } else {
            // counter > 1 ? results.push([reduceArray[index-1], counter]):null
            counter > 1 ? (results["name"] = val,results["issues"] = counter,results['type'] = testIndexArr.toString().replace(","," vs ")) : null;
            counter = 1; //reset counter
          }
        });
        return  results
      }
    );
  
  
    // const newArray = [];
    
    // testResults.forEach(obj => {
    //   const { name, type, issues} = obj;
    //   if (issues !== undefined) {
    //     newArray.push({ name,issues, type });
    //   }

    // });
    
    console.log(testResults);
