import React from 'react';
import './Tagline.css';
import {Button} from 'react-bootstrap'

const Tagline = () => {
    return (
        <section className="bg-tagline d-flex align-items-end pb-5">
            <div className="container">
                <div className="d-inline-flex">
                    <div className="p-sm-2 bg-success">
                        <h3 className="font-weight-bold h3-responsive">Experience Delicious!</h3>
                    </div>
                </div>
                <div className="d-md-flex flex-row">
                    <div className="p-2">
                        <h4 className="tagline h4-responsive">
                            We respect and appreciate the eating experience. Our mission isn't just provide
                            food; it's to give you a full service, worry free dining experience.
                        </h4>
                    </div>
                    <div className="text-center">
                        <Button variant="danger">START SUBSCRIBTION</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tagline;