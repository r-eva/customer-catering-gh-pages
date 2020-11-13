import React, { Component } from 'react';
import './Productdetail.css'
import Axios from 'axios'
import { urlApi } from '../../HELPERS/database';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {hitungCart} from '../../REDUX/Action'
import moment from 'moment'
import swal from 'sweetalert'
import {Image, ButtonGroup, Spinner} from 'react-bootstrap'
import {IoMdHeart, IoMdHeartEmpty} from 'react-icons/io'
import {TiPlus, TiMinus} from 'react-icons/ti'

class Productdetail extends Component {

    state = {
        dataPaketLangganan: '',
        dataJadwalPaketLangganan: '',
        jadwalPaketSampaiAkhirBulan: [],
        wishlist : false,
        jumlahBox: 1,
        tanggalHariIni: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        inputTanggalMulai: '',
        inputDurasi: 0,
        addToChartButton: true
    }

    componentDidMount = () => {
        this.getDataApi()
        this.getWishlist()
    }

    getDataApi = () => {
        Axios.get(urlApi + 'langganan/getKategoriLanggananById/' + this.props.match.params.id)
        .then((res) => {
           this.setState({dataPaketLangganan: res.data[0]})
        }).catch((err)=>{
            console.log(err)
        })

        Axios.get(urlApi + 'jadwal/getJadwalByIdPaket/' + this.props.match.params.id)
        .then((res) => {
            this.setState({dataJadwalPaketLangganan: res.data})
            var jumlahHariBulanIni = moment().daysInMonth()
            var loopingJadwal = []
                for (var i = 0; i < Math.ceil(jumlahHariBulanIni / this.state.dataJadwalPaketLangganan.length); i++) {
                    for (var j = 0; j < this.state.dataJadwalPaketLangganan.length; j++) {
                        loopingJadwal.push(this.state.dataJadwalPaketLangganan[j])
                    }
                }
            
            var tgl = moment().format("dddd, MMMM Do YYYY")
            var slicer = Number(new Date().getDate()) - 1
            var jadwalSebulanFixed = loopingJadwal.slice(0, jumlahHariBulanIni)
            var sisaJadwalBulanIni = jadwalSebulanFixed.slice(slicer)
            var tempJadwalPaketSampaiAkhirBulan = []
            
            for (var k = 0; k < sisaJadwalBulanIni.length; k ++) {
                if (k > 0) {
                    var arraySelanjutya = {...sisaJadwalBulanIni[k], tanggal: moment().add(k, 'days').format("dddd, MMMM Do YYYY")}
                    tempJadwalPaketSampaiAkhirBulan.push(arraySelanjutya)
                } else {
                    var array1 = {...sisaJadwalBulanIni[0], tanggal: tgl}
                    tempJadwalPaketSampaiAkhirBulan.push(array1)
                }
            }
            this.setState({jadwalPaketSampaiAkhirBulan: tempJadwalPaketSampaiAkhirBulan})
         }).catch((err)=>{
             console.log(err)
         })
    }

    susunJadwalBulanIni = () => {
        var jsx = this.state.jadwalPaketSampaiAkhirBulan.map((val) => {
            return (
                <div key={val.tanggal}>
                    <div className="row">
                        {
                            val.tanggal.includes('Saturday') || val.tanggal.includes('Sunday')
                            ?
                            null
                            :
                            <>
                            <div className="col-5 col-md-3">
                                <p style={{fontWeight: 'bolder'}}>{val.tanggal}</p>
                            </div>
                            <div className="col-7 col-md-9">
                                <p className='mb-0 pb-0'>{val.Menu}</p>
                                <p className="mt-0 pb-0">{val.Deskripsi}</p>
                            </div>
                            </>
                        }
                    </div>
                </div>
            )
        })
        return jsx   
    }

    getWishlist = () => {
        var obj = {
            idUser: this.props.user.id,
            idPaket: this.props.match.params.id
        }
        Axios.post(urlApi + 'wishlist/getWishListByIdUserPaket/', obj)
        .then(res => {
            if(res.data.length > 0){
                this.setState({wishlist: true})
            }
        })
        .catch(err => console.log(err))
    }

    toggleWishlist = () => {
            var obj = {
                idPaket: this.props.match.params.id,
                idUser: this.props.user.id
                
            }
            Axios.post(urlApi + 'wishlist/getWishListByIdUserPaket/', obj)
            .then(res => {
                if(this.state.wishlist){
                    Axios.delete(urlApi + 'wishlist/deleteWishlistById/' + res.data[0].id)
                    .then(res => {
                        this.setState({wishlist: false})
                    })
                    .catch(err => console.log(err))
                }else{
                    Axios.post(urlApi + 'wishlist/addToWishlist/', obj)
                    .then(res => {
                        this.setState({wishlist: true})
                    })
                    .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
        }

    onTambahKeranjangBtnClick = () => {
        if (this.state.inputTanggalMulai === '' || this.refs.inputDurasi.value === "Choose") {
            swal({icon: "warning", text: "Please complete all data required!"})
        } else if (moment(this.state.inputTanggalMulai).weekday() === moment().day("Sunday").weekday() || moment(this.state.inputTanggalMulai).weekday() === moment().day("Saturday").weekday()) {
            swal({icon: "warning", text: "Please input start date other than Saturday and Sunday!"})
        } else if (moment(this.state.inputTanggalMulai).format('L') === moment(new Date()).format('L') && moment(new Date()).format('H') > 8 && moment(new Date()).format('s') > 0) {
            swal({icon: "warning", text: "Order for today shall be no later than 08.00 am."})
        }
        else {
            if (moment(this.state.inputTanggalMulai).format('L') >= moment().format('L')) {
                this.setState({addToChartButton: false})
                var ubahDurasi
                if (this.refs.inputDurasi.value.length === 7) {
                    ubahDurasi = Number(this.refs.inputDurasi.value.slice(0,2))
                } else {
                    ubahDurasi =  Number(this.refs.inputDurasi.value.slice(0,1))
                }

                var cnt = 1
                var tmpDate = moment(this.state.inputTanggalMulai)
                while (cnt < ubahDurasi) {
                    tmpDate = tmpDate.add(1, 'days');
                    if (tmpDate.weekday() !== moment().day("Sunday").weekday() && tmpDate.weekday() !== moment().day("Saturday").weekday()) {
                        cnt = cnt + 1;
                    }
                }
                
                 var objKeranjang = {
                     idUser: this.props.user.id,
                     idPaket: this.state.dataPaketLangganan.id,
                     TanggalMulai: moment(this.state.inputTanggalMulai).format("YYYY-MM-DD").toString(),
                     tanggalBerakhir: moment(tmpDate._d).format("YYYY-MM-DD").toString(),
                     JumlahBox: this.state.jumlahBox,
                     Durasi: ubahDurasi
                 }

                 Axios.post(urlApi + 'cart/addToCart', objKeranjang)
                 .then(res => {
                     this.setState({inputTanggalMulai: '', addToChartButton: true})
                     this.props.hitungCart(this.props.user.id)
                     swal({icon: "success", text: "Your order has been added to cart."})
                 }).catch(err => {
                     console.log(err)
                     swal({icon: "warning", text: "Fail to add product to cart."})
                 })
            } else {
                swal({icon: "warning", text: "You can not input date that has passed!"})
            }    
        }
    }

    getValueDurasi = () => {
        if (this.refs.inputDurasi.value === "Choose") {
           this.setState({inputDurasi: 0})
        } else {
            this.setState({inputDurasi: Number(this.refs.inputDurasi.value.slice(0,2))})
        }
    }

    renderButtonAddToChart = () => {
        if (this.state.addToChartButton) {
            return <input type="button" onClick={this.onTambahKeranjangBtnClick} className='btn btn-success btn-block mb-4 mb-md-0' value="ADD TO CART"/>
        } else {
            return <Spinner animation="border" variant="secondary"/>
        }
    }

    render() {
        return (
            <section>
                <div className="bg-tagline-productdetail d-flex align-items-center">
                    <div className="container-fluid container-md">
                        <div className="d-flex justify-content-center">
                            <div className="bg-productdetail-tag">
                                <p className="font-weight-bold h3 text-center p-2">Product Detail</p>
                            </div>
                        </div>
                        <div className="d-md-flex flex-row justify-content-center">
                            <div className="mt-2">
                                <div className="tagline-productdetail h4">“One cannot think well, love well, sleep well, if one has not dined well.”
                                <br/>
                                <p className="blockquote-footer text-center quotes"><cite title="Source Title">Virginia Woolf, A Room of One's Own</cite></p></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-12 col-md-7 pt-2 pt-md-5 mb-4">
                            {
                                    this.state.dataPaketLangganan.imagePath !== undefined
                                ?
                                <div className="zoom-image">
                                    <Image src={`${urlApi}${this.state.dataPaketLangganan.imagePath}`} thumbnail alt="Img produk masih kosong" className="img-product img-fluid"/>
                                </div>
                                :
                                null
                            }
                        </div>
                        <div className="col-12 col-md-5 pt-2 pt-md-5 mb-4">
                            <h1 className="package-name package-name-mobile">
                            {this.state.dataPaketLangganan.namaPaket}&nbsp;
                            {   
                                this.state.wishlist 
                                ? 
                                    <IoMdHeart className="heart-wishlist" onClick={this.toggleWishlist}/>
                                :
                                <>
                                    {
                                        this.props.user.id === 0
                                        ?
                                        <Link to='/Login' className="heart-wishlist-notlogin"><IoMdHeartEmpty className="heart-wishlist"/></Link>
                                        :
                                        <IoMdHeartEmpty onClick={this.toggleWishlist} className="heart-wishlist"/>
                                    }
                                </>
                            }
                            </h1>
                            {
                                this.state.dataPaketLangganan.discount === 0 || this.state.dataJadwalPaketLangganan === ''
                                ?
                                <div className="normal-price">
                                    <h6 className="normal-price-font">Normal Price</h6>
                                </div>
                                :
                                <>
                                    <div className="discount-price">
                                        <h6 className="normal-price-font">
                                        {this.state.dataPaketLangganan.discount}%
                                        </h6>
                                    </div>
                                    <span className="price-tag-discount">&euro; {this.state.dataPaketLangganan.harga}
                                    </span>
                                </>
                            }
                            <h1 className="final-price">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.state.dataPaketLangganan.harga - (this.state.dataPaketLangganan.harga * (this.state.dataPaketLangganan.discount/100)))}</h1>
                            <div className='row mt-2 mt-md-4'>
                                <div className='col-12'>
                                    <p className="product-description">{this.state.dataPaketLangganan.deskripsi}</p>
                                </div>
                            </div>
                            <h6 className="amount-box">Amount of Box Per day</h6>
                            <div className="row">
                                <div className="col-5">
                                    <div className="border">
                                        <p className='m-2'>{this.state.jumlahBox} Box</p>
                                    </div>
                                </div>
                                <div className="col-7 p-0">
                                    <div className="row">
                                        <div className="col-12">
                                            <ButtonGroup>
                                                {
                                                    this.state.jumlahBox === 1 
                                                    ?
                                                    <button className="btn btn-outline-secondary" disabled><TiMinus/></button>
                                                    :
                                                    <button className="btn btn-outline-danger" onClick={() => this.setState({jumlahBox: this.state.jumlahBox - 1})}><TiMinus/></button>
                                                }
                                                {
                                                    this.state.jumlahBox === 50 
                                                    ?
                                                    <button className="btn btn-outline-secondary" disabled><TiPlus/></button>
                                                    :
                                                    <button className="btn btn-outline-danger" onClick={() => this.setState({jumlahBox: this.state.jumlahBox + 1})}><TiPlus/></button>
                                                } 
                                                
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className='col-5 pr-2 pl-3'>
                                    <div className="amount-box">Starting Date</div>
                                </div>
                                <div className="col-7 p-0">
                                    <div className="amount-box">Duration</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5 pr-2 pl-3">
                                    <input type="date" className="form-control" min={this.state.tanggalHariIni} onChange={(e) => this.setState({inputTanggalMulai: e.target.value})}/>
                                </div>
                                 <div className="col-4 pl-0 pr-4">
                                    <select ref='inputDurasi' className="browser-default custom-select" onClick={this.getValueDurasi}>
                                        <option>Choose</option>
                                        <option value="2 hari">2 day</option>
                                        <option value="5 hari">5 day</option>
                                        <option value="10 hari">10 day</option>
                                        <option value="20 hari">20 day</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 pr-2 pl-3">
                                    <p className="delivery">We do not deliver food on Saturday and Sunday.</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-9 text-right">
                                            {
                                                this.state.inputDurasi === 0
                                                ?
                                                <h1 className="font-counting h6">&nbsp;</h1>                                       
                                                :
                                                <h1 className="font-counting h6">
                                                    {this.state.jumlahBox} box * {this.state.inputDurasi} days * &euro; {this.state.dataPaketLangganan.harga - (this.state.dataPaketLangganan.harga * (this.state.dataPaketLangganan.discount/100))}
                                                </h1>                                             
                                            }
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-4">
                                            <h1 className="text-danger font-weight-bold font-bill h5">Total: </h1>
                                        </div>
                                        <div className="col-5 text-right">
                                            {
                                                this.refs.inputDurasi === 0
                                                ?
                                                <h1 className="text-warning font-weight-bold font-bill h5">&euro; 0</h1>                                       
                                                :
                                                <h1 className="text-warning font-weight-bold font-bill h5">&euro; {this.state.jumlahBox * this.state.inputDurasi * (this.state.dataPaketLangganan.harga - (this.state.dataPaketLangganan.harga * (this.state.dataPaketLangganan.discount/100)))}</h1>                                             
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row align-items-end'>
                                <div className="col-9 text-center">
                                    {
                                        this.props.user.id !== 0
                                        ?
                                        <>
                                            {
                                                this.props.user.status === 'Unverified'
                                                ?
                                                <>
                                                {
                                                    this.props.user.encryptedEmail !== ''
                                                    ?
                                                    <Link to={`/waitingemailverification?email=${this.props.user.encryptedEmail}`} className="add-to-cart"><input  type="button" className='btn btn-success btn-block mb-5 mb-md-0' value="ADD TO CART"/></Link>
                                                    :
                                                    <input  type="button" className='btn btn-success btn-block mb-4 mb-md-0' value="ADD TO CART"/>
                                                }
                                                </>
                                                :
                                                <>
                                                    {this.renderButtonAddToChart()}
                                                </>
                                            }
                                        </>
                                        :
                                        <Link to='/Login' style={{textDecoration: 'none'}}><input  type="button" className='btn btn-success btn-block mb-4 mb-md-0' value="ADD TO CART"/></Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <h6 className="h2 schedule">This Month's Schedule</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-5">
                                {
                                    this.state.dataJadwalPaketLangganan !== '' && this.state.dataPaketLangganan !== ''
                                    ?
                                    <>
                                        {this.susunJadwalBulanIni()}
                                    </>
                                    :
                                    null
                                }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {hitungCart})(Productdetail);