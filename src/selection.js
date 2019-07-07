import React from 'react';

class Selection extends React.Component {
    constructor(props) {
        super(props);
        
    }
	render() {
		return (<div className='selected-class'>
                  <h3>{this.props.selectedCategory !== '' ?
                      'Category: ' + this.props.selectedCategory : null}</h3>
                  <h3>{this.props.selectedGenera !== '' ?
                      'Genere: ' + this.props.selectedGenera : null}</h3>
                  <p>{this.props.selectedSpecies !== '' ?
                      'Species: ' + this.props.selectedSpecies : null}</p>

			</div>
	    );
    }
}


export { Selection };

    
