import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import PropTypes from "prop-types";
import ButtonAppBar from "../components/HeaderComponent"
import Container from "../components/Container"
import Footer from "../components/Footer"
import CreationForm from "../components/CreationForm"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import browserHistory from 'react-router'
import { withRouter } from 'react-router';

import * as sheetActions from '../actions/sheetActions';
import LinearProgress from '@material-ui/core/LinearProgress';


class Login extends Component {
  constructor(props) {
    super(props);
    this.sheet_id = this.props.params.id;
    var hash_url_params = this.props.location.hash.split('&');
    var id_token = hash_url_params.find(x => x.includes('id_token'));
    var id_token_split = [];
    if(id_token != null){
        id_token_split = id_token.split('=');
    }
    if(id_token_split.length >= 1){
        id_token = id_token_split[1]
    }else{
        id_token = null;
    }
    this.id_token = id_token;

  }

  async componentDidMount() {
    const { router } = this.props;
    if(this.id_token == null){
        // Redirigir a login
        console.log("Hay que redirigir");
        window.location.href='https://prograweb.auth.us-east-1.amazoncognito.com/login?client_id=tni2l4ed1ds21pkf0vp1k8im5&response_type=token&scope=email+openid&redirect_uri=https://d26m5oyvq96l0u.cloudfront.net/login'
    }else{
        localStorage.setItem('jwt', this.id_token)
        router.push('/');
    }
  }


  _createSheet() {
    this.props.sheetActions.createSheet(this.state);
  }

  _updateSheet() {
    console.log("Curent sate: ", this.state, this.sheet_id);
    this.props.sheetActions.updateSheet(this.state, this.sheet_id);
  }

  // const [values, setValues] = React.useState({

  // });

  static contextTypes = {
    router: PropTypes.object
  }

  _handleRedirect = () => {
    console.log("Redirecting: ");
    const { router } = this.props;
    router.push('/');
  }
  render() {
    const { isLoading, sheet, isFetching } = this.props;
    return (
      <div className="App">
        <><LinearProgress color="primary" /></> 
      </div>
    );
  }
}

function mapStateToProps({ sheet }) {

  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
