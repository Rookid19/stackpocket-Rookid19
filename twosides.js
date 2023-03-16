const array = [[0, 1, 2, 3], [0, 1, 2], [0, 1], [0]];

array.map((arr) => (
  <div>
    {arr.map((card,index) => (
      <div className="row" key={index}>
        <div className="card">Card goes in here</div>
      </div>
    ))}
  </div>
));

let randomNumber = (Math.random() * 10).toFixed(3);
console.log(randomNumber);

