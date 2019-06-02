import * as d3 from "d3";

const scale = d3
  .scaleLinear()
  .domain([0, 10])
  .range([0, 200]);
const axis = d3.axisBottom(scale);

d3.select("svg")
  .append("g")
  .attr("transform", "translate(10, 30)")
    .call(axis);
 
