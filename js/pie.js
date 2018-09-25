

// Get a subset of the data based on the group
function getFilteredData(text,iDate) {
    console.log("Aqui fueGorrupleto:"+iDate)
      d3.selectAll("chart").remove();

d3.json("importaciones.json").then(dat => {  
      var width = 400; 
      var height = 300; 
      var svg = d3.select("#chart-area").append("chart").append("svg").attr("width", width).attr("height", height);   
      // svg.append("chart")    
      var radius = Math.min(width, height) / 2 + 70;

      var dataset =dat.filter(function(d){  return d.DATE == iDate;});

      g = svg.append("g").attr("transform", "translate(" + (width+100) + "," + (height-50) +")");
     
      

      var color = d3.scaleOrdinal(d3.schemeDark2);
        // .range(["#DC3912", "#3366CC", "#109618", "#FF9900", "#990099"]);
     
      
      var pie = d3.pie()
        .value(function(d) { return d.IMPORTE; })
        .sort(null);
     
      
      var pieGroup = g.selectAll(".pie")
        .data(pie(dataset))
        .enter()
        .append("g")
        .attr("class", "pie");
     
      arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);
     
      pieGroup.append("path")
        .attr("d", arc)
        .attr("fill", function(d) { return color(d.index) })
        .attr("opacity", 0.75)
        .attr("stroke", "white");
   

      var text = d3.arc()
        .outerRadius(radius - 30)
        .innerRadius(radius - 30);
     
      pieGroup.append("text")
      .attr('class', 'labelPie')
        .attr("fill", "#000000 !important")
        .attr("transform", function(d) { return "translate(" + text.centroid(d) + ")"; })
        .attr("dy", "5px")
        .attr("font", "10px")
        .style("color", "#000000")
        .attr("text-anchor", "middle")
        .text(function(d) { return d.data.PRODUCTO; });

})
}