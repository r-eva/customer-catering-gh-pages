import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Axios from 'axios'
import {urlApi} from '../../HELPERS/database'
import swal from 'sweetalert'
import './History.css'
import {Table, Modal, Button, Spinner, Card} from 'react-bootstrap'

class History extends Component {
    state = {
        history: [],
        historyDetail: [],
        data: "unloaded",
        belanjaDiproses: null,
        keluarBoxPembayaran: null,
        buktiPembayaran: null,
        uploadBuktiBayarSuccess: false,
        modalShow: false,
        historyMode: false,
        cancelButtonClicked: false,
        uploadBuktiBayarClicked: false
    }

    componentDidMount() {
        this.getDataApi(this.props.userId)
    }

    getDataApi = (userId) => {
        Axios.get(urlApi + `history/getHistoryByIdUser/` + userId)
        .then((res)=>{
            this.setState({history: res.data, data:"loaded"})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getDetailHistory = (idHistory) => {
        Axios.get(urlApi + `history/getHistoryDetailById/` + idHistory)
            .then((res)=>{
                this.setState({historyDetail: res.data, modalShow: true, historyMode: true})       
            })
            .catch((err) => {
                console.log(err)
            })
    }

    renderHistoryDetail = () => {
        var jsx = this.state.historyDetail.map((val, idx) => {
            var newPrice = (val.harga - (val.harga * val.discount/100)).toFixed(2)
            return (
                    <tr key = {val.id}>
                        <td>{idx + 1}</td>
                        <td>{val.namaPaket}</td>
                        <td>{newPrice}</td>
                        <td>{val.JumlahBox}</td>
                        <td>{val.TanggalMulai.slice(0, 10)}</td>
                        <td>{val.TanggalBerakhir.slice(0, 10)}</td>
                        <td>{val.Durasi}</td>
                        <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format((newPrice * val.Durasi * val.JumlahBox).toFixed(2))}</td>
                    </tr>
                    )
        })
        return jsx
    }

    onBtnDeleteHistoryClick = (idHistory) => {
        this.setState({cancelButtonClicked: true})
        Axios.put(urlApi + 'history/cancelHistoryById/' + idHistory)
        .then(res => {
            this.getDataApi(this.props.userId)
            this.setState({cancelButtonClicked: false})
        }).catch(err=> {
            swal ('Eror', 'Server Error', 'error')
            console.log(err)
        })
    }

    renderHistory = () => {
        var jsx = this.state.history.map((val) => {
            return (
                <tr className="text-center" key={val.id}>
                    <td>{val.TanggalTransaksi}</td>
                    <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val.TotalBelanja)}</td>
                    <td>{val.Status}</td>
                    <td>{val.BatasAkhirBayar}</td>
                    <td>
                        <Button variant="primary" onClick={() => this.getDetailHistory(val.id)}>
                            DETAIL
                        </Button>
                    </td>
                    {
                        val.Cancel === 0
                        ?
                        <>  
                            {
                                val.Status === 'Waiting for Admin Confirmation' || val.Status === 'PAID OFF' || val.Status === 'REJECT BY ADMIN'
                                ?
                                <>
                                    <td><input type="button" className="btn btn-dark btn-block" value="Cancel" disabled/></td>
                                    <td><input type="button" className="btn btn-dark btn-block" value="Upload Payment Receipt" disabled/></td>
                                </>
                                :
                                <>
                                    {
                                        this.state.cancelButtonClicked
                                        ?
                                        <td><input type="button" className="btn btn-danger btn-block" value="CANCEL"/></td>
                                        :
                                        <td><input type="button" className="btn btn-danger btn-block" value="CANCEL" onClick={()=> this.onBtnDeleteHistoryClick(val.id)}/></td>
                                    }
                                    <td><input type="button" className="btn btn-success btn-block" value="Upload Payment Receipt" onClick={() => this.setState({keluarBoxPembayaran: 1, belanjaDiproses: val})}/></td>
                                </>
                                
                            }
                        </>
                        :
                        <>
                            <td><button type="button" className="btn btn-dark btn-block" disabled>CANCEL</button></td>
                            <td><input type="button" className="btn btn-dark btn-block" value="Upload Payment Receipt" disabled/></td> 
                        </>
                        
                    }
                    
                </tr>
            )
        })
        return jsx
    }

    imagePembayaranChosed = (e) => {
        if(e.target.files[0]) {
            this.setState({ buktiPembayaran: e.target.files })
        } else {
            this.setState({ buktiPembayaran: null })
        }
    }

    uploadBuktiBayar = (id) => {
        this.setState({uploadBuktiBayarClicked: true})
        if (this.state.buktiPembayaran === null) {
            this.setState({uploadBuktiBayarClicked: false})
            swal ('Error', `Please import your payment receipt!`, 'error')
        } else { 
            var formdata = new FormData();

            var options = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            formdata.append('image', this.state.buktiPembayaran[0])

            Axios.put(urlApi + 'history/uploadBuktiPembayaran/' + id, formdata, options)
                .then(res => {
                    this.setState({uploadBuktiBayarSuccess: true})
                    this.submitPembayaranSukses(this.state.belanjaDiproses.id)
                }).catch(err => {
                    console.log(err.response)
                    this.setState({uploadBuktiBayarClicked: false})
                    swal ('Eror', 'Failed to upload your payment receipt, please check format of your file!', 'error')
                })
        }
        
    }

    submitPembayaranSukses = (id) => { 
        this.setState({uploadBuktiBayarClicked: true})
        Axios.put(urlApi + 'history/pembayaranSubmit/' + id)
        .then((res)=>{
            this.getDataApi(this.props.userId)
            this.setState({belanjaDiproses: null,
                keluarBoxPembayaran: null,
                buktiPembayaran: null,
                uploadBuktiBayarSuccess: false,
                uploadBuktiBayarClicked: false
            })
            })
            swal ('Thank you for shopping!', `Upon Admin confirmation, your order will be sent to your place shortly.`, 'success')
        .catch((err) => {
            console.log(err)
        })
    }

    MyVerticallyCenteredModal = (props) => {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton className="bg-primary" >
              <Modal.Title>
                    <h5 className="font-weight-bold">YOUR TRANSACTION DETAIL</h5>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover size="sm" className="text-center">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Package </th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Duration</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderHistoryDetail()}
                        <tr>
                            <td colSpan="6">TOTAL</td>
                            <td colSpan="3">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.state.historyDetail[0].TotalBelanja)}</td>
                        </tr>
                    </tbody>
                </Table>
                <br/>
                <div className="font-weight-bold pl-3">
                    <p>
                    Recipient Name: {this.state.historyDetail[0].NamaPenerima}<br/>
                    Delivery Address: {this.state.historyDetail[0].AlamatPenerima}<br/>
                    Postal Code: {this.state.historyDetail[0].KodePosPenerima}
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => this.setState({paymentMode: false, modalShow: false, historyMode: false, historyDetail: []})}>CLOSE</Button>
            </Modal.Footer>
          </Modal>
        );
    }

    render() {
        if (this.props.username === '')
        return <Redirect to="/" exact/>
        return (
            <section>
                <div className="bg-tagline-history d-flex align-items-center">
                    <div className="container-fluid container-md">
                        <div className="d-flex justify-content-center">
                            <div className="bg-history-tag">
                                <p className="font-weight-bold h3 text-center p-2">HISTORY</p>
                            </div>
                        </div>
                        <div className="d-md-flex flex-row justify-content-center">
                            <div className="mt-2">
                                <div className="tagline-history h4">“Eat food. Not too much. Mostly plants.”
                                <br/>
                                <p className="blockquote-footer text-center quotes-history"><cite title="Source Title">Michael Pollan</cite></p></div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.data === "unloaded"
                    ?
                    <center>
                        <Spinner animation="border" className="my-5" variant="secondary"/>
                    </center> 
                    :
                    <>
                        {
                            this.state.history.length === 0
                            ?
                            <h1 className="text-center mt-5" style={{marginBottom: '500px'}}>YOUR HISTORY IS EMPTY</h1>
                            :
                            <div className="container-fluid">
                                <div className="card mb-5">
                                    <div className="card-body">
                                        <Table striped bordered hover responsive>
                                            <thead className="text-center font-weight-bold bg-success text-white">
                                                <tr>
                                                    <th>TRANSACTION DATE</th>
                                                    <th>TOTAL INVOICE</th>
                                                    <th>STATUS</th>
                                                    <th>PAYMENT DEADLINE</th>
                                                    <th>DETAIL</th>
                                                    <th>CANCEL</th>
                                                    <th>PAY</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.renderHistory()}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                                {
                                    this.state.keluarBoxPembayaran === 1
                                    ?
                                    <div className="row justify-content-center mb-5">
                                        <div className="col-8 mb-3">
                                            <Card>
                                            <div className="card-header text-center font-weight-bold">
                                                <h5 className="h5">Please Upload Your Proof of Payment</h5>
                                            </div>
                                            <div className="card-body text-center">
                                                <input type="file" onChange={this.imagePembayaranChosed}/>
                                                <p className="my-3">Your document must be in .jpeg/.jpg /.pdf format.</p>
                                            </div>
                                            <div className="card-footer text-center">
                                                {
                                                    this.state.uploadBuktiBayarSuccess === true 
                                                    ?
                                                    null
                                                    :
                                                    <div className="row justify-content-center">
                                                        {
                                                            this.state.uploadBuktiBayarClicked
                                                            ?
                                                            <Spinner animation="border" variant="secondary" className = "text-center"/>
                                                            :
                                                            <>
                                                                <input type="button" value="Upload" className="btn btn-success mr-2" onClick={() => this.uploadBuktiBayar(this.state.belanjaDiproses.id)}/>
                                                                <input type="button" value="Cancel" className="btn btn-danger" onClick={() => this.setState({keluarBoxPembayaran: null})}/>
                                                            </>
                                                        }
                                                    </div>
                                                }

                                            </div>
                                            </Card>
                                        </div>
                                    </div>
                                    :
                                    null                       
                                }
                                {
                                    this.state.modalShow === true 
                                    ?
                                    <>
                                        {this.MyVerticallyCenteredModal(
                                            {
                                                show: this.state.modalShow,
                                                onHide: () => this.setState(
                                                            {
                                                                modalShow: false, historyMode: false, historyDetail: []
                                                            }
                                                        )
                                            }
                                        )}
                                    </>
                                    :
                                    null
                                }
                            </div>
                        }
                    </>
                }
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        userId: state.user.id
    }
}

export default connect(mapStateToProps)(History);