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
    }

    async componentDidMount() {
        localStorage.clear('jwt')
        window.location.href = 'https://prograweb.auth.us-east-1.amazoncognito.com/logout?client_id=tni2l4ed1ds21pkf0vp1k8im5&logout_uri=https://d26m5oyvq96l0u.cloudfront.net/login'
    }

    static contextTypes = {
        router: PropTypes.object
    }

    _handleRedirect = () => {
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
