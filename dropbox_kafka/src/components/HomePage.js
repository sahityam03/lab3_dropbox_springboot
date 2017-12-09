import React, {Component} from 'react';
import {connect} from 'react-redux';
import { history } from '../helpers1/history1';
//import {addToOrder} from "../action/index";
import * as API from '../api/API';
import RecentItemDisplay from "./RecentItemDisplay";
import StarItemDisplay from "./StarItemDisplay";
import SharedItemDisplay from "./SharedItemDisplay";
import UploadFile from "./UploadFile";
import  '../styles/stylessheet.css';
//import ./App.css;


class HomePage extends Component {

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

    render() {
      console.log("i am in homepage");
        console.log(this.props);
        return (
            <div className="container-fluid">
                <div className = "row">
            
                
                    <div className="col-md-2 sidenav hidden-xs sidebar" style={{'backgroundColor': 'lightblue', 'height': '300vh'}}>
                        <br />
                        <h3 className="text-center">Dropbox</h3>
                        <br />
                        <ul className = "nav nav-list">
                        <li><a href="/HomePage">Home</a></li>
                        </ul>
                        <ul className = "nav nav-list">
                        <li><a href="/FilesPage">Files</a></li>
                        </ul>
                        <ul className = "nav nav-list">
                        <li><a href="/AboutPage">About</a></li>
                        </ul>
                        <ul className = "nav nav-list">
                        <li><a href="#">Groups</a></li>
                        </ul>

                    </div>

                    <div className="col-md-8" style={{'width': '650px', 'height':'auto'}}>
                        <h2 className="text-center">Home</h2> 

                      <div className="container" style={{'min-height':'200px', 'position':'relative', 'display': 'table', 'height' : 'auto' }}>
                      
                          
                       
                          <h4><b>Shared Files</b></h4>
                          <hr/>
                       
                          <SharedItemDisplay />
                        
                          </div>

                     <div className="container" style={{'min-height':'200px', 'position':'relative', 'display': 'table', 'height' : 'auto' }}>
                      
                          
                       
                          <h4><b>Starred</b></h4>
                          <hr/>
                       
                          <StarItemDisplay />
                        
                          </div>
                        
                       
                       <div className="container" style={{'position':'relative', 'display': 'table', 'height' : 'auto' }}>
                          <h4><b> Recent </b></h4>
                          <hr />

                       <RecentItemDisplay />
                          
                       
                       </div>
                       
                    </div>
                    
                    <div className = "col-md-2  "  style={{'backgroundColor': 'lightblue', 'height': '300vh'}}>
                    <div>
                        <button
                                className="btn btn-primary btn-lg"
                                type="button"
                                onClick={() => this.handleSignOut()}>
                                SignOut
                            </button>
                    </div>
                        <div>
                        <br />
                        <br/>
                        <br />
                        <ul className = "nav nav-list">
                          <li><UploadFile /></li>
                          </ul>
                        <ul className = "nav nav-list">
                          <li><a href="">New Folder</a></li>
                        </ul>
                    
                        </div>
                    </div>
            
                </div>
            </div>

       );
    }
}


export default HomePage;

