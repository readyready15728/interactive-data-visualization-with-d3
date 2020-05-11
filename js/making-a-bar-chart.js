let w = 500;
let h = 100;
let barPadding = 1;

let dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

let svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', (d, i) => {
    return i * w / dataset.length;
  })
  .attr('y', (d) => {
    return h - d * 4;
  })
  .attr('width', w / dataset.length - barPadding)
  .attr('height', (d) => {
    return d * 4;
  })
  .attr('fill', (d) => {
    return 'rgb(0, 0, ' + d * 10 + ')';
  });
