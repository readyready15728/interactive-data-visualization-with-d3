let w = 800;
let h = 600;
let padding = 40;

let dataset = [
  [5, 20],
  [480, 90],
  [250, 50],
  [100, 33],
  [330, 95],
  [410, 12],
  [475, 44],
  [25, 67],
  [85, 21],
  [220, 88],
  [600, 150]
];

let xScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, (d) => { return d[0]; })])
  .range([padding, w - padding * 2]);

let yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, (d) => { return d[1]; })])
  .range([h - padding, padding]);

let aScale = d3.scaleSqrt()
  .domain([0, d3.max(dataset, (d) => { return d[1]; })])
  .range([0, 10]);

let xAxis = d3.axisBottom()
  .scale(xScale)
  .ticks(5);

let yAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(5);

let svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', (d) => { return xScale(d[0]); })
  .attr('cy', (d) => { return yScale(d[1]); })
  .attr('r', (d) => { return aScale(d[1]); });

svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text((d) => { return d[0] + ', ' + d[1]; })
  .attr('x', (d) => { return xScale(d[0]); })
  .attr('y', (d) => { return yScale(d[1]); })
  .attr('font-family', 'sans-serif')
  .attr('font-size', '11px')
  .attr('fill', 'red');

svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(0, ' + (h - padding) + ')')
  .call(xAxis);

svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(' + padding + ', 0)')
  .call(yAxis);
