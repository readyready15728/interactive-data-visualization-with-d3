let w = 800;
let h = 600;

let dataset = [
  { key: 0, value: 5 },
  { key: 1, value: 10 },
  { key: 2, value: 13 },
  { key: 3, value: 19 },
  { key: 4, value: 21 },
  { key: 5, value: 25 },
  { key: 6, value: 22 },
  { key: 7, value: 18 },
  { key: 8, value: 15 },
  { key: 9, value: 13 },
  { key: 10, value: 11 },
  { key: 11, value: 12 },
  { key: 12, value: 15 },
  { key: 13, value: 20 },
  { key: 14, value: 18 },
  { key: 15, value: 17 },
  { key: 16, value: 16 },
  { key: 17, value: 18 },
  { key: 18, value: 23 },
  { key: 19, value: 25 }
];

let xScale = d3.scaleBand()
  .domain(d3.range(dataset.length))
  .rangeRound([0, w])
  .paddingInner(0.05);

let yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, (d) => { return d.value; })])
  .range([0, h]);

let key = (d) => {
  return d.key;
};

let svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

svg.selectAll('rect')
  .data(dataset, key)
  .enter()
  .append('rect')
  .attr('x', (d, i) => {
    return xScale(i);
  })
  .attr('y', (d) => {
    return h - yScale(d.value);
  })
  .attr('width', xScale.bandwidth())
  .attr('height', (d) => { return yScale(d.value); })
  .attr('fill', (d) => { return 'rgb(0, 0, ' + (d.value * 10) + ')'; });

svg.selectAll('text')
  .data(dataset, key)
  .enter()
  .append('text')
  .text((d) => { return d.value; })
  .attr('text-anchor', 'middle')
  .attr('x', (d, i) => { return xScale(i) + xScale.bandwidth() / 2; })
  .attr('y', (d) => { return h - yScale(d.value) + 14; })
  .attr('font-family', 'sans-serif')
  .attr('font-size', '11px')
  .attr('fill', 'white');

d3.selectAll('p')
  .on('click', function () {
    let paragraphID = d3.select(this).attr('id');

    if (paragraphID == 'add') {
      let minValue = 2;
      let maxValue = 25 - minValue;
      let newNumber = Math.floor(Math.random() * maxValue) + minValue;
      let lastKeyValue = dataset[dataset.length - 1].key;

      dataset.push({
        key: lastKeyValue + 1,
        value: newNumber
      });
    } else {
      dataset.shift();
    }

    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset, (d) => { return d.value; })]);

    let bars = svg.selectAll('rect')
      .data(dataset, key);

    bars.enter()
      .append('rect')
      .attr('x', w)
      .attr('y', (d) => { return h - yScale(d.value); })
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => { return yScale(d.value); })
      .attr('fill', (d) => { return 'rgb(0, 0, ' + (d.value * 10) + ')'; })
      .merge(bars)
      .transition()
      .duration(500)
      .attr('x', (d, i) => { return xScale(i); })
      .attr('y', (d) => { return h - yScale(d.value); })
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => { return yScale(d.value); });

    bars.exit()
      .transition()
      .duration(500)
      .attr('x', -xScale.bandwidth())
      .remove();

    let labels = svg.selectAll('text')
      .data(dataset, key);

    labels.enter()
      .append('text')
      .text((d) => { return d.value; })
      .attr('text-anchor', 'middle')
      .attr('x', w)
      .attr('y', (d) => { return h - yScale(d.value) + 14; })
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', 'white')
      .merge(labels)
      .transition()
      .duration(500)
      .attr('x', (d, i) => { return xScale(i) + xScale.bandwidth() / 2; });
    
    labels.exit()
      .transition()
      .duration(500)
      .attr('x', -xScale.bandwidth())
      .remove();
  });
