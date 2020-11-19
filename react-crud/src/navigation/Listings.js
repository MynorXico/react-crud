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
import CircularProgress from '@material-ui/core/CircularProgress';

import * as sheetActions from '../actions/sheetActions';

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    }
    this.selected = []
  }

  componentDidMount() {
    this.props.sheetActions.fetchSheets();
  }
  _removeSheets() {
    const selected = this.selected;
    this.props.sheetActions.deleteSheets(selected);
    this.selected = [];
  }

  _handleCheck = (item) => {
    let selected = this.selected;
    if (selected.includes(item.id)) {
      let position = selected.indexOf(item.id);
      selected.splice(position, 1);
    } else {
      selected.push(item.id);
    }
    this.selected = selected;
  }

  render() {
    const { sheets, isFetching, isDeleting } = this.props;
    return (
      <div className="App">
        {isFetching ? <><LinearProgress color="primary" /></> : null}
        <Container
          handleCheck={this._handleCheck}
          sheets={sheets}
          isFetching={isFetching}

        ></Container>
        <BottomNavigation style={{
          position: 'fixed',
          bottom: 0,
          width: "100%"
        }}
          onChange={(event, newValue) => {
            switch (newValue) {
              case 1:
                if (!isDeleting)
                  this._removeSheets();
                break;
            }
          }}>
          
            <BottomNavigationAction label="Agregar" icon={<Link to="/create"><AddIcon color="primary" value="add" /></Link>} />
          <BottomNavigationAction
            label="Eliminar"
            icon={isDeleting ?
              <CircularProgress color="secondary" disableShrink size={20} /> :
              <DeleteIcon color="secondary" value="remove" />}
          />

        </BottomNavigation>
      </div>
    );
  }
}

function mapStateToProps({ sheet }) {
  return {
    sheets: sheet.sheets,
    isFetching: sheet.isFetching,
    isDeleting: sheet.isDeleting
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sheetActions: bindActionCreators(sheetActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Listings);
