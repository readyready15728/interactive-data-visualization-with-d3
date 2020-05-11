d3.csv('../data/food.csv', (d) => {
  return {
    Food: d.Food,
    Deliciousness: parseFloat(d.Deliciousness)
  };
}, (rows) => {
  console.log('Hi');
  console.log(rows);
});
