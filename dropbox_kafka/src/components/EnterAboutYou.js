import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';



import { history } from '../helpers1/history1';

//import Newpage from "./Newpage"; 
//import Homepage from "./HomePage";
//import "./App.css";

class EnterAboutYou extends Component {
 state = {
        description: '',
        phone : '',
        country: '',
        work: '',
        education : '',
        interests : ''
    };

handleAboutEdit = () => {
        console.log("in handleabout edit");
        API.doAboutEdit(this.state)
            .then((status) => {
                if (status === 200) {
                    history.push('/AboutPage');
                    
                } else if (status === 401) {
                    console.log("someerror occured");
                }
            });
    };

    /*getAboutMe = () => {
  
        console.log("in getAboutMe");
        API.getMe()
        .then(data =>
        {
            console.log("this is in api then");
            console.log(JSON.stringify(data));
            this.setState({

                description : data[0].description,
                phone : data[0].phone,
                country: data[0].country,
                work : data[0].work,
                education : data[0].education,
                interests : data[0].interests
            });

            });
            }*/


    componentDidMount(){
       
         console.log("in getAboutMe");
        API.getMe()
        .then(data =>
        {
            console.log("this is in api then");
            console.log(JSON.stringify(data));
            if(data != null && data != 'undefined')
            { 
            this.setState({

                description : data[0].description,
                phone : data[0].phone,
                country: data[0].country,
                work : data[0].work,
                education : data[0].education,
                interests : data[0].interests
            });
            }

            });
         
    }

    render() {

        
        //console.log(" Props "+ JSON.stringify(this.props));
        

        return (
            <div className="container-fluid">
                <div className = "row">
            
                
                    <div className="col-md-2 sidenav hidden-xs sidebar" style={{'backgroundColor': 'lightblue', 'height': '100vh'}}>
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
                    </div>
                
                <div className="col-md-8">
                <div className="row justify-content-md-center">
                    <form>
                        <div className="form-group" style={{'width' : '400px'}}>
                            <h1>About Page</h1>
                        </div>
                        <div className="form-group">
                            <b>Description:</b> <input
                                className="form-control"
                                type="text"
                                label="About You"
                                placeholder="Write Few lines about you"
                                value={this.state.description}
                                onChange={(event) => {
                                    this.setState({
                                        description: event.target.value
                                    });
                                }} 
                              />
                        </div>
                        <div className="form-group">
                            <b>Country:</b><input
                                className="form-control"
                                type="text"
                                label="Country"

                                placeholder="Enter Resident Country"
                                value={this.state.country}
                                onChange={(event) => {
                                    this.setState({
                                        country: event.target.value
                                    });
                                }} 
                              required/>
                        </div>
                        <div className="form-group">
                            <b>Phone:</b><input
                                className="form-control"
                                type="number"
                                label="Phone"
                                min = "10"
                                max = "10"
                                placeholder="Enter Phone number"
                                value={this.state.phone}
                                onChange={(event) => {
                                    this.setState({
                                        phone: event.target.value
                                    });
                                }} 
                              />
                        </div>
                        <div className="form-group">
                            <b>work:</b><input
                                className="form-control"
                                type="text"
                                label="Work"
                                placeholder="Enter where you work"
                                value={this.state.work}
                                onChange={(event) => {
                                    this.setState({
                                        work: event.target.value
                                    });
                                }} 
                              />
                        </div>
                        <div className="form-group">
                            <b>Education:</b><input
                                className="form-control"
                                type="text"
                                label="Education"
                                placeholder="Enter Your highest education"
                                value={this.state.education}
                                onChange={(event) => {
                                    this.setState({
                                        education: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <b>Interests:</b><input
                                className="form-control"
                                type="text"
                                label="Interests"
                                placeholder="Enter Your Interests"
                                value={this.state.interests}
                                onChange={(event) => {
                                    this.setState({
                                        interests: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.handleAboutEdit()}>
                                Submit
                            </button>
                        </div>
                    </form>
                         
                </div>
           </div>
        </div>
        </div>
           
        );
    }
}



export default connect(null, null)(withRouter(EnterAboutYou));    // Learn 'Currying' in functional programming
