var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 720 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// var parseDate = d3.time.format("%d-%b-%Y").parse,
 var parseDate = d3.time.format("%Y").parse,
    bisectDate = d3.bisector(function(d) { return d.DATE; }).left,
    formatValue = d3.format(",.2f"),
    formatCurrency = function(d) { return "" + formatValue(d); };

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.DATE); })
    .y(function(d) { return y(d.value); });
                         // .interpolate("basis");

var lineChart = d3.select("svg").append("g")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/imports_proccessed1.csv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.DATE = parseDate(d.DATE);
    d.value = +d.value;
  });

  data.sort(function(a, b) {
    return a.DATE - b.DATE;
  });

 console.log("inicio: "+data[0].DATE+"  último: "+data[0].value);
  x.domain([data[0].DATE, data[data.length - 1].DATE]);
  y.domain(d3.extent(data, function(d) { return d.value; }));

  lineChart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  lineChart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Kilos ");

  lineChart.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

  var focus = lineChart.append("g")
      .attr("class", "focus")
      .style("display", "none");

  focus.append("circle")
      .attr("r", 4.5);

  focus.append("text")
      .attr("x", 9)
      .attr("dy", ".35em");

  lineChart.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);

  function mousemove() {
    var x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.DATE > d1.DATE - x0 ? d1 : d0;

    focus.attr("transform", "translate(" + x(d.DATE) + "," + y(d.value) + ")");
    focus.select("text").text(d.value+"Kgs");
  }
});
