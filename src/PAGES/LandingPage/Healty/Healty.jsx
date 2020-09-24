import React from 'react'
import {Card, Button} from "react-bootstrap"
import {Link} from 'react-router-dom'
import './Healty.css'
import Vegan from '../../../IMG/Landingpage/Healthy/vegansalad.jpeg'
import Lesscolesterol from '../../../IMG/Landingpage/Healthy/lesscolesterol.jpeg'
import Lowcarb from '../../../IMG/Landingpage/Healthy/lowcarb.jpeg'

const Healty = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row text-center justify-content-center">
                    <div className="col-10">
                        <div>
                            <h1 className="h1 text-center text-danger font-weight-bold">OUR HEALTY FOOD</h1>
                            <p className="lead text-center">We provide delicious, tasty and healthy food.
                                Please chose your meal today pursuant to your diet preference.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid text-center">
                <div className="row mb-5 mr-md-2 ml-md-2 align-item-strech card-box-health">
                    <div className="col-9 col-md-4 d-flex card-mobile-health">
                        <Card>
                            <div className="zoom-image-health">
                                <Link to='/product-detail/8'><Card.Img variant="top" src={Lesscolesterol}/></Link>
                            </div>
                            <Card.Body>
                                <Card.Title>Less Cholesterol</Card.Title>
                                <Card.Text>
                                    We offer a diet rich in vegetables, poultry, fish, and nuts to low your
                                    cholesterol.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Link to='/product-detail/8'><Button variant="danger">ORDER NOW</Button></Link>
                            </Card.Footer>
                        </Card>
                    </div>
                    <div className="col-9 col-md-4 d-flex align-item-strech card-mobile-health">
                        <Card>
                            <div className="zoom-image-health">
                                <Link to='/product-detail/13'><Card.Img variant="top" src={Vegan}/></Link>
                            </div>
                            <Card.Body>
                                <Card.Title>High Protein Vegan Meal</Card.Title>
                                <Card.Text>
                                    For you whose avoid eating animal-based foods, you may order our vegan menu.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Link to='/product-detail/13'><Button variant="danger">ORDER NOW</Button></Link>
                            </Card.Footer>
                        </Card>
                    </div>
                    <div className="col-9 col-md-4 d-flex align-item-strech card-mobile-health">
                        <Card>
                            <div className="zoom-image-health">
                                <Link to='/product-detail/2'><Card.Img variant="top" src={Lowcarb}/></Link>
                            </div>
                            <Card.Body>
                                <Card.Title>Low-Carb</Card.Title>
                                <Card.Text>
                                    We prepare for you a well-balanced breakfast which contain carbs, protein, and
                                    fiber.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Link to='/product-detail/2'><Button variant="danger">ORDER NOW</Button></Link>
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Healty;