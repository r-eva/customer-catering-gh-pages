import React, { Component } from 'react';
import './Promo.css'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {urlApi} from '../../HELPERS/database'
import {Card} from 'react-bootstrap'

class Promo extends Component {

    state = {
        dataLanggananPromo: [],
        page: 0,
        pageContent: 12
    }

    componentDidMount () {
        this.getDataLangganan()
    }

    getDataLangganan = () => {
        Axios.get(urlApi + 'langganan/getKategoriLanggananPromo')
        .then(res => {
            this.setState({dataLanggananPromo: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderDataLanggananPromo = () => {
        let showData = this.state.dataLanggananPromo.slice(this.state.page * this.state.pageContent, this.state.page * this.state.pageContent + this.state.pageContent)
        var jsx = showData.map(val => {
            return (
                <div className="col-6 col-md-3 my-2 my-md-3 card-mobile-promo align-item-strech" key={val.id}>
                    <Card>
                        <Link to={"product-detail/" + val.id}>
                            <div className="zoom-image-promo">
                                <Card.Img variant="top" src={`${urlApi}${val.imagePath}`} alt='Img produk masih kosong' className="img-product-promo"/>
                            </div>
                        </Link>
                            {
                                val.discount > 0
                                ?
                                <div className="discount-product-promo">{val.discount}%</div>
                                :
                                null
                            }
                            <h6 className="font-weight-bold text-white bg-success pl-2">{val.namaPaket}</h6>
                            {
                                val.discount > 0
                                ?
                                <>
                                    <h6 className="pl-2 font-price-discount-promo">Rp. {new Intl.NumberFormat('id-ID').format(val.harga)}</h6>
                                    <h6 className="font-price-discounted-promo pr-2">Now Rp. {new Intl.NumberFormat('id-ID').format(val.harga - (val.harga * (val.discount/100)))}</h6>
                                </>
                                :
                                <>
                                    <h6 className="pl-2 font-price-promo">Rp. {new Intl.NumberFormat('id-ID').format(val.harga)}</h6>
                                    <h6 className="font-price-promo">&nbsp;</h6>
                                </>
                            }
                    </Card>
                </div>
            )
        })
        return jsx
    }

    render() {
        return (
            <section>
                <div className="bg-tagline-promo d-flex align-items-center">
                    <div className="container-fluid container-md">
                        <div className="d-flex justify-content-center">
                            <div className="bg-promo-tag">
                                <p className="font-weight-bold h3 text-center p-2">PROMO</p>
                            </div>
                        </div>
                        <div className="d-md-flex flex-row justify-content-center">
                            <div className="mt-2">
                                <div className="tagline-promo h4">“A healthy diet doesn't have to be expensive.There are plenty of affordable, nutrient-dense foods you can purchase without breaking the bank. The menu listed below are both cheap and healthy, making them a great addition to your diet.”
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row mt-4 mb-3 my-mb-0">
                            <div className="col-12 py-3 py-md-4">
                                <h1 className="display-4 text-center text-danger font-weight-bold">ANNORA PROMO PACKAGE</h1>
                            </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row mx-1 mx-md-4">
                        {this.renderDataLanggananPromo()}
                    </div>
                </div>
                <div className="container">
                    <div className="row mt-4 mb-5">
                        <div className="col-12 text-center">
                            {
                                this.state.page === 0
                                ?
                                <input type="button" className='disabled btn btn-blue-grey rounded' value="Previous Page"/>
                                :
                                <input type="button" className='btn btn-danger rounded' value="Previous Page" onClick={() => this.setState({page: this.state.page - 1})}/>
                            }
                            {
                                this.state.dataLanggananPromo.length - ((this.state.page + 1) * this.state.pageContent) <= 0
                                ?
                                <input type="button" className='ml-2 disabled btn btn-blue-grey rounded' value="Next Page"/>
                                :
                                <input type="button" className='btn btn-danger ml-2 rounded' value="Next Page" onClick={() => this.setState({page: this.state.page + 1})}/>
                            }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Promo;