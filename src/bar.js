import React, {Component} from 'react';
import * as d3 from "d3";
import Taxa from './taxa.js'


class Rectangles extends React.Component {
    
    constructor (props){
        super(props)
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleChangeGenera = this.handleChangeGenera.bind(this)
    }
  
    drawCategoryRectangle(props, i) {

        const data = this.props.data
        return (
                  
            <svg viewBox="100 -350 200 1000">
                   <rect
                     id={this.props.data[i].name}
                     className="category"
                     x={50}
                     y={225}
                     width={100}
                     height={100}
                     transform={"rotate(" + i * -360 / this.props.data.length + ",100 ,100)"}
                     onClick={this.handleChangeCategory}
                     fill={this.props.data[i].name === this.props.selectedCategory ? "olive" : "yellowgreen"}
                   />
              
              <g transform={"rotate(" + i * -360 / this.props.data.length + ",0 ,-100), translate(0,120)"}>
                <text
                  className={this.props.data[i].name === this.props.selectedCategory ? "heavy" : "small"}
                  x={50}
                  y={200}
                  transform={"rotate(" + i * 360 / this.props.data.length + ",0 ,0)"}
              >{props.name}</text></g>            </svg>);
    }

    drawGeneraRectangle(props, i, len) {
        const data = this.props.data
        var sizeLinear = d3.scaleLinear()
            .domain([2, 59])  
            .range([80, 0]);
        var yOffsetLinear = d3.scaleLinear()
            .domain([59, 2])
            .range([200, 10]);
        var xOffsetLinear = d3.scaleLinear()
            .domain([59, 2])
            .range([500, 350]);
        let transformation = "rotate("  + 360 / len * i + ",100,100)"
        let xOffset = xOffsetLinear(len)
        let yOffset = yOffsetLinear(len)
        return (<svg viewBox="100 -350 200 1000" x={ -120 } y={ -150 }  id={ "svg-" + props.name }>
                   ><rect
                     id={ props.name }
                     className="genera"
                      x={ 60 }
                      y={ 400 }
                      width={ this.props.selectedCategory == "Symmetric Biraphid" ? 20 : 60 }
                      height={ this.props.selectedCategory == "Symmetric Biraphid" ? 20 : 60 }
                      transform={ this.props.selectedCategory == "Symmetric Biraphid" ?
                          "rotate(" + i * -360 / len +  ",100,100)" :
                          "rotate(" + i * -360 / len +  ",100,100)"}
                     onClick={ this.handleChangeGenera }
                     fill={ props.name === this.props.selectedGenera ? "#668613" : "#9CB071" }
                    />
                  <g transform={ this.props.selectedCategory == "Symmetric Biraphid" ?
                      "rotate("  + i * -360 / len + ",0,0),translate(0,300)" :
                      "rotate("  + i * -360 / len + ",0,-280),translate(0,50)" }>
                  <text
                    className={ props.name === this.props.selectedGenera ? "heavy" : "small" }
                    x={ 50 }
                    y={ this.props.selectedCategory == "Symmetric Biraphid" ? 110 : 360 }
                    transform={ this.props.selectedCategory == "Symmetric Biraphid" ?
                        "rotate("  + i * 360 / len + ",-30,0)" :
                        "rotate("  + i * 360 / len + ",0,0)" }>{props.name}</text></g>
                </svg>);
    }


    drawSpeciesRectangle(species, i , len) {
         {
             return(<svg viewBox="100 -350 200 1000" id={ "species" + species.name }>
                     <rect
                       id={ species.name }
                       className="genera"
                       x={ 100 }
                       y={ 100 }
                       width={ 40 }
                       height={ 40 }
                       transform={"rotate(" +   (i - 8) * 150 / len   + ",100,100), translate(410,0)" }/>
                      <g>
                        <text
                          x={ 150 }
                          y={ 120 } 
                        transform={"rotate(" +   (i - 8) * 150 / len   + ",100,100), translate(410,0)" }>
                          { species.name }
                        </text></g>
                   </svg>)
        }
    }
    
    handleChangeCategory(e){
        this.props.onChangeCategory(e.target.id);
    }

    handleChangeGenera(e){
        this.props.onChangeGenera(e.target.id);
    }

    
    render(){
         const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var selectedCategory = this.props.data.filter((c) => c.name == this.props.selectedCategory)
        var generaOfSelected = selectedCategory ? selectedCategory.map((c, i) => c.generas) : null
        var selectedGenera = this.props.selectedCategory != "" ? selectedCategory[0].generas.filter((g) => g.name == this.props.selectedGenera) : null
        var speciesOfSelected = selectedGenera ? selectedGenera.map((g, i) => g.species) : null
       
        
        
        return<div>
                <svg width={w} height={h}>
            {this.props.data.map((category, i) =>this.drawCategoryRectangle(category, i))}
            <g transform="translate(120,150)">
               {selectedCategory ? selectedCategory.map((category) => category.generas.map((genera, i) => this.drawGeneraRectangle(genera, i, generaOfSelected[0].length))) : null}
            </g>
                  <g>
                    {/* nested conditionals to assure there is a `selected genera` and also a `species` keyword */}
                    {selectedGenera ? selectedGenera.map((genera) =>
                        genera.species ? genera.species.map((species, i) => this.drawSpeciesRectangle(species, i, speciesOfSelected[0].length)) : null ) : null}
                  </g>
                </svg>
                <h2>{ this.props.selectedGenera != "" ? speciesOfSelected.toString() : null}</h2>
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

