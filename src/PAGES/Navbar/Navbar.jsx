import React, {Component} from 'react'
import './Navbar.css'
import Axios from 'axios'
import {urlApi} from '../../HELPERS/database'
import {connect} from 'react-redux'
import {userLogout, hitungCart} from '../../REDUX/Action/userAction'
import {Link} from 'react-router-dom'
import {Nav, Navbar, Image, NavDropdown} from 'react-bootstrap'
import Logo from '../../IMG/Logo/TransparentLogo.png'
import LogoScroll from '../../IMG/Logo/logohandwriting.png'
import {FaShoppingBag} from 'react-icons/fa'

class Navigation extends Component {

    state = {
        cart: this.props.jumlahCart,
        isOpenDropdown: false,
        bgNavbar: "",
        height: "",
    }

    componentDidMount() {
        this.props.hitungCart(this.props.user.id)
        window.addEventListener('scroll', this.handleScroll)
    }

    componentDidUpdate(){
        if (this.state.cart !== this.props.jumlahCart) {
            this.props.hitungCart(this.props.user.id)
        }
    }

    getEncryptedEmail = () => {
        Axios.get(urlApi + 'user/userDashboard/' + this.props.user.email)
            .then((res) => {
                this.setState({encryptedEmail: res.data})
                console.log(this.state.encryptedEmail)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleScroll = () => {

        if (window.pageYOffset > 0) {
            if(!this.state.bgNavbar) {
                this.setState({bgNavbar: "white", height: "70px"})
            }
        } else {
            if (this.state.bgNavbar) {
                this.setState({bgNavbar: "", height: "100px"})
            }
        }
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="md" fixed="top" style={{background: this.state.bgNavbar, height: this.state.height}} className="transition-scroll">
                    <Nav className="d-md-none">
                        <Navbar.Brand as={Link} to="/">
                            {
                                this.state.bgNavbar === ""
                                ?
                                <Image src={Logo} alt='LogoCCC' fluid className="all-nav link-logo"/>
                                :
                                <Image src={LogoScroll} alt='LogoCCC' fluid className="all-nav link-logo"/>
                            }
                        
                        </Navbar.Brand>
                    </Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between all-nav">
                        <Nav>
                            <Nav.Link eventKey="1" as={Link} to="/Subscribe" className="link-nav">SUBSCRIBE</Nav.Link>
                            <Nav.Link eventKey="2" as={Link} to="/Promo" className="link-nav">PROMO</Nav.Link>
                        </Nav>
                            <Nav.Link eventKey="3" as={Link} to="/" className="d-none d-md-block">
                                {
                                    this.state.bgNavbar === ""
                                    ?
                                    <Image src={Logo} alt='LogoCCC' fluid/>
                                    :
                                    <Image src={LogoScroll} alt='LogoCCC' fluid/>
                                }                            
                            </Nav.Link>
                        <Nav>
                            {
                                this.props.user.username !== ''
                                ?
                                <>
                                     <NavDropdown title={this.props.user.username === "" ? "dropdown-nav" : `Hello, ${this.props.user.username}`} id="basic-nav-dropdown" className="dropdown-nav">
                                            {
                                                this.props.user.status === "Verified"
                                                ?
                                                    <>
                                                        <NavDropdown.Item eventKey="4" as={Link} to="/History" className="dropdown-item">HISTORY</NavDropdown.Item>
                                                        <NavDropdown.Item eventKey="5" as={Link} to="/Cart">CART</NavDropdown.Item>
                                                        <NavDropdown.Item eventKey="11" as={Link} to="/Wishlist">WISHLIST</NavDropdown.Item>
                                                    </>
                                                :
                                                    <>
                                                        <NavDropdown.Item eventKey="6" as={Link} to="/Wishlist">WISHLIST</NavDropdown.Item>
                                                        <NavDropdown.Item eventKey="7" as={Link} to={`/waitingemailverification?email=${this.props.user.encryptedEmail}`}>VERIFICATION</NavDropdown.Item>
                                                    </>                             
                                            }
                                            <NavDropdown.Divider/>
                                            <NavDropdown.Item eventKey="8" onClick={this.props.userLogout}>LOGOUT</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link as={Link} eventKey="9" to="/Cart" className="link-nav"><FaShoppingBag/>&nbsp;{this.props.jumlahCart}</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link as={Link} to="/Login" eventKey="9" className="link-nav">SIGN IN</Nav.Link>
                                    <Nav.Link as={Link} to="/Register" eventKey="10" className="link-nav">REGISTER</Nav.Link>
                                </>
                                
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        jumlahCart: state.cart.jumlahCart
    }
}

export default connect(mapStateToProps, {userLogout, hitungCart})(Navigation);