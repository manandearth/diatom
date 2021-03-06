import React from 'react';
import * as d3 from "d3";


class Rectangles extends React.Component {
    
    constructor (props){
        super(props);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeGenera = this.handleChangeGenera.bind(this);
        this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
    }
  
    drawCategoryRectangle(props, i) {

        return (
                  
            <svg viewBox="100 -350 200 1000" key={'rect' + this.props.data[i].name}  >
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
       
        return (<svg viewBox="100 -350 200 1000" x={ -120 } y={ -150 }  id={ "svg-" + props.name } key={'genera-rect-' + props.name}  >
                  <rect
                     id={ props.name }
                     className="genera"
                      x={ 60 }
                      y={ 400 }
            width={ this.props.selectedCategory === "Symmetric Biraphid" ? 20 : 60 }
            height={ this.props.selectedCategory === "Symmetric Biraphid" ? 20 : 60 }
            transform={ this.props.selectedCategory === "Symmetric Biraphid" ?
                          "rotate(" + i * -360 / len +  ",100,100)" :
                          "rotate(" + i * -360 / len +  ",100,100)"}
                     onClick={ this.handleChangeGenera }
                     fill={ props.name === this.props.selectedGenera ? "#668613" : "#9CB071" }
                    />
            <g transform={ this.props.selectedCategory === "Symmetric Biraphid" ?
                      "rotate("  + i * -360 / len + ",0,0),translate(0,300)" :
                      "rotate("  + i * -360 / len + ",0,-280),translate(0,50)" }>
                  <text
                    className={ props.name === this.props.selectedGenera ? "heavy" : "small" }
                    x={ 50 }
            y={ this.props.selectedCategory === "Symmetric Biraphid" ? 110 : 360 }
            transform={ this.props.selectedCategory === "Symmetric Biraphid" ?
                        "rotate("  + i * 360 / len + ",-30,0)" :
                        "rotate("  + i * 360 / len + ",0,0)" }>{props.name}</text></g>
                </svg>);
    }


    drawSpeciesRectangle(species, i , len) {
        var transform  = "rotate(" +   (i) * 6   + ",100,100), translate(410,0)";
         
             return(<svg viewBox="100 -350 200 1000" id={ "species" + species.name }  key={'species-rect-' + species.name}  >
                      <rect
                       id={ species.name }
                       className="species"
                       x={ 100 }
                       y={ 100 }
                       width={ 40 }
                       height={ 40 }
                       transform={ transform }
                       onClick={this.handleChangeSpecies}
                       fill={species.name === this.props.selectedSpecies ? "#228911" : "#799C88"}/>
                      <g>
                        <text
                          className={ species.name === this.props.selectedSpecies ? "heavy" : "small" }
                          x={ 150 }
                          y={ 120 } 
                        transform={ transform }>
                          { species.name }
                        </text></g>
                 </svg>);
        
    }
    
    handleChangeCategory(e){
        this.props.onChangeCategory(e.target.id);
    }

    handleChangeGenera(e){
        this.props.onChangeGenera(e.target.id);
    }

    handleChangeSpecies(e){
        this.props.onChangeSpecies(e.target.id);
    }
    
    render(){
        const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const selectedCategory = this.props.data.filter((c) => c.name === this.props.selectedCategory);
        const generaOfSelected = selectedCategory ? selectedCategory.map((c, i) => c.generas) : null;
        const selectedGenera = this.props.selectedCategory !== "" ? selectedCategory[0].generas.filter((g) => g.name === this.props.selectedGenera) : null;
        const speciesOfSelected = selectedGenera ? selectedGenera.map((g, i) => g.species) : null;
       
        
        
        return(<div>
                <svg width={w} height={h}>
                  {this.props.data.map((category, i) =>this.drawCategoryRectangle(category, i))}
                  <g key={'g-' + selectedCategory } 
                    transform="translate(120,150)">
               {selectedCategory ? selectedCategory.map((category) => category.generas.map((genera, i) => this.drawGeneraRectangle(genera, i, generaOfSelected[0].length))) : null}
            </g>
                  <g>
                    {/* nested conditionals to assure there is a `selected genera` and also a `species` keyword */}
                    {selectedGenera ? selectedGenera.map((genera) =>
                        genera.species ? genera.species.map((species, i) => this.drawSpeciesRectangle(species, i, speciesOfSelected[0].length)) : null ) : null}
                  </g>
                </svg>
              </div>
        );}    
}

class BarChart extends React.Component {

    componentDidMount() {
        this.drawChart();
    }
    
    drawChart(props) {
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
            .attr("fill", this.props.color);

        svg.selectAll("text")
            .data(this.props.data.map((category) => category.name))
            .enter()
            .append("text")
            .text((d) => d)
            .attr("x", 100)
            .attr("y", 310)
            .attr("transform", (d, i) => "rotate(" + i * 360 / 9 + ",360,360)");
    }

    render(){
        return (<div id={"#" + this.props.id}></div>);
    }
}

export { BarChart, Rectangles };

