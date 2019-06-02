import React from 'react'; 
import ReactDOM from 'react-dom';
import './index.css';
import Controller from './controller.js'
import * as d3 from 'd3';
import BarChart from './bar.js'



class App extends React.Component {
  
  state = {
    data: [12, 5, 6, 6, 9, 10],
    width: 700,
    height: 500,
    // id: root
  }

  render() {
    return (
        <div className="App">
          <Navbar />
           <h1>Diatom</h1>
          <h2>A morphology by calcium and silica</h2>
          <BarChart
          data={this.state.data}
          width={this.state.width}
          height={this.state.height} />
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
