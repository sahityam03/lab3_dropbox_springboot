import React, {Component} from 'react';
import {connect} from 'react-redux';



import { Route, withRouter } from 'react-router-dom';
import {getAllFiles, getAllStarFiles, downloadFile} from "../actions/index";
import { history } from '../helpers1/history1';
import * as API from '../api/API';

import  '../styles/stylessheet.css';
//import StarItemDisplay from "./StarItemDisplay";
//import ./App.css;


class AllFiles extends Component {

   state = {
        filename: '',
        filepath : ''
    };

    popsharewindow= (event) => {
      console.log("creating folder, create an input field to display");
      console.log("event --> "+event.target.id);
      //this.refs.filepath.value = filepath;
      this.refs.shareFolder.style="display: inline-block, 'position': 'fixed', 'width':'250px', 'height': '150px','border':'5px solid blue', 'margin-left':'-155px', 'margin-top':'-110px', 'top': '50%', 'left':'50%', 'padding':'30px'";
      this.refs.fileId.value = event.target.id;

    }

    handleShare = (event) => {
      console.log(" folder added");
      //this.refs.newFolderField.type='hidden';
      const emailIds = this.refs.sharefield.value;
      const fileid = this.refs.fileId.value;


      console.log("###### emailIds are : " + emailIds);
      console.log("###### emailIds are : " + emailIds.length);
      console.log("###### Filename are : " + fileid);

      if(emailIds.length > 0) {
          //API call
          this.refs.sharefield.value = '';
          this.refs.fileId.value = '';
          this.refs.shareFolder.style="display: none";
          API.sharedocument(emailIds, fileid)
              .then((status) => {
                if (status === 201) {
                    history.push('/FilesPage');
                    this.props.getAllFiles();
                    
                } else if (status === 401) {
                    console.log("someerror occured");
                }
          });
      }
    }

    handleClose = (event) => {
      console.log(" should close window");
         
          this.refs.sharefield.value = '';
          this.refs.shareFolder.style="display: none";
          
      
    }


    handleDeleteFile = (id) => {
        API.changeDeleteStatus(id)
            .then((status) => {
                if (status === 200) {
                    history.push('/FilesPage');
                    this.props.getAllFiles();
                    
                } else if (status === 401) {
                    console.log("someerror occured");
                }
            });
    };
  

  /*changestate = (filename, filepath) => {
   // this.setState({filename: filename});
    //this.setState({filepath: filepath});

  };*/

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

        API.changeStar(fileid, status)
            .then((status) => {
                if (status === 200) {
                  this.props.getAllFiles(null, null);
                  //this.props.getAllStarFiles();
                    history.push('/FilesPage');
                    
                } else if (status === 401) {
                    console.log("someerror occured");
                }
            });
    };

  componentDidMount(){
        this.props.getAllFiles(null, null);
    }

    render() {

        console.log("props "+ JSON.stringify(this.props.fileArr));
        console.log(" Props "+ JSON.stringify(this.props));
        var fArr = this.props.fileArr;
        if(fArr ==null || fArr== 'undefined')
        {
          fArr = [];
        }
        console.log("this is farr");
        console.log("##########");
        //console.log(fArr);

        return (
          <div style={{'width':'500px', 'height':'50px'}}>
            {
              fArr.map((file,index) => {
                return(
                    <div>
                      <div>
                        <table style={{ 'width':'875px'}}>
                          <tbody>
                            <tr style={{'border':'1px solid lightblue', 'width':'650px', 'height':'60px'}}>
                              <td  style={{'width':'50px'}}>
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
                              <td style={{'width':'300px'}}>
                                {file.type == 'folder' ?
                                  <button className= "unstyled-button" onClick={() => {
                                                                 this.props.getAllFiles(this.props.path+'/'+file.filename, file.filename);
                                                            }} > {file.filename} </button>
                                  :
                                  <button className= "unstyled-button" onClick={() => {this.props.downloadFile(file.filepath, file.filename); }}>{file.filename}</button>
                                }
                              </td>
                              <td>
                                <div className="recents-item__sharing recents-item__action-button">
                                <button className="unstyled-button" id={file.id} onClick={this.popsharewindow}>Share</button>
                                </div>
                              </td>
                              <td >
                                <button
                                  className="btn btn-primary btn-lg"
                                    onClick={() => {
                                                       this.handleDeleteFile(file.id);
                                                  }}>Delete</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>    
                      <div className="popup" id="shareFolder" style={{'display': 'none', 'position': 'fixed', 'width':'250px', 'height': '150px','border':'5px solid blue', 'margin-left':'-155px', 'margin-top':'-110px', 'top': '50%', 'left':'50%', 'padding':'30px'}} ref="shareFolder">
                        <input type="text" style={{'display': 'none'}} ref="fileId"/>
                        <input type="text"  ref="sharefield"/>
                        <br />
                        <table>
                          <tr>
                            <td>
                              <a href="#">copylink</a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input id="sharewindowclose" type="Button" value="Share" onClick={this.handleShare}/>
                            </td>
                            <td>
                              <input id = "close" type="Button" value="Close" onClick={this.handleClose}/>
                            </td>
                          </tr>
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
    console.log("this is store in allfiles");
    //console.log(store1);
    //console.log("iam in mapstatetoprops all files");
    const {files} = store1;
    console.log("this is reducer2 " + JSON.stringify(files));
    //console.log("this is reducer1 " + JSON.stringify(data));
    const fileArr = files.files;
    const path = files.presentpath
    
  console.log("this is path in mapstate" + path);
    //console.log("this is path in mapstate" + username);
  return {fileArr, path};
}

function mapDispatchToProps(dispatch) {
  console.log("Iam in maptoDispatch");
   return {
       getAllFiles : (x, y) => dispatch(getAllFiles(x, y)),
       downloadFile: (x,y) => dispatch(downloadFile(x,y))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllFiles);    // Learn 'Currying' in functional programming
