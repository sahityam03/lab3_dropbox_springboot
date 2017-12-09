import {SIGNIN_SUCCESS, SIGNIN_FAILURE, FILEUPLOAD_SUCCESS, ALLFILE_SUCCESS, RECENTFILE_SUCCESS, DELETEDFILE_SUCCESS, STARFILE_SUCCESS, SHAREFILE_SUCCESS} from "../actions/index";
import * as API from '../api/API';
import { Route, withRouter } from 'react-router-dom';
//import {createBrowserHistory} from 'history';
import Newpage from "../components/Newpage"; 
//export const history = createBrowserHistory();


// https://github.com/reactjs/react-redux/blob/d5bf492ee35ad1be8ffd5fa6be689cd74df3b41e/src/components/createConnect.js#L91
const initialState = {
          presentpath : 'http://localhost:8080/users_records'
        //fileid: '',
       // filename: '',
        //filetype: '',
        //message: ''
};


export const files = (state = initialState, action) => {


    switch (action.type) {
        case ALLFILE_SUCCESS :
        console.log("files retrieved and adding to state");
        console.log( action.file);
        var currState = state;
        
        //history.push('/Newpage');
           return {
               ...state,
               "files" : action.file,
               presentpath : action.file[0].filepath
           };

        case RECENTFILE_SUCCESS :
        console.log("files retrieved and adding to state");
        console.log( action.file);
        var currState = state;
        
        //history.push('/Newpage');
           return {
               ...state,
               "recentfiles" : action.file
           };

      case DELETEDFILE_SUCCESS :
        console.log("files retrieved and adding to state");
        console.log( action.file);
        var currState = state;
        
        //history.push('/Newpage');
           return {
               ...state,
               "deletedfiles" : action.file
           };

      case STARFILE_SUCCESS :
        console.log("files retrieved and adding to state");
        console.log( action.file);
        var currState = state;
        
          return {
               ...state,
               "starfiles" : action.file
           };

      case SHAREFILE_SUCCESS :
        console.log("files retrieved and adding to state in sharefile");
        console.log( action.file);
        var currState = state;
        
          return {
               ...state,
               "sharedfiles" : action.file
           };

      

        default :
            return state;

    }
};

//export default file;
//export default orders;




