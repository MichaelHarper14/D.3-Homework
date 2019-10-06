// 127.0.0.1:8000 
// localhost:8000
// python -m http.server

// margins
var margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var chartGroup = svg.append("g")
  .attr("transform", "translate("+margin.left+","+ margin.top+")");


//Read the data
var healthinfoData = d3.csv("assets/data/healthinfo.csv").then(function(data) {
    console.log(data);
    
    data.forEach(function(data) {
        data.income = +data.income;
    })
    

 var xLinearScale1 = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.healthcare)])
    .range([0,height]);

var yLinearScale1 = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.income)])
    .range([height, 0]);


var xAxis = d3.axisBottom(xLinearScale1);
var yAxis = d3.axisLeft(yLinearScale1);
chartGroup.append("g").attr("transform", "translate(0," +height+")").call(xAxis);
chartGroup.append("g").call(yAxis);


var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d =>  xLinearScale1(d.healthcare))
    .attr("cy", d =>  yLinearScale1(d.income))
    .attr("r", 5)
    .attr("fill", "blue")
    .attr("class", "circle");

// var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function (d) {
//       return (`${d.state}<br>: ${d.income}`);
//     });
    });

