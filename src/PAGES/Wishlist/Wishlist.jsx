import React, { Component } from 'react';
import Axios from 'axios'
import { urlApi } from '../../HELPERS/database';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import swal from 'sweetalert'
import './Wishlist.css'
import {Table} from 'react-bootstrap'

class Wishlist extends Component {

    state = {
        data: [],
        showDetails: false,
        detailIdx: null,
        buttonDeleteClicked: false
    }

    componentDidMount () {
        this.getDataWishlist()
    }

    getDataWishlist = () => {
        Axios.get(urlApi + 'wishlist/getWishlistByIdUser/' + this.props.user.id)
        .then(res => {
            this.setState({data : res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    deleteWishList = (id) => {
        this.setState({buttonDeleteClicked: true})
        Axios.delete(urlApi + 'wishlist/deleteWishlistById/' + id)
        .then(res => {
            this.getDataWishlist()
            swal({icon: "success", text: "Product deleted from wishlist."})
            this.setState({buttonDeleteClicked: false})
        }) 
        .catch(err => console.log(err))
    }

    renderWishlist = () => {
        let jsx = this.state.data.map((val, idx) => {
            return (
                <tr key={val.id} className="text-center">
                    <td>{idx+1}</td>
                    <td><Link to={"product-detail/" + val.idPaket} className="link-product-wishlist">{val.namaPaket}</Link></td>
                    <td>
                        <Link to={"product-detail/" + val.idPaket}><img src={`${urlApi}${val.imagePath}`} className="img-wishlist" alt='Cannot Get Transfer Proof'></img></Link>
                    </td>
                    <td>{val.harga}</td>
                    <td>{val.discount}</td>
                    {
                        this.state.buttonDeleteClicked
                        ?
                        <td><button type="button" className="btn btn-danger">Delete</button></td>
                        :
                        <td><button type="button" className="btn btn-danger" onClick={() => this.deleteWishList(val.id)}>Delete</button></td>
                    }
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
                <div className="bg-tagline-wishlist d-flex align-items-center">
                    <div className="container-fluid container-md">
                        <div className="d-flex justify-content-center">
                            <div className="bg-wishlist-tag">
                                <p className="font-weight-bold h3 text-center p-2">WISHLIST</p>
                            </div>
                        </div>
                        <div className="d-md-flex flex-row justify-content-center">
                            <div className="mt-2">
                                <div className="tagline-wishlist h4">“The best meal at my restaurant is the whole right side of the menu.”
                                <br/>
                                <p className="blockquote-footer text-center quotes-wishlist"><cite title="Source Title">Junior Seau</cite></p></div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.data.length === 0
                    ?
                    <h1 className="text-center my-5">YOUR WISHLIST IS EMPTY</h1>
                    :
                    <div className="container mt-5">
                            <div className="card mb-5">
                                <div className="card-body">
                                    <Table striped bordered hover responsive>
                                        <thead className="text-center font-weight-bold bg-success text-white">
                                            <tr>
                                                <th>No. </th>
                                                <th>ITEM NAME</th>
                                                <th>IMAGE</th>
                                                <th>PRICE</th>
                                                <th>DISCOUNT</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {this.renderWishlist()}
                                        </tbody>
                                    </Table>
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
        user: state.user
    }
}


export default connect(mapStateToProps)(Wishlist);