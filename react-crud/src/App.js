import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import ButtonAppBar from "./components/HeaderComponent"
import Container from "./components/Container"
import Footer from "./components/Footer"


class App extends Component {
  constructor(props) {
    super(props);
  }




  render() {

    return (
      <div className="App">
        <ButtonAppBar></ButtonAppBar>
        {this.props.children}
        <Footer></Footer>
      </div>
    );
  }
}
export default App;
