import React, {Component} from 'react'
import {Carousel} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import RTC1 from '../../../IMG/Landingpage/RTC/RTC1.jpeg'
import RTC2 from '../../../IMG/Landingpage/RTC/RTC2.jpeg'
import RTC3 from '../../../IMG/Landingpage/RTC/RTC3.jpeg'
import './ReadyToCook.css'

class ReadyToCook extends Component {
    render() {
        return (
            <div className="container mb-5">
                <div className="col-md justify-text-center mb-4">
                    <h1 className="h1 text-center text-danger font-weight-bold">READY TO COOK</h1>
                    <p className="lead text-center">We also offer a ready to cook package. The ingredients on this package are semi-cooked. All you need is following the steps and prepare it properly.
                    </p>
                </div>
                <Carousel>
                    <Carousel.Item>
                        <Link to='/product-detail/6'>
                        <img
                            className="d-block w-100 border border-light img-rtc"
                            src={RTC1}
                            alt="First slide"/>
                        </Link>
                        <Carousel.Caption>
                            <h3 className="h3-responsive font-weight-bold">VEGETABLES AND FRUITS ARE FRESH</h3>
                            <p>Cucumbers, radishes, Nuts, Berries and Seeds</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Link to='/product-detail/6'>
                        <img
                            className="d-block w-100 border border-light img-rtc"
                            src={RTC2}
                            alt="Third slide"/>
                        </Link>
                        <Carousel.Caption>
                            <h3 className="h3-responsive font-weight-bold">PASTA PACKAGE</h3>
                            <p>Several kind of pasta, such as Macaroni, Fusilli, and Farfalle.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Link to='/product-detail/6'>
                        <img
                           className="d-block w-100 border border-light img-rtc"
                            src={RTC3}
                            alt="Third slide"/>
                        </Link>
                        <Carousel.Caption>
                            <h3 className="h3-responsive font-weight-bold">MEAT AND STEAK</h3>
                            <p>Roasted Chicken, Salmon Fillet, Tenderloin Steak along with its spices and sauce.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default ReadyToCook;