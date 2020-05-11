let dataset = [5, 10, 15, 20, 25];

d3.select('body').selectAll('p')
  .data(dataset)
  .enter()
  .append('p')
  .text((d) => { return 'I can count up to ' + d; })
  .style('color', 'red');
