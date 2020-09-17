import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';


import ButtonAppBar from "../components/HeaderComponent"
import Container from "../components/Container"
import Footer from "../components/Footer"
import CreationForm from "../components/CreationForm"

class Create extends Component {
  constructor(props) {
    super(props);
  }




  render() {

    return (
      <div className="App">
        <CreationForm params = {this.props}></CreationForm>
      </div>
    );
  }
}
export default Create;
