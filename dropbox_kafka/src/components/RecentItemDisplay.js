import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import {getAllRecentFiles} from "../actions/index";
import {getAllStarFiles} from "../actions/index";
import { history } from '../helpers1/history1';
import * as API from '../api/API';

import  '../styles/stylessheet.css';




//import "./App.css";

class RecentItemDisplay extends Component {

  handleDeleteFile = (name, path) => {
        API.changeDeleteStatus(name, path)
            .then((status) => {
                if (status === 201) {
                    
                    this.props.getAllRecentFiles();
                    history.push('/HomePage');
                } else if (status === 401) {
                    console.log("someerror occured");
                }
            });
    };


  
  /*getStarFiles = () => {


        API.getStar( )
            .then((status) => {
                if (status === 201) {
                                   
                  history.push('/HomePage');
                    
                } else if (status === 401) {
                    console.log("someerror occured");
                }
            });
    };*/

  changeStarStatus = (filename, filepath) => {
    var status;
      if(document.getElementById(filename).checked)
      {
        console.log("iam in if condition of starr");
        status = true;
      }
      else{
        console.log("in else condition of starr- not checked");
        status = false;
      }

        API.changeStar(filename, filepath, status)
            .then((status) => {
                if (status === 201) {
                  this.props.getAllRecentFiles();
                  getAllStarFiles();

                  history.push('/HomePage');
                    
                } else if (status === 401) {
                    console.log("someerror occured");
                }
            });
    };

  componentDidMount() {
    console.log(" Refreshing Home page");
        this.props.getAllRecentFiles();
    }

    render() {

        console.log("props "+ JSON.stringify(this.props.fileArr));
        console.log(" Props "+ JSON.stringify(this.props));
        var fArr = this.props.fileArr;
        if(fArr ==null || fArr== 'undefined')
        {
          fArr = [];
        }

        return (
            
                
                    <div style={{'width':'500px', 'height':'50px'}}>

                   
                  {
                      fArr.map((file,index) => {
                                    
                                    return(
                                      
                                      <div >
                                      <table style={{ 'width':'800px'}}>
                                      <tbody>

                                      <tr style={{'border':'1px solid lightblue', 'width':'650px', 'height':'60px'}}>
                                      <td style={{'width':'50px'}}>
                                      {file.starred == true ? 
                                      <input  className="star1" type="checkbox" id ={file.filename} checked
                                      onClick = {() => { this.changeStarStatus(file.filename, file.filepath)}} />
                                      :
                                      <input  className="star1" type="checkbox" id ={file.filename}
                                      onClick = {() => { this.changeStarStatus(file.filename, file.filepath)}} />
                                      }
                                      </td>
                                      <td style={{'width':'50px'}}>
                                        {file.type == 'folder' ? 
                                       <a href="#"><span className="glyphicon glyphicon-folder-open" ></span></a>
                                        :
                                        <a href="#"><span className="glyphicon glyphicon-file"></span></a>
                                        }
                                        </td>
                                      <td style={{'width':'350px'}}>
                                      <a href= {file.filepath} download> {file.filename}</a>
                                      </td>
                                      
                                      
                                      </tr>
                                    </tbody>
                                    </table>
                                    </div>
                                   

                                    );
                                                                         
                                })
                   }
                    
                    </div>
               
           
        );
    }
}
function mapStateToProps(store1) {
    console.log("map state to props : " + JSON.stringify(store1));
    console.log("this is store");
    console.log(store1);
    console.log("iam in mapstatetoprops");
    const {files} = store1;
    console.log("this is reducer2 " + JSON.stringify(files));
    const fileArr = files.recentfiles;
  return {fileArr};
}
function mapDispatchToProps(dispatch) {
  console.log("Iam in maptoDispatch");
   return {
       getAllRecentFiles : () => dispatch(getAllRecentFiles())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentItemDisplay);    // Learn 'Currying' in functional programming
