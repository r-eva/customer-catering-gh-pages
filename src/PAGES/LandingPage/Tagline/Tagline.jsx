import React from 'react';
import './Tagline.css';
import {Button} from 'react-bootstrap'

const Tagline = () => {
    return (
        <section className="bg-tagline d-flex align-items-end pb-5">
            <div className="container">
                <div className="d-inline-flex">
                    <div className="p-sm-2 bg-success">
                        <h3 className="font-weight-bold">Experience Delicious!</h3>
                    </div>
                </div>
                <div className="d-md-flex flex-row">
                    <div className="p-2">
                        <p className="tagline font-weight-bold">
                            We respect and appreciate the eating experience. Our mission isn't just provide
                            food; it's to give you a full service, worry free dining experience.
                        </p>
                    </div>
                    <div className="text-center pb-5 pb-md-2">
                        <Button variant="danger">START SUBSCRIPTION</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tagline;