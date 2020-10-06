import React, {Component} from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'
import {urlApi} from '../../HELPERS/database'
import {hitungCart} from '../../REDUX/Action'
import swal from 'sweetalert'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {Modal, Button, Spinner} from 'react-bootstrap'
import './ModalCheckout.css'

class ModalCheckout extends Component {
    state = {
        modalShow: false,
        namaPenerima: '',
        alamatPenerima: '',
        kodePosPenerima: '',
        messageData: null,
        resetDanSubmitHistory: false,
        historySubmitted: false,
        batasAkhirBayar: ''
    }

    submitHistory = () => {
        if (this.state.namaPenerima === '' || this.state.alamatPenerima === '' || this.state.kodePosPenerima === '') {
            this.setState({messageData: 'Please complete all data required!'})
        } else {
            this.setState({resetDanSubmitHistory: true})
            var TanggalTransaksi = moment(new Date()).format("YYYY-MM-DD HH:mm:ss").toString()
            var BatasAkhirBayar = moment(new Date()).add(1, 'hours').format("YYYY-MM-DD HH:mm:ss").toString()
            var postingHistory = {
                TanggalTransaksi: TanggalTransaksi,
                UserId: this.props.user.id,
                TotalBelanja: this.props.totalBelanjaan,
                NamaPenerima: this.state.namaPenerima,
                AlamatPenerima: this.state.alamatPenerima,
                KodePosPenerima: this.state.kodePosPenerima,
                Cancel: 0,
                Status: 'Has not Been Paid',
                BatasAkhirBayar: BatasAkhirBayar
            }
            Axios.post(urlApi + 'history/addToHistory', postingHistory)
            .then((res) => {
                this.props.hitungCart(this.props.user.id)
                    return this.setState({modalShow: true, namaPenerima: '', alamatPenerima: '', kodePosPenerima: '',
                    messageData: null, resetDanSubmitHistory: false, historySubmitted:true, batasAkhirBayar: BatasAkhirBayar})
            })
            .catch((err) => {
                swal ('Eror', 'Server Error', 'error')
                console.log(err.message)
            })
        }  
    }

    MyVerticallyCenteredModal = (props) => {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton className="bg-warning" >
              <Modal.Title>
                    <h5 className="font-weight-bold">PLEASE INPUT YOUR DATA</h5>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    this.state.historySubmitted
                    ?
                    <>
                    <h4>Thank you for your order!</h4>
                    <h4>Please submit your payment before {this.state.batasAkhirBayar}.</h4>
                    </>
                    :
                    <>
                        <div className="row mb-2">
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="formGroupExampleInput">Recipient Name:</label>
                                        <input type="text" className="form-control" onChange={(e) => this.setState({namaPenerima: e.target.value})}/>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="formGroupExampleInput">Delivery Address:</label>
                                        <input type="text" className="form-control" onChange={(e) => this.setState({alamatPenerima: e.target.value})}/>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="formGroupExampleInput">Postal Code:</label>
                                        <input type="number" onInput={(e) => e.target.value = e.target.value.slice(0, 5)} className="form-control" onChange={(e) => this.setState({kodePosPenerima: e.target.value})}/>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-12">
                                {
                                    this.state.messageData === null
                                    ?
                                    <p>&nbsp;</p>
                                    :
                                    <p className="text-danger">{this.state.messageData}</p>
                                }   
                            </div>
                        </div>
                    </>
                }
            </Modal.Body>
            <Modal.Footer>
                {
                    this.state.historySubmitted
                    ?
                    <>
                        <Link to="/Subscribe"><Button variant="info">CONTINUE SHOPPING</Button></Link>
                        <Link to="/History"><Button variant="success">GO TO HISTORY</Button></Link>
                    </>
                    :
                    <>
                    {
                        this.state.resetDanSubmitHistory
                        ?
                        <Spinner animation="border" variant="secondary"/>
                        :
                        <>
                            <Button variant="success" onClick={this.submitHistory}>SUBMIT</Button>
                            <Button variant="secondary" onClick={props.onHide}>CANCEL</Button>
                        </>
                    }
                    </>
                }
            </Modal.Footer>
          </Modal>
        );
    }

    render() {
        return (
            <>
                {
                    this.props.jumlahCart === 0
                    ?
                    null
                    :
                    <Button variant="warning" onClick={() => this.setState({modalShow: true})} className="font-weight-bold">
                    CHECKOUT
                    </Button>
                }                
                {this.MyVerticallyCenteredModal(
                    {
                        show: this.state.modalShow,
                        onHide: () => this.setState(
                                    {
                                        modalShow: false, namaPenerima: '', alamatPenerima: '',
                                        kodePosPenerima: '', messageData: null, historySubmitted: false
                                    })
                    }
                    )
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        jumlahCart: state.cart.jumlahCart
    }
}

export default connect(mapStateToProps, {hitungCart})(ModalCheckout)