import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import PropTypes from "prop-types";
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
      filename: null
    }

    this._handleInputChange = this._handleInputChange.bind(this);
    this._createSheet = this._createSheet.bind(this);
    this._updateSheet = this._updateSheet.bind(this);
    this._handleRedirect = this._handleRedirect.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sheet != this.props.sheet && this.props.sheet != null) {
      this.setState({
        ...this.props.sheet
      }, () => console.log("New state: ", this.state));
    }
    if (this.props.isCreating != prevProps.isCreating && !this.props.isCreating) {
      this._handleRedirect();
    }
    if (this.props.isUpdating != prevProps.isUpdating && !this.props.isUpdating) {
      this._handleRedirect();
    }
  }

  componentDidMount() {
    if (this.sheet_id != null) {
      this.props.sheetActions.fetchSheet(this.sheet_id)
    }
    this.props.sheetActions.fetchSheets();
  }

  _getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result.split(',')[1])
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  _handleInputChange(event) {
    const target = event.target;
    var value = '';
    var name = '';
    if (target) {
      name = target.id;

      if (target.type == 'checkbox') {
        value = target.checked
      } else if (target.type == 'file') {
        const formData = new FormData();
        formData.append(
          'test',
          target.files[0],
          event.target.files[0].name
        )
        this.setState({
          filename: event.target.files[0].name
        })
        this._getBase64(event.target.files[0], (data) => { 
          this.setState({
            [name]: data,
          })
        })
        let reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        value = reader.result;
        console.log("File base64: ", value);
        value = formData
        console.log(value);
      }
      else {
        value = target.value
      }
    } else {
      value = event;
      name = 'duration';
    }

    if (target.type != 'file') {
      // Si es archivo la llamada se realiza arriba de manera asíncrona
      this.setState({
        [name]: value
      })
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
          filename={this.state.filename}
        ></CreationForm>
      </div>
    );
  }
}

function mapStateToProps({ sheet }) {
  console.log("Mapping: ", sheet);

  return {
    isLoading: sheet.isCreating || sheet.isUpdating,
    isFetching: sheet.isFetchingSheet,
    sheet: sheet.sheet,
    isCreating: sheet.isCreating,
    isUpdating: sheet.isUpdating
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sheetActions: bindActionCreators(sheetActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
