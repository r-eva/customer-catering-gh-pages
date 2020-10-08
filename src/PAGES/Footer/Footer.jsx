import React from 'react'
import './Footer.css'
import { IconContext } from "react-icons";
import {AiFillFacebook, AiFillTwitterCircle, AiFillInstagram, AiFillMail} from "react-icons/ai"

const Footer = () => {
    return (
        <div>
            <section className="bg-light">
                <div className="container-fluid pt-2 pb-2">
                    <div className="row justify-content-center">
                        <div className="col-12 align-self-center text-center bg-light">
                            <h6 className="font-weight-bolder mt-2">CHEW & CHEER CATERING </h6>
                            <div className="mb-3">
                                <a href="https://www.facebook.com/indonesia.tourism/?ref=br_rs"><IconContext.Provider value={{ color: 'black', size: '30px' }}><AiFillFacebook/></IconContext.Provider></a>&nbsp;
                                <a href="https://twitter.com/twitterid?lang=en"><IconContext.Provider value={{ color: 'black', size: '30px' }}><AiFillTwitterCircle/></IconContext.Provider></a>&nbsp;
                                <a href="https://www.instagram.com/indtravel/?hl=en"><IconContext.Provider value={{ color: 'black', size: '30px' }}><AiFillInstagram/></IconContext.Provider></a>&nbsp;
                                <a href="mailto:website@gmail.com?Subject=Hi%20Eva"><IconContext.Provider value={{ color: 'black', size: '30px' }}><AiFillMail/></IconContext.Provider></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Footer;