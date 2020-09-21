import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';


import ButtonAppBar from "./components/HeaderComponent"
import Container from "./components/Container"
import Footer from "./components/Footer"
import * as sheetActions from './actions/sheetActions';
import { bindActionCreators } from 'redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.sheetActions.fetchSheets();
  }


  render() {
    const { sheets } = this.props;
    return (
      <div className="App" >
        <ButtonAppBar sheets={sheets}></ButtonAppBar>
        {this.props.children}
        <Footer></Footer>
      </div>
    );
  }
}

function mapStateToProps({ sheet }) {
  const { sheets } = sheet;
  return {
    sheets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sheetActions: bindActionCreators(sheetActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
