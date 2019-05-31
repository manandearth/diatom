import React from 'react'; 
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

class Stage extends React.Component {
	render() {
		return(
            <div>
              <Navbar />
              <h1>Diatom</h1>
              <h2>A morphology by calcium and silica</h2>
              <SVG />
            </div>
		)
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


class SVG extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            svg : {width : 600, height : 600},
            baseLine : {x1 : 0, y1 : 0, x2 : 600, y2 : 600},
            categories : ["Centric", "Araphid", "Eunotioid", "Symmetric Biraphid", "Monoraphid", "Asymmetric Biraphid", "Epithemioid", "Nitzschioid", "Surirelloid"]
        }
            this.handleLineChange = this.handleLineChange.bind(this)
        
        }
    
    handleLineChange(keyName, newValue) {
        this.setState({ baseLine : {...this.state.baseLine, [keyName] : newValue}
        })
    }
        
    
    render(){
        const categories = this.state.categories;
        const svgContainer = d3.select("body").append("svg")
              .attr("width", 600)
              .attr("height", 600);
        return(
            <div>
              <svg width={this.state.svg.width} height={this.state.svg.height}>
            {categories.map((category) =>
                <g >                 
                <rect style={lineStyle}
                      width={100}
                      height={100}
                />
                  <text y={50} x={5}>{category}</text></g>)}
              
            </svg>

              <LineSlider
                baseLine={this.state.baseLine}
                svg={this.state.svg}
                onLineChange={this.handleLineChange}
                
              />
            </div>
        )
    }
}

class LineSlider extends React.Component{
    constructor(props){
        super(props)
        this.handleLineChange = this.handleLineChange.bind(this)
        
    }

    handleLineChange(event){
        this.props.onLineChange(event.target.name, event.target.value)
    }
    
    render(){
        return(
            <div>
              <div>
                <label>x1</label>
                <input name="x1"
                       value={this.props.baseLine.x1}
                       type="range"
                       min={0}
                       max={this.props.svg.width}
                       onChange={this.handleLineChange}/>
                <input name="x1"
                       value={this.props.baseLine.x1}
                       type="text"
                       min={0}
                       max={this.props.svg.width}
                       onChange={this.handleLineChange}/>
              </div>
              <div>
                <label>y1</label>
                <input name="y1"
                       value={this.props.baseLine.y1}
                       type="range"
                       min={0}
                       max={this.props.svg.height}
                       onChange={this.handleLineChange}/>
                <input name="y1"
                       value={this.props.baseLine.y1}
                       type="text"
                       min={0}
                       max={this.props.svg.height}
                       onChange={this.handleLineChange}/>
              </div>
              <div>
                <label>x2</label>
                <input name="x2"
                       value={this.props.baseLine.x2}
                       type="range"
                       min={0}
                       max={this.props.svg.width}
                       onChange={this.handleLineChange}/>
                <input name="x2"
                       value={this.props.baseLine.x2}
                       type="text"
                       min={0}
                       max={this.props.svg.width}
                       onChange={this.handleLineChange}/>
              </div>
              <div>
                <label>y2</label>
                <input name="y2"
                       value={this.props.baseLine.y2}
                       type="range"
                       min={0}
                       max={this.props.svg.height}
                       onChange={this.handleLineChange}/>
                <input name="y2"
                       value={this.props.baseLine.y2}
                       type="text"
                       min={0}
                       max={this.props.svg.height}
                       onChange={this.handleLineChange}/>
              </div>
            </div>)}
}

var lineStyle = {
    stroke: 'blue',
    fill: 'yellowgreen',
    strokeWidth: '1'
};




ReactDOM.render(<Stage />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
