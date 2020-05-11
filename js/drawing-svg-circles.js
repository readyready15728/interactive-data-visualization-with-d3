let w = 500;
let h = 50;

let dataset = [5, 10, 15, 20, 25];

let svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h)

let circles = svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle');

circles.attr('cx', (d, i) => {
  return i * 50 + 25;
})
  .attr('cy', h / 2)
  .attr('r', (d) => {
    return d;
  })
  .attr('fill', 'yellow')
  .attr('stroke', 'orange')
  .attr('stroke-width', (d) => {
    return d / 6;
  });
