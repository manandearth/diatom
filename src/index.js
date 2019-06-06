import React from 'react'; 
import ReactDOM from 'react-dom';
import './index.css';
import Controller from './controller.js'
import * as d3 from 'd3';
import { BarChart, Rectangles } from './bar.js'
import VizExample4 from './example4.js'
import Taxa from './taxa.js'

class VisExampleApp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data: []}
        const numRows =  30
        const numCols = 50
        const freqRng = d3.randomNormal(15, 15)
        const accRng = d3.randomNormal(0.45, 0.1)
        const rankRng = () => Math.ceil(Math.random() * 300)
        for (let x = 0; x < numCols; x++) {
            for (let y = 0; y < numRows; y++) {
                const freq = freqRng();
                this.state.data.push({ locationX: x, locationY: y, frequency: freq < 0 ? 0 : freq, accuracy: accRng(), rank: rankRng() });
      }
    }
  }

    // render the line chart and radial heatmap
    render() {
        return (
            <div className='example'>
              <h4>Example 4 - D3 Scales</h4>
              <VizExample4 width={800} height={600} data={this.state.data} />
            </div>
        )
    }
}



class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: Taxa,
            width: 700,
            height: 500,
            selectedCategory: "Centric",
            selectedGenera: "Aulacoseira"
            // id: root
        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleChangeGenera = this.handleChangeGenera.bind(this)
}

    handleChangeCategory(newCategory){
        this.setState({selectedCategory: newCategory})
    }

    handleChangeGenera(newGenera){
        this.setState({selectedGenera: newGenera})
    }
    
    render() {
        return (
            <div className="App">
              <Navbar />
              <h1>Diatom</h1>
              <h2>A morphology designed in calcium and silica</h2>
              {/* <VisExampleApp /> */}
              <Rectangles
                 data={this.state.data}
                color={this.state.color}
                selectedCategory={this.state.selectedCategory}
                onChangeCategory={this.handleChangeCategory}
                selectedGenera={this.state.selectedGenera}
                onChangeGenera={this.handleChangeGenera}/>
      </div>
    );
  }
}



class Navbar extends React.Component {
    render(){
    return(
    <div className ="topnav">
  <a className="active" href="#home">Home</a>
  <a href="https://github.com/manandearth/diatom">Github project</a>
  <a href="#about">About</a>
    </div>
    )
    }
}


var lineStyle = {
    stroke: 'blue',
    fill: 'yellowgreen',
    strokeWidth: '1'
};




ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
