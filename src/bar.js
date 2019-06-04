import React, {Component} from 'react';
import * as d3 from "d3";
import Taxa from './taxa.js'


class Rectangles extends React.Component {
   
    constructor (props){
        super(props)
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
       
    }
  
    drawRectangle(props, i) {

        const data = this.props.data
        return (<g><rect
                     id={this.props.data[i].name}
                     className="category"
                     x={100}
                     y={310}
                     width={100}
                     height={100}
                     transform={"rotate(" + i * 360 / this.props.data.length + ",360 ,360)"}
                     onClick={this.handleChangeCategory}
                     fill={this.props.data[i].name === this.props.selectedCategory ? "olive" : "yellowgreen"}
                   />
                  <text
                    className={this.props.data[i].name === this.props.selectedCategory ? "heavy" : "small"}
                    x={100}
                    y={310}
                    transform={"rotate(" + i * 360 / this.props.data.length + ",360,360)"}>{props.name}</text></g>);
    }

    drawGeneraRectangle(props, i, len) {
        const data = this.props.data
        var sizeLinear = d3.scaleLinear()
            .domain([2, 59])  
            .range([0.9, 0.7]);
        var offsetLinear = d3.scaleLinear()
            .domain([2, 59])
            .range([20, 10]);
        let transformation = "rotate(" + i * 360 / len + ",360 ,360), translate (" + 3 * len + "," + 10 * len + ")"
        let xOffset = offsetLinear(len)
        let yOffset = offsetLinear(len)
        return (<g><rect
                     id={props.name}
                     className="genera"
                     x={ xOffset }
                     y={ yOffset }
                     width={ xOffset }
                     height={ yOffset }
                     transform={ transformation }
                     onClick={this.handleChangeCategory}
                     fill="yellow"
                   />
                  <text
                    className="small"
                    x={ xOffset }
                    y={ yOffset }
                    transform={ transformation }>{props.name}</text>
                </g>);
    }


    
    handleChangeCategory(e){
        this.props.onChangeCategory(e.target.id);
    }

    
    render(){
        var selected = this.props.data.filter((c) => c.name == this.props.selectedCategory)
        var generaOfSelected = selected ? selected.map((c, i) => c.generas) : null
        const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        
        
        return<div>
          <svg width={w} height={h}>
            {this.props.data.map((category, i) =>this.drawRectangle(category, i))}
            <g transform="translate(120,150)">
               {selected ? selected.map((category) => category.generas.map((genera, i) => this.drawGeneraRectangle(genera, i, generaOfSelected[0].length))) : null}
                </g>
          </svg>
          
         </div>
    }    
}

class BarChart extends React.Component {

    componentDidMount() {
        this.drawChart();
    }
    
    drawChart(props) {
        const data = this.props.data;
        const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
   
        const svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr('id', 'svg-viz');
                  
        svg.selectAll("rect")
            .data(this.props.data)
            .enter()
            .append("rect")
            .attr("x", 100)
            .attr("y", 310)
            .attr("width", 100)
            .attr("transform", (d, i) => "rotate(" + i *  360 / 9  + ",360,360)")
            .attr("height", 100)
            .attr("fill", this.props.color)

        svg.selectAll("text")
            .data(this.props.data.map((category) => category.name))
            .enter()
            .append("text")
            .text((d) => d)
            .attr("x", 100)
            .attr("y", 310)
            .attr("transform", (d, i) => "rotate(" + i * 360 / 9 + ",360,360)")
    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export { BarChart, Rectangles };

