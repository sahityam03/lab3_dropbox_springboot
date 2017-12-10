import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import {getAllStarFiles} from "../actions/index";
import { history } from '../helpers1/history1';
import * as API from '../api/API';

import  '../styles/stylessheet.css';




//import "./App.css";

class StarItemDisplay extends Component {

  

  changeStarStatus = (fileid) => {
    var status;
      if(document.getElementById(fileid).checked)
      {
        console.log("iam in if condition of starr");
        status = 'Y';
      }
      else{
        console.log("in else condition of starr- not checked");
        status = 'N';
      }

        API.changeStar(id, status)
            .then((status) => {
                if (status === 200) {
                  this.props.getAllStarFiles();
                  this.props.getAllStarFiles();
                    history.push('/HomePage');
                    
                } else if (status === 401) {
                    console.log("someerror occured");
                }
            });
    };


    

  componentDidMount() {
    console.log(" Refreshing Home page");
        this.props.getAllStarFiles();
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
                                      <div>
                                      <div >
                                      <table style={{ 'width':'800px'}}>
                                      <tbody>

                                      <tr style={{'border':'1px solid lightblue', 'width':'650px', 'height':'60px'}}>
                                      <td style={{'width':'50px'}}>
                                      {file.starred == 'Y' ? 
                                      <input  className="star1" type="checkbox" id ={file.id} checked
                                      onClick = {() => { this.changeStarStatus(file.id)}} />
                                      :
                                      <input  className="star1" type="checkbox" id ={file.id}
                                      onClick = {() => { this.changeStarStatus(file.id)}} />
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
    console.log("this is store staritempage");
    console.log(store1);
    console.log("iam in mapstatetoprops in staritempage");
    const {files} = store1;
    const {data} = store1;
    console.log("this is reducer2 " + JSON.stringify(files));
    console.log("this is reducer2 " + JSON.stringify(data));
    console.log("this is username in mapstate "+ data.username);
    const fileArr = files.starfiles;
  return {fileArr};
}
function mapDispatchToProps(dispatch) {
  console.log("Iam in maptoDispatch");
   return {
       getAllStarFiles : () => dispatch(getAllStarFiles())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StarItemDisplay);    // Learn 'Currying' in functional programming
