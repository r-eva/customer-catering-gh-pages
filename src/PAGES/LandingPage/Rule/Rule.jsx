import React from 'react';
import Leaf from '../../../IMG/Landingpage/Rule/leaf.png'
import Pig from '../../../IMG/Landingpage/Rule/pig.png'
import Calendar from '../../../IMG/Landingpage/Rule/calendar.png'
import Gourmet from '../../../IMG/Landingpage/Rule/gourmet.png'

const Rule = () => {
    return (
        <div className="jumbotron jumbotron-fluid bg-light">
            {/* KONTAINER */}
            <div className="container">
                {/* MEDIA OBJECT */}
                <div className="media justify-content-center">
                    <img
                        className="mr-2"
                        src={Leaf}
                        width={70}
                        alt=""/>
                    <div className="media-body">
                        <p className="mt-0 font-weight-bold">Freshness Guaranteed.</p>
                        Orders are only prepared an hour before delivery – made with only the freshest
                        ingredients. We stress a lot on quality. {/* NESTED MEDIA OBJECT 1 */}
                        <div className="media mt-3">
                            <div className="pr-2">
                                <img
                                    src={Pig}
                                    width={90}
                                    alt=""/>
                            </div>
                            <div className="media-body">
                                <h6 className="mt-0 font-weight-bold">Incredible value.</h6>
                                We have something here that works for any budget. Not all good things come with
                                a hefty price tag.
                            </div>
                        </div>
                        {/* END NESTED MEDIA OBJECT 1 */}
                    </div>
                </div>
                {/* END MEDIA OBJECT */}

                {/* MEDIA OBJECT */}
                <div className="media">
                    <img
                        className="mr-2 mt-3"
                        src={Calendar}
                        width={65}
                        alt=""/>
                    <div className="media-body mt-3">
                        <h6 className="mt-0 font-weight-bold">Consistently good food.</h6>
                        We’ve got one chef-in-charge for each item on our menu. That’s how serious we
                        are about consistency. {/* NESTED MEDIA OBJECT 2 */}
                        <div className="media mt-4">
                            <div className="pr-2">
                                <img
                                    src={Gourmet}
                                    width={75}
                                    alt=""/>
                            </div>
                            <div className="media-body">
                                <h6 className="mt-0 font-weight-bold">Impeccable presentation.</h6>
                                Whether it’s buffet setups or packaged meals – we make sure everything you
                                receive is impeccably presented.
                            </div>
                        </div>
                        {/* END NESTED MEDIA OBJECT 2 */}
                    </div>
                </div>
                {/* END MEDIA OBJECT */}
            </div>
            {/* END KONTAINER */}

        </div>
    );
};

export default Rule;