import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';


import ButtonAppBar from "../components/HeaderComponent"
import Container from "../components/Container"
import Footer from "../components/Footer"

import BottomNavigation from '@material-ui/core/BottomNavigation';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link } from "react-router";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LinearProgress from '@material-ui/core/LinearProgress';

import * as sheetActions from '../actions/sheetActions';

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    }
  }

  componentDidMount() {
    this.props.sheetActions.fetchSheets();
  }

  handleCheck = (item) => {
    let { selected } = this.state;
    if (selected.includes(item.id)) {
      let position = selected.indexOf(item.id);
      selected.splice(position, 1);
    } else {
      selected.push(item.id)
    }
    this.setState({ selected });

    console.log("After checks: ", this.state.selected);
  }

  render() {
    const { sheets, isFetching } = this.props;
    if (isFetching) {
      return <>
        <LinearProgress color="primary" /></>
    }
    return (
      <div className="App">
        <Container
          handleCheck={this.handleCheck}
          sheets={sheets}
          isFetching={isFetching}

        ></Container>
        <BottomNavigation style={{
          position: 'fixed',
          bottom: 0,
          width: "100%"
        }}
          onChange={(event, newValue) => {

          }}>
          <Link to="/create">
            <BottomNavigationAction label="Agregar" icon={<AddIcon color="primary" value="add" />}>
            </BottomNavigationAction>
          </Link>
          <BottomNavigationAction label="Eliminar" icon={<DeleteIcon color="secondary" value="remove" />}>


          </BottomNavigationAction>

        </BottomNavigation>
      </div>
    );
  }
}

function mapStateToProps({ sheet }) {
  return {
    sheets: sheet.sheets,
    isFetching: sheet.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sheetActions: bindActionCreators(sheetActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Listings);
