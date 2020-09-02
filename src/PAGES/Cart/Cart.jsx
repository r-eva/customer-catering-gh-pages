import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Axios from 'axios'
import {urlApi} from '../../HELPERS/database'
import swal from 'sweetalert'
import moment from 'moment'
import {hitungCart} from '../../REDUX/Action'
import {Table} from 'react-bootstrap'
import './Cart.css' 
import ModalCheckout from './ModalCheckout'

class Cart extends Component {

    state = {
        cart: []
    }

    componentDidMount() {
        this.getDataApi(this.props.user.id)
    }

    componentDidUpdate(){
        if (this.state.cart.length !== this.props.jumlahCart) {
            this.getDataApi(this.props.user.id)
        }
    }

    getDataApi = (userId) => {
        Axios.get(urlApi + `cart/getCartUser/` + userId)
        .then((res)=>{
            this.setState({cart: res.data})
            console.log(this.state.cart)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnEditQty = (action, index) => {
        let arrCart = this.state.cart
        if (action === 'min') {
            if(arrCart[index].JumlahBox > 1) {
                arrCart[index].JumlahBox -= 1
                var objCartPut = {
                    idUser: this.props.user.id,
                    idPaket: arrCart[index].idPaket,
                    TanggalMulai: arrCart[index].TanggalMulai,
                    TanggalBerakhir: arrCart[index].TanggalBerakhir,
                    JumlahBox: arrCart[index].JumlahBox,
                    Durasi: arrCart[index].Durasi
                }
                Axios.put(urlApi + 'cart/editCart/' + arrCart[index].id, objCartPut)
                .then((res) => {
                    this.getDataApi(this.props.user.id)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        } else if (action === 'add') {
            arrCart[index].JumlahBox += 1
            objCartPut = {
                idUser: this.props.user.id,
                idPaket: arrCart[index].idPaket,
                TanggalMulai: arrCart[index].TanggalMulai,
                TanggalBerakhir: arrCart[index].TanggalBerakhir,
                JumlahBox: arrCart[index].JumlahBox,
                Durasi: arrCart[index].Durasi
            }
            Axios.put(urlApi + 'cart/editCart/' + arrCart[index].id, objCartPut)
            .then((res) => {
                this.getDataApi(this.props.user.id)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    changeDurasi = (index) => {
        let arrCart = this.state.cart
        arrCart[index].Durasi = Number(this.refs[`inputChangeDurasi${index}`].value)
        var ubahFormat = arrCart[index].TanggalMulai.replace('/','-')

        var cnt = 1
        var tmpDate = moment(ubahFormat)
            while (cnt < arrCart[index].Durasi) {
                tmpDate = tmpDate.add('days', 1);
                if (tmpDate.weekday() !== moment().day("Sunday").weekday() && tmpDate.weekday() !== moment().day("Saturday").weekday()) {
                    cnt = cnt + 1;
                }
            }

        var objCartPut = {
            idUser: this.props.user.id,
            idPaket: arrCart[index].idPaket,
            TanggalMulai: arrCart[index].TanggalMulai,
            TanggalBerakhir: moment(tmpDate._d).format("YYYY/MM/DD"),
            JumlahBox: arrCart[index].JumlahBox,
            Durasi: arrCart[index].Durasi
        }
        Axios.put(urlApi + 'cart/editCart/' + arrCart[index].id, objCartPut)
            .then((res) => {
                this.getDataApi(this.props.user.id)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    deleteCart = (index) => {
        Axios.delete(urlApi + 'cart/deleteCartById/' + index) 
        .then((res)=> {
            this.props.hitungCart(this.props.user.id)
            this.getDataApi(this.props.user.id)
            swal ('Delete item', 'Item deleted from cart', 'success')
        })
        
        .catch((err) => {
            console.log(err)
        })
    }

    totalBelanjaan = () => {
        var hargaTotal = 0
        this.state.cart.map(val => {
            return hargaTotal += val.Durasi * val.JumlahBox * (val.harga - (val.harga * (val.discount/100)))
        })
        return hargaTotal
    }

    renderCart = () => {
        var jsx = this.state.cart.map((val, idx) => {
            return (
                <tr className="text-center" key={val.id}>
                    <td>{val.namaPaket}</td>
                    <td>{val.harga}</td>
                    {
                        val.discount === 0
                        ?
                        <td>Normal Price</td>
                        :
                        <td>{val.discount}%</td>
                    }              
                    <td>
                        <div className="d-flex flex-row justify-content-center">
                            <input type="button" className="btn btn-secondary" value='+' onClick={()=> this.onBtnEditQty('add', idx)}/>
                            <input type="button" className="btn btn-secondary mx-1" value={val.JumlahBox}/>
                            <input type="button" className="btn btn-secondary" value='-' onClick={()=> this.onBtnEditQty('min', idx)}/>
                        </div>
                    </td>
                    <td>{val.TanggalMulai}</td>
                    <td>{val.TanggalBerakhir}</td>
                    <td>
                        <select className="browser-default custom-select" ref={`inputChangeDurasi${idx}`} onChange={() => this.changeDurasi(idx)}>
                            <option>{val.Durasi} days</option>
                            {val.Durasi === 2 ? null : <option value="2">2 days</option>}
                            {val.Durasi === 5 ? null : <option value="5">5 days</option>}
                            {val.Durasi === 10 ? null : <option value="10">10 days</option>}
                            {val.Durasi === 20 ? null : <option value="20">20 days</option>}
                        </select>
                    </td>
                    <td>{val.Durasi * val.JumlahBox * (val.harga - (val.harga * (val.discount/100))) }</td>
                    <td><input type="button" className="btn btn-danger btn-block" value="DELETE" onClick={()=> this.deleteCart(val.id)}/></td>
                </tr>
            )
        })
        return jsx
    }

    render() {
        if (this.props.user.username === '')
        return <Redirect to="/" exact/>
        return (
            <section>
                <div className="bg-tagline-cart d-flex align-items-center">
                    <div className="container-fluid container-md">
                        <div className="d-flex justify-content-center">
                            <div className="bg-cart-tag">
                                <p className="font-weight-bold h3 text-center p-2">CART</p>
                            </div>
                        </div>
                        <div className="d-md-flex flex-row justify-content-center">
                            <div className="mt-2">
                                <div className="tagline-cart h4"> “A fit, healthy body; that is the best fashion statement”
                                <br/>
                                <p className="blockquote-footer text-center quotes-cart"><cite title="Source Title">Jess C Scott</cite></p></div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.cart.length === 0
                    ?
                    <h1 className="h1 text-center my-5">YOUR CART IS EMPTY</h1>
                    :
                    <div className="container-fluid">
                        <div className="card my-5">
                            <div className="card-body">
                                <Table striped bordered hover responsive>
                                    <thead className="text-center font-weight-bold bg-success text-white">
                                        <tr>
                                            <th>PACKAGE</th>
                                            <th>PRICE</th>
                                            <th>DISCOUNT</th>
                                            <th>BOX</th>
                                            <th>START</th>
                                            <th>END</th>
                                            <th>DURATION</th>
                                            <th>TOTAL</th>
                                            <th>DELETE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderCart()}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className="row m-5">
                            <div className="col-12 text-center">
                                {
                                    this.state.cart.length === 0
                                    ?
                                    null
                                    :
                                    <>
                                        <h3 className="font-weight-bold h4">TOTAL INVOICE:</h3>
                                        <h3 className="font-weight-bold text-danger h3 mb-3">Rp. {this.totalBelanjaan()}</h3>
                                        <ModalCheckout totalBelanjaan={this.totalBelanjaan()}/>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                }
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        jumlahCart: state.cart.jumlahCart
    }
}

export default connect(mapStateToProps, {hitungCart})(Cart)