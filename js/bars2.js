
d3.csv('data/imports_proccessed1.csv')
  .then(function(data) {

    const svg = d3.select('svg');

    const svgContainer = d3.select('#container');
    
    const margin = 110;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;
 
    const chart = svg.append('g')
      .attr('transform', `translate(${margin+30}, ${margin+50})`);

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(data.map((s) => s.DATE))
      .padding(0.4)
    
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, function(d) { return d.value; })]);


    const makeYLines = () => d3.axisLeft()
      .scale(yScale)

    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    chart.append('g')
      .call(d3.axisLeft(yScale));

    chart.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )

    const barGroups = chart.selectAll()
      .data(data)
      .enter()
      .append('g')

    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g.DATE))
      .attr('y', (g) => yScale(g.value/10))
      .attr('height', (g) => height - yScale(g.value/10))
      .attr('width', xScale.bandwidth())
      .on('mouseenter', function (actual, i) {
        d3.selectAll('.value')
          .attr('opacity', 0)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (a) => xScale(a.DATE) - 5)
          .attr('width', xScale.bandwidth() + 10)
          
        const y = yScale(actual.value/10)

        line = chart.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y)

        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) =>  xScale.bandwidth() + 300)
          .attr('y',200)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {            
            const divergence = (a.value - actual.value).toFixed(1)            
            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence} kg`
          return idx == i ? actual.value+' kg' : '';
          })

      })
      .on('mouseleave', function () {
        d3.selectAll('.value')
          .attr('opacity', 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.DATE))
          .attr('width', xScale.bandwidth())

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
      })

    .on("click", function(d){
       d3.select(this).call(getFilteredData, d.DATE); 
    });

    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Importaciones en Kilos')

    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2 + margin)
      .attr('y', height + margin * 1.8)
      .attr('text-anchor', 'middle')
      .text('Años reportados')

    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 + margin)
      .attr('y', 90)
      .attr('text-anchor', 'middle')
      .text('Importaciones en Colombia desde 1991 hasta 2017')

    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 + margin)
      .attr('y', 117)
      .attr('text-anchor', 'middle')
      .text('(Productos Principales)')
   
    svg.append('text')
      .attr('class', 'source')
      .attr('x', width +90)
      .attr('y', height + margin * 1.8)
      .attr('text-anchor', 'start')
      .text('Visual Analitycs, 2018')
  
  })