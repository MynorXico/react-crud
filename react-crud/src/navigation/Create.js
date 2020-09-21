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


class Create extends Component {
  constructor(props) {
    super(props);
    this.sheet_id = this.props.params.id;
    this.state = {

    }

    this._handleInputChange = this._handleInputChange.bind(this);
    this._createSheet = this._createSheet.bind(this);
    this._updateSheet = this._updateSheet.bind(this);
    this._handleRedirect = this._handleRedirect.bind(this);
  }

  componentDidMount() {
    if (this.sheet_id != null) {
      this.props.sheetActions.fetchSheet(this.sheet_id);
    }
  }

  _handleInputChange(event) {
    const target = event.target;
    var value = '';
    var name = '';
    if (target) {
      value = target.type === 'checkbox' ? target.checked : target.value;
      name = target.id;
    } else {
      value = event;
      name = 'duration';
    }


    this.setState({
      [name]: value
    })
  }

  async _createSheet() {
    await this.props.sheetActions.createSheet(this.state);
  }

  async _updateSheet() {
    await this.props.sheetActions.updateSheet(this.sheet_id, this.state);
  }

  // const [values, setValues] = React.useState({

  // });

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
        {isFetching ? <><LinearProgress color="primary" /></> : null}
        <CreationForm
          params={this.props}
          handleInputChange={this._handleInputChange}
          createSheet={this._createSheet}
          handleRedirect={this._handleRedirect}
          isLoading={isLoading}
          isFetching={isFetching}
          buttonText={sheet ? 'Update' : 'Create'}
          sheet={sheet}
          updateSheet={this._updateSheet}
        ></CreationForm>
      </div>
    );
  }
}

function mapStateToProps({ sheet }) {
  console.log("Mapping: ", sheet);

  return {
    isLoading: sheet.isCreating || sheet.isUpdating,
    isFetching: sheet.isFetching,
    sheet: sheet.sheet
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sheetActions: bindActionCreators(sheetActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);