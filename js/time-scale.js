let w = 800;
let h = 600;
let padding = 40;

let parseTime = d3.timeParse('%m/%d/%y');
let formatTime = d3.timeFormat('%b %e');

let rowConverter = (d) => {
  return {
    date: parseTime(d.date),
    amount: parseInt(d.amount)
  };
};

d3.csv('../data/time-scale-data.csv', rowConverter)
  .then((dataset) => {
    let xScale = d3.scaleTime()
      .domain([d3.min(dataset, (d) => { return d.date; }),
               d3.max(dataset, (d) => { return d.date; })])
      .range([padding, w - padding]);
    let yScale = d3.scaleLinear()
      .domain([d3.min(dataset, (d) => { return d.amount; }),
               d3.max(dataset, (d) => { return d.amount; })])
      .range([h - padding, padding]);

    let svg = d3.select('body')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    // Generating date labels first will have them in the back
    svg.selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .text((d) => { return formatTime(d.date); })
      .attr('x', (d) => { return xScale(d.date) + 4; })
      .attr('y', (d) => { return yScale(d.amount) + 4; })
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', '#bbb');

    svg.selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('cx', (d) => { return xScale(d.date); })
      .attr('cy', (d) => { return yScale(d.amount); })
      .attr('r', 2);
  });
