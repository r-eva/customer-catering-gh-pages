import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {connect} from 'react-redux'
import axios from 'axios'
import {urlApi} from './HELPERS/database'
import {keepLogin, checkLocalStorage, confirmLogin} from './REDUX/Action/userAction'
import ScrollToTop from './HELPERS/scrollTop'
import LandingPage from './PAGES/LandingPage/Main/LandingPage'
import Navbar from './PAGES/Navbar/Navbar'
import Login from './PAGES/Login/Login'
import Register from './PAGES/Register/Register/Register'
import Footer from './PAGES/Footer/Footer'
import WaitingEmailVerification from './PAGES/Register/Waiting/WaitingEmailVerification'
import EmailVerified from './PAGES/Register/EmailVerified/EmailVerified'
import Subscribe from './PAGES/Subscribe/Subscribe'
import ProductDetail from './PAGES/Productdetail/Productdetail'
import Cart from './PAGES/Cart/Cart'
import History from './PAGES/History/History'
import Wishlist from './PAGES/Wishlist/Wishlist'
import Promo from './PAGES/Promo/Promo'

class App extends Component {
  componentDidMount() {
    var token = localStorage.getItem('token')
    if (token) {
        this.props.keepLogin(token)
    } else {
        this.props.checkLocalStorage()
    }
  }

  componentDidUpdate() {
    if (this.props.user.email !== '') {
      axios.get(urlApi + 'user/confirmedEmailOtherScreen/' + this.props.user.email)
      .then((res) => {
        if (this.props.user.status !== res.data.status) {
          localStorage.setItem('token', res.data.token)
          this.props.confirmLogin(res.data)
          console.log('masuk')
        } 
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  render() {
    if (!this.props.user.userChecker) {
      return (
          <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
          </div>
      )
  }

    return (
      <div>
        <ScrollToTop/>
        <Navbar/>
        <Switch>
              <Route exact path='/' component={LandingPage}/>
              <Route exact path='/Login' component={Login}/>
              <Route exact path='/Register' component={Register}/>
              <Route exact path="/waitingemailverification" component={WaitingEmailVerification}/>
              <Route exact path="/emailverified" component={EmailVerified} />
              <Route exact path="/Subscribe" component={Subscribe}/>
              <Route exact path="/product-detail/:id" component={ProductDetail}/>
              <Route exact path="/Cart" component={Cart}/>
              <Route exact path="/History" component={History}/>
              <Route exact path="/Wishlist" component={Wishlist}/>
              <Route exact path="/Promo" component={Promo}/>
        </Switch>
        <Footer/>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps, {keepLogin, checkLocalStorage, confirmLogin})(App);