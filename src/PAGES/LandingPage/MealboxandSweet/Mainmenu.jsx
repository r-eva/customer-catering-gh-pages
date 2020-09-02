import React, { Component } from 'react';
import Mealbox from './Mealbox'
import Sweet from './Sweet'

class Container extends Component {
    render() {
        return (
            <div>
                <div className="jumbotron bg-light">
                    <div className="container-fluid">
                        <Mealbox/>
                        <Sweet/>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Container;