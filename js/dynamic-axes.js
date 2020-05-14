let w = 800;
let h = 600;
let padding = 40;

let dataset = [];
let numDataPoints = 50;
let maxRange = Math.random() * 1000;

for (let i = 0; i < numDataPoints; i++) {
  let x = Math.floor(Math.random() * maxRange);
  let y = Math.floor(Math.random() * maxRange);

  dataset.push([x, y]);
}

let xScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, (d) => { return d[0]; })])
  .range([padding, w - padding * 2]);

let yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, (d) => { return d[1]; })])
  .range([h - padding, padding]);

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

svg.append('clipPath')
  .attr('id', 'chart-area')
  .append('rect')
  .attr('x', padding)
  .attr('y', padding)
  .attr('width', w - padding * 3)
  .attr('height', h - padding * 2);

svg.append('g')
  .attr('id', 'circles')
  .attr('clip-path', 'url(#chart-area)')
  .selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', (d) => { return xScale(d[0]); })
  .attr('cy', (d) => { return yScale(d[1]); })
  .attr('r', 2);

svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0, ' + (h - padding) + ')')
  .call(xAxis);

svg.append('g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + padding + ', 0)')
  .call(yAxis);

d3.select('p')
  .on('click', () => {
    let numValues = dataset.length;
    let maxRange = Math.random() * 1000;
    dataset = [];

    for (let i = 0; i < numValues; i++) {
      let x = Math.floor(Math.random() * maxRange);
      let y = Math.floor(Math.random() * maxRange);

      dataset.push([x, y]);
    }

    xScale.domain([0, d3.max(dataset, (d) => { return d[0]; })]);
    yScale.domain([0, d3.max(dataset, (d) => { return d[1]; })]);

    svg.selectAll('circle')
      .data(dataset)
      .transition()
      .duration(1000)
      .on('start', function () {
        d3.select(this)
          .attr('fill', 'magenta')
          .attr('r', 7);
      })
      .attr('cx', (d) => { return xScale(d[0]); })
      .attr('cy', (d) => { return yScale(d[1]); })
      .on('end', function () {
        d3.select(this)
          .transition()
          .duration(1000)
          .attr('fill', 'black')
          .attr('r', 2);
      });

    svg.select('.x.axis')
      .transition()
      .duration(1000)
      .call(xAxis);

    svg.select('.y.axis')
      .transition()
      .duration(1000)
      .call(yAxis);
  });
