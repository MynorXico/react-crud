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

import Tooltip from '@material-ui/core/Tooltip';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link } from "react-router";

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    }
  }



  handleCheck = (item) => {
    console.log("CHecking: ", item);
    console.log("Before checks: ", this.state.selected);
    let { selected } = this.state;
    if (selected.includes(item.id)) {
      let position = selected.indexOf(item.id);
      selected.splice(position, 1);
    } else {
      selected.push(item.id)
    }
    console.log("Pushing: ", { selected });
    this.setState({ selected });

    console.log("After checks: ", this.state.selected);
  }

  render() {

    return (
      <div className="App">
        <Container handleCheck={this.handleCheck}></Container>
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
export default Listings;
