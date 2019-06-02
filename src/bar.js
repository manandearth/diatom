import React, {Component} from 'react';
import * as d3 from "d3";
import Taxa from './taxa.js'
class BarChart extends React.Component {
  componentDidMount() {
    this.drawChart();
  }
    
  drawChart() {
      const data = this.props.data;

      const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
   
      const svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            // .style("margin-left", 100)
            .attr('id', 'svg-viz');
                  
      svg.selectAll("rect")
          .data(Taxa.categories)
          .enter()
          .append("rect")
          .attr("x", (d, i) => i * 70)
          .attr("y", (d, i) => this.props.height - 300)
          .attr("width", 100)
          .attr("transform", (d, i) => "rotate(" + i * 360 / 9 + ",400,300)")
          .attr("height", 100)
          .attr("fill", "green")

      svg.selectAll("text")
          .data(Taxa.categories)
          .enter()
          .append("text")
          .text((d) => d)
          .attr("x", (d, i) => i * 70)
          .attr("y", (d, i) => this.props.height - 300)
          .attr("transform", (d, i) => "rotate(" + i * 360 / 9 + ",400,300)")
  }
        
  render(){
    return <div id={"#" + this.props.id}></div>
  }
}
    
export default BarChart;

