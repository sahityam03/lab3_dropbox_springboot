import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import {handleUploadFile} from "../actions/index";
import  '../styles/stylessheet.css';


//import {addToOrder} from "../action/index";
//import "./App.css";


class UploadFile extends Component {
  state = {
        fileName: '',
        fileHandle: {},
        path : ''
    };
  /*componentWillMount(){
        this.setState({
            fileName: '',
        fileHandle: {}
        });
    }*/
 handleChange = event => {
      this.setState({fileName: event.target.files[0].name});
      this.setState({fileHandle: event.target.files[0]});
      //this.setState({path : this.props.path});
      console.log("this is length" + event.target.files.length);
  };


    render() {

        //const {path} = this.props.path;
        //console.log(" Props of path "+ JSON.stringify(this.props));
        //console.log(" Props of path "+ this.props.path);
        //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$");

        

        return (
              
                
                <div className="row justify-content-md-center">
                    <form encType="multipart/formdata"  onSubmit={() => this.props.handleUploadFile(this.state, this.props.path)}>
                    <div className="fileUpload">
                      <input type="file" name= "fileUpload" className="upload"   onChange={this.handleChange}  />
                      <input type="submit" readOnly className="btn btn-primary btn-lg" value="Upload" />
                      </div>
                    </form>
                    
                </div>
            
        );
    }
}

function mapStateToProps(store1) {
    console.log("map state to props : " + JSON.stringify(store1));
    console.log("this is store staritempage");
    console.log(store1);
    const {files} = store1;
    console.log("this is reducer2 " + JSON.stringify(files));
    console.log("this is path "+ files.presentpath);
    const path = files.presentpath;
  return {path};
}

function mapDispatchToProps(dispatch) {
   return {
       handleUploadFile : (filedata, path) => dispatch(handleUploadFile(filedata, path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile);     // Learn 'Currying' in functional programming
