import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {urlApi} from '../../HELPERS/database'
import './Subscribe.css'
import {Card, Button, Spinner} from 'react-bootstrap'
import Snack from '../../IMG/Subscribe/Button/snack.png'
import Mealbox from '../../IMG/Subscribe/Button/mealbox.png'
import Best from '../../IMG/Subscribe/Button/best.png'
import Dessert from '../../IMG/Subscribe/Button/dessert.png'
import RTC from '../../IMG/Subscribe/Button/rtc.png'
import Cheap from '../../IMG/Subscribe/Button/20k.png'


class Subscribe extends Component {
    state = {
        dataLangganan: [],
        page: 0,
        pageContent: 12,
        kategoriKlick: '',
        getDataLangganan: false,
        getDataLanggananByKategori: false,
        getDataLanggananUnder20: false,
        getDataLanggananTerbaik: false
    }

    componentDidMount () {
        this.getDataLangganan()
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

    getDataLanggananByKategori = (kategori) => {
        this.setState({page: 0, pageContent: 12})
        Axios.get(urlApi + 'langganan/getKategoriLanggananPerkategori/' + kategori)
        .then(res => {
            this.setState({dataLangganan: res.data, getDataLanggananByKategori: true})
        })
        .catch(err => {
            console.log(err)
        })
    }

    getDataLanggananUnder20 = () => {
        this.setState({page: 0, pageContent: 12})
        Axios.get(urlApi + 'langganan/getKategoriLanggananUnder20')
        .then(res => {
            this.setState({dataLangganan: res.data, getDataLanggananUnder20: true})
        })
        .catch(err => {
            console.log(err)
        })
    }

    getDataLanggananTerbaik = () => {
        this.setState({page: 0, pageContent: 12})
        Axios.get(urlApi + 'langganan/daftarProdukTerbaik')
        .then(res => {
            this.setState({dataLangganan: res.data, getDataLanggananTerbaik: true})
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderKategoriLangganan = () => {
        if (this.state.getDataLangganan === false ) {
            return <Spinner animation="border" variant="secondary"/>
        } else {
            let showData = this.state.dataLangganan.slice(this.state.page * this.state.pageContent, this.state.page * this.state.pageContent + this.state.pageContent)
        var jsx = showData.map(val => {
            return (
                <div className="col-6 col-md-3 my-1 my-md-3 card-mobile-subscribe align-item-strech" key={val.id}>
                    <Card>
                        <Link to={"product-detail/" + val.id}>
                            <div className="zoom-image-subscribe">
                                <Card.Img variant="top" src={`${urlApi}${val.imagePath}`} alt='Img produk masih kosong' className="img-product"/>
                            </div>
                        </Link>
                            {
                                val.discount > 0
                                ?
                                <div className="discount-product">{val.discount}%</div>
                                :
                                null
                            }
                            <h6 className="font-weight-bold text-white bg-success pl-2">{val.namaPaket}</h6>
                            {
                                val.discount > 0
                                ?
                                <>
                                    <h6 className="pl-2 font-price-discount">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val.harga)}</h6>
                                    <h6 className="font-price-discounted pr-2">Now {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val.harga - (val.harga * (val.discount/100)))}</h6>
                                </>
                                :
                                <>
                                    <h6 className="pl-2 font-price">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val.harga)}</h6>
                                    <h6 className="font-price">&nbsp;</h6>
                                </>
                            }
                    </Card>
                </div>
            )
        })
        return jsx
        }
    }

    render() {
        return (
        <section>
            <div className="bg-tagline-subscribe d-flex align-items-center">
                <div className="container-fluid container-md mt-3">
                    <div className="d-flex justify-content-center mt-5">
                        <div className="p-2 bg-subscribe-tag">
                            <p className="font-weight-bold h4 text-center">SUBSCRIPTION</p>
                        </div>
                    </div>
                    <div className="d-md-flex flex-row justify-content-center">
                        <div className="mt-3">
                            <p className="tagline-sentence font-weight-bold text-center">
                            Chew & Cheer will feature an outstanding New Traditional-Javaneshe menu with a touch of Western influence in an upscale and cozy atmosphere.
                            The menu is inspired from different cuisine's specialties and will appeal to a wide and varied clientele.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-4">
                <div className="row">
                    <div className="col-6 mb-2 col-md-2">
                        <Button className="parent-button" block onClick={() => this.getDataLanggananByKategori('mealbox')}><img src={Mealbox} alt='Menu Icon' className="img-button"></img><br/>MEALBOX</Button>
                    </div>
                    <div className="col-6 mb-2 col-md-2">
                        <Button className="parent-button btn btn-block" block onClick={() => this.getDataLanggananByKategori('snack')}><img src={Snack} alt='Menu Icon' className="img-button"></img><br/>SNACK TIME</Button>
                    </div>
                    <div className="col-6 mb-2 col-md-2">
                        <Button className="parent-button btn btn-block" block onClick={() => this.getDataLanggananByKategori('sweets')}><img src={Dessert} alt='Menu Icon' className="img-button"></img><br/>SWEETS</Button>
                    </div>
                    <div className="col-6 mb-2 col-md-2">
                        <Button className="parent-button btn btn-block" block onClick={this.getDataLanggananTerbaik}><img src={Best} alt='Menu Icon' className="img-button"></img><br/>BEST SELLER</Button>
                    </div>
                    <div className="col-6 mb-2 col-md-2">
                        <Button className="parent-button btn btn-block" block onClick={this.getDataLanggananUnder20}><img src={Cheap} alt='Menu Icon' className="img-button"></img><br/>UNDER 3&euro;</Button>
                    </div>
                    <div className="col-6 mb-2 col-md-2">
                        <Button className="parent-button btn btn-block" block onClick={() => this.getDataLanggananByKategori('healthy')}><img src={RTC} alt='Menu Icon' className="img-button"></img><br/>Other</Button>
                    </div>                    
                </div>
                <div className="row my-4">
                    <div className="col-12">
                        <Button className="font-weight-bold btn btn-secondary btn-block" onClick={this.getDataLangganan}>VIEW ALL MENU</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-3">                
                        <p className="text-center h5">“By choosing healthy over skinny, you are choosing self-love over self-judgement.”</p>
                        <h5 className="blockquote-footer text-center"><cite title="Source Title">Steve Maraboli</cite></h5>
                    </div>
                </div>
                <div className="row px-2 px-md-0">
                    {this.renderKategoriLangganan()}
                </div>
                <div className="row">
                    <div className="col-12 text-center mt-4 mb-5">
                        {
                            this.state.page === 0
                            ?
                            <Button variant="outline-secondary" disabled>Previous Page</Button>
                            :
                            <Button variant="success" onClick={() => this.setState({page: this.state.page - 1})}>Previous Page</Button>
                        }
                        {
                            this.state.dataLangganan.length - ((this.state.page + 1) * this.state.pageContent) <= 0
                            ?
                            <Button variant="outline-secondary" className='ml-2' disabled>Next Page</Button>
                            :
                            <Button className='ml-2' variant="success" onClick={() => this.setState({page: this.state.page + 1})}>Next Page</Button>
                        }
                    </div>
                </div>
            </div>
        </section>
        );
    }
}

export default Subscribe;