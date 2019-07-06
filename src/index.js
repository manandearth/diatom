import React from 'react'; 
import ReactDOM from 'react-dom';
import './index.css';
import { Rectangles } from './bar';
import Taxa from './taxa';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: Taxa,
            width: 700,
            height: 500,
            selectedCategory: "",
            selectedGenera: "",
            selectedSpecies: ""
            // id: root
        };
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeGenera = this.handleChangeGenera.bind(this);
        this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
}

    handleChangeCategory(newCategory){
        this.setState({selectedCategory: newCategory});
    }
    handleChangeGenera(newGenera){
        this.setState({selectedGenera: newGenera});
    }
    handleChangeSpecies(newSpecies){
        this.setState({selectedSpecies: newSpecies});
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
            onChangeGenera={this.handleChangeGenera}
            selectedSpecies={this.state.selectedSpecies}
            onChangeSpecies={this.handleChangeSpecies}/>
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
    );
    }
}





ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
