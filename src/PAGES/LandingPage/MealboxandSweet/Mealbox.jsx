import React, { Component } from 'react'
import Axios from 'axios'
import {urlApi} from '../../../HELPERS/database'
import { Card, Spinner } from 'react-bootstrap'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import {Link} from 'react-router-dom'
import './Mainmenu.css'

class MealboxAndSweet extends Component {

    state = {
        dataLangganan: [],
        dataMealBox: [],
        randomMealBox: [],
        getDataLangganan: false,
        getDataMealbox: false

    }

    componentDidMount () {
        this.getDataLangganan()
        this.getDataMealbox()
    }

    getDataLangganan = () => {
        Axios.get(urlApi + 'langganan/getKategoriLangganan')
        .then(res => {
            this.setState({dataLangganan: res.data, getDataLangganan: true})
        })
        .catch(err => {
            console.log(err)
        })
    }

    getDataMealbox = () => {
        Axios.get(urlApi + 'langganan/getKategoriLanggananPerkategori/mealbox')
        .then(res => {
            var n = 5
            var randomItems = res.data.sort(() => .5 - Math.random()).slice(0, n);
            this.setState({dataMealBox: res.data, randomMealBox: randomItems, getDataMealbox: true})
        })
        .catch(err => {
            console.log(err)
        })
    }

    buttonRight = () => {
        document.getElementById('container').scrollLeft += 485
    }

    buttonLeft = () => {
        document.getElementById('container').scrollLeft -= 485  
    }

    renderBox = () => {
        var jsx = this.state.randomMealBox.map(val => {
            return (
                <div className="col-9 col-md-6 scrolled-card-mainmenu p-2" key={val.id}>
                    <Card>
                        <Link to={"product-detail/" + val.id} className="zoom-image-mainmenu">
                            <Card.Img variant="top" src={`${urlApi}${val.imagePath}`} className="card-image-mainmenu"/>
                        </Link>
                        {
                            val.discount > 0
                            ?
                            <div className="discount-mainmenu">{val.discount}%</div>
                            :
                            null
                        }
                        <div className="row">
                            <div className="col-7">
                                <div className="row">
                                    <div className="col-12">
                                        <Card.Text className="ml-2 nama-paket-mainmenu">{val.namaPaket}</Card.Text>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                    {
                                        val.discount > 0
                                        ?
                                        <Card.Text className="text-danger text-left ml-2 font-price-mainmenu">Now</Card.Text>
                                        :
                                        null
                                    }
                                    </div>
                                </div>                                
                            </div>
                            <div className="col-5">
                                <div className="row">
                                    <div className="col-12">
                                    {
                                        val.discount > 0
                                        ?
                                        <> 
                                            <Card.Text className="discounted-price-mainmenu text-right mr-2">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val.harga)}</Card.Text>
                                        </>
                                        :
                                        <Card.Text className="text-right mr-2 font-price-mainmenu">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val.harga)}</Card.Text>
                                    }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                    {
                                        val.discount > 0
                                        ?
                                        <>
                                            <Card.Text className="discount-price-mainmenu text-right mr-2">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val.harga - (val.harga * (val.discount/100)))}</Card.Text>
                                        </>
                                        :
                                        <Card.Text>&nbsp;</Card.Text>
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )
        })
        return jsx
    }

    renderMenuMealBox = () => {
        if (this.state.getDataLangganan === false) {
            return <Spinner animation="border" variant="secondary"/>
        } else {
            var jsx = this.state.dataMealBox.map(val => {
                return (
                    <div key={val.id}>
                        <Card.Text className="text-left">{val.namaPaket}</Card.Text>
                    </div>
                )
            })
            return jsx
        }
    }

    render() {
        return (
            <div className="row d-flex flex-column-reverse flex-sm-row justify-content-sm-center mb-3">
                <div className="col-12 d-block d-sm-none mt-1 mb-4">
                    <input type="button" defaultValue="VIEW ALL SCHEDULE" className="btn btn-success btn-block" />
                </div>
                <div className="col-12 col-md-9">
                    {
                        this.state.randomMealBox.length > 0
                        ?
                        <div className="row card-box-mainmenu" id="container">                      
                            {this.renderBox()}
                            <button className="button-scroll mb-5 d-none d-sm-block" onClick={this.buttonLeft}><IoIosArrowBack/></button>
                            <button className="button-scroll2 mb-5 d-none d-sm-block" onClick={this.buttonRight}><IoIosArrowForward/></button>
                        </div>
                    :
                    <center>
                        <Spinner animation="border" variant="secondary"/>
                        </center>
                    }
                </div>
                <div className="col-12 col-md-3">
                    <div className="row">
                        <div className="col-12">
                            <h4 className="text-center text-md-left text-danger font-weight-bold">MEALBOX MENU</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 d-none d-sm-block">
                            <ul className="list-unstyled" >
                                {this.renderMenuMealBox()}
                            </ul>
                        </div>
                    </div>
                    <div className="row d-none d-sm-block p-2 justify-content-end">
                        <Link to='/Subscribe'><input type="button" defaultValue="VIEW ALL SCHEDULE" className="btn btn-success"/></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default MealboxAndSweet;