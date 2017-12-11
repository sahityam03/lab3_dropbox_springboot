import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as API from '../api/API';
import { Route, withRouter } from 'react-router-dom';
import { history } from '../helpers1/history1';




class AboutPage extends Component {

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

	state = {
        description: '',
        phone : '',
        country: '',
        work: '',
        education : '',
        interests : ''
    };

	

	componentDidMount(){
       
         console.log("in getAboutMe");
        API.getMe()
        .then(data =>
        {
            console.log("this is in api then");
            console.log(JSON.stringify(data));
            if(data != null && data != 'undefined')
            { 
                console.log("in if condition");
                console.log("printing desc");
                console.log(data.description);
                console.log("this is again printing");
                
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
      console.log("i am in About");
      
        console.log(this.props);
        return (

        		<div className="container-fluid">
            	
                <div className="row">
                
                    <div className="col-md-2 sidenav hidden-xs sidebar" style={{'backgroundColor': 'lightblue', 'height': '100vh'}}>
                    	<h3 className="text-center">Dropbox</h3>
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

                    <div className="col-md-10">
                    <div style={{'position':'absolute', 'top': '2', 'right':'0'}}>
                        <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.handleSignOut()}>
                                SignOut
                            </button>
                    </div>


                    <br />
                    <br />
                    
                    <table>
                    <tbody>
                    	<tr>
                    		<td><b>This is Me:  </b></td>
                    		<td> {this.state.description}</td>
                    	</tr>
                        <br />
                    	<tr>
                    		<td><b>Phone: </b></td>
                    		<td> {this.state.phone} </td>
                    	</tr>
                        <br/>
                    	<tr>
                    		<td><b>Country: </b></td>
                    		<td> {this.state.country} </td>
                    	</tr>
                        <br />
                    	<tr>
                    		<td><b>Work: </b></td>
                    		<td> {this.state.work} </td>
                    	</tr>
                        <br />
                    	<tr>
                    		<td><b>Education: </b></td>
                    		<td> {this.state.education}</td>
                    	</tr>
                        <br />
                    	<tr>
                    		<td><b>Interests:</b></td>
                    		<td>{this.state.interests}</td>
                    	</tr>
                        <br />
                    </tbody>
                    </table>
                    <div >
                        <a href='/EnterAboutYou' className="btn btn-primary btn-lg" role="button">Edit</a>
                    </div>
                    </div>
                    
             </div>
             
             </div>



        	);
    }
}

export default connect(null, null)(withRouter(AboutPage));