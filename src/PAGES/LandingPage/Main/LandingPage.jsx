import React, {Component} from 'react';
import Tagline from '../Tagline/Tagline'
import Rule from '../Rule/Rule'
import Healty from '../Healty/Healty'
import MainMenu from '../MealboxandSweet/Mainmenu'
import ReadyToCook from '../ReadyToCook/ReadyToCook'


class LandingPage extends Component {
    render() {
        return (
            <div>
              <Tagline/>
              <Rule/>
              <Healty/>
              <MainMenu/>
              <ReadyToCook/>
            </div>
        );
    }
}

export default LandingPage;