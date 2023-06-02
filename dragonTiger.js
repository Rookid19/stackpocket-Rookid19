const data = {
  "1v2": [1, "d", 2, "tg"],
  "1v3": [1, "d", 2, "ti"],
  "1v4": [1, "d"],
  "1v5": [1, "d", 2, "ti", 3, "tg"],
};

// let filteredKeyArra = Object.keys(data)[0]
let filteredKeyArr = Object.keys(data).map((arr) => {
  let a = data[arr].filter((item) => typeof item === "string");
  return {
    [arr]: a,
  };
});

console.log(JSON.stringify(filteredKeyArr));