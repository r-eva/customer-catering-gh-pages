import React from 'react';
import './Tagline.css';
import {Button} from 'react-bootstrap'

const Tagline = () => {
    return (
        <section className="bg-tagline d-flex align-items-end p-5">
            <div className="container">
                <div className="d-inline-flex">
                    <div className="p-2 bg-success">
                        <p className="font-weight-bold h3">Experience Delicious!</p>
                    </div>
                </div>
                <div className="d-md-flex flex-row">
                    <div className="p-2">
                        <p className="tagline h4">
                            We respect and appreciate the eating experience. Our mission isn't just provide
                            food; it's to give you a full service, worry free dining experience.
                        </p>
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