import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as API from '../api/API';
import { history } from '../helpers1/history1';
import {getAllFiles} from "../actions/index";

//import {addToOrder} from "../action/index";

//import RecentItemDisplay from "./RecentItemDisplay";
import AllFiles from "./AllFiles";
import UploadFile from "./UploadFile";
//import ./App.css;


class FilesPage extends Component {

    handleSignOut = () => {
        API.doSignOut()
            .then((status) => {
                if (status === 201) {
                    history.push('/');
                    
                } else if (status === 401) {
                    console.log("someerror occured");
                }
            });
    };

    createFolder= (event) => {
        console.log("in creating folder");
        this.refs.newFolderField.type='text';
        this.refs.divFolder.style="display: inline-block";

    }
    handleChange = (event) => {
        if (event.key == 'Enter') {
            console.log("enter pressed");
            this.handleCreateFolder(event);
        }
    }

    handleCreateFolder = (event) => {
        console.log(" in handlecreatefolder");
        const foldervalue = event.target.value;
        console.log( " value is " + foldervalue);
        if(foldervalue !== "")
        {
            console.log(" this is props path "+ this.props.path);
            API.addFolder(foldervalue, this.props.path)
                .then((status) => {
                if (status === 201) {
                    history.push('/FilesPage');
                    //this.props.getAllFiles();
                    
                } else if (status === 401) {
                    console.log("someerror occured");
                }
            });
        }
        this.refs.newFolderField.value='';
        this.refs.divFolder.style="display: none";
    }

    render() {
      console.log("i am in Files");
        
        return (
            <div className="container-fluid">
            
                <div className = "row">
            
                
                    <div className="col-md-2 sidenav hidden-xs sidebar" style={{'backgroundColor': 'lightblue', 'height': '100vh'}}>
                        <br />
                        <h3 className="text-center">Files</h3>
                        <br />
                        <ul className = "nav nav-list">
                        <li><a href="/HomePage">Home</a></li>
                        </ul>
                        <ul className = "nav nav-list">
                        <li><a href="/FilesPage">Myfiles</a></li>
                        </ul>
                        <ul className = "nav nav-list">
                        <li><a href="/Deletedfiles">Deleted Files</a></li>
                        </ul>
                    </div>

                    <div className="col-md-8" style={{'width': '650px'}}>

                       <h3 >Dropbox</h3> 
                       <div id="divFolder" style={{'display': 'none', }} ref="divFolder">
                        <table  style={{ 'width':'875px'}}>
                        <tbody>
                        <tr style={{'border':'1px solid lightblue', 'width':'650px', 'height':'60px'}}>
                        <td style={{'width':'50px'}}>
                                        
                            <a href="#"><span className="glyphicon glyphicon-folder-open" ></span></a>
                                        
                        </td>
                        <td style={{'width':'300px'}}>
                        <input type="text" onKeyPress={this.handleChange} ref="newFolderField" onBlur={this.handleCreateFolder} />
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </div>
                       
                       <div>
                          

                       
                          <AllFiles />
                       
                       </div>
                    </div>
                    <div className = "col-md-2 col-md-offset-3"  style={{'backgroundColor': 'lightblue', 'height': '100vh'}}>
                    <div>
                        <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.handleSignOut()}>
                                SignOut
                            </button>
                    </div>
                        <div>
                        <br />
                        <br />
                        <br />
                        <ul className = "nav nav-list">
                          <li><UploadFile /></li>
                        </ul>
                        <br />
                        <ul className = "nav nav-list">
                            <li><button className="unstyled-button" onClick={this.createFolder}>New folder</button></li>
                        </ul>

                        
                                        
                    
                        </div>
                    </div>
            
                </div>
            </div>


       );
    }
}



function mapStateToProps(store1) {
    console.log("map state to props : " + JSON.stringify(store1));
    console.log("this is store in filespage");
    console.log(store1);
    console.log("iam in mapstatetoprops in filepafe");
    const {files} = store1;
    console.log("this is reducer2 " + JSON.stringify(files));
    const path = files.presentpath
    console.log("this is path in mapstate" + path);
  return {path};
}


export default connect(mapStateToProps, null)(FilesPage);

