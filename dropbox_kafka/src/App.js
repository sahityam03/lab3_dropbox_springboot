import React, {Component} from 'react';
import './App.css';

// import HomePage from "./components/HomePage";
// import NewHomePage from "./components/NewHomePage";
import { Router, Route } from 'react-router-dom';
import {hasHistory} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import SignInPage from "./components/SignInPage";
import Newpage from "./components/Newpage";
import HomePage from "./components/HomePage";
import { history } from './helpers1/history1';
import SignUpPage from "./components/SignUpPage";
import EnterAboutYou from "./components/EnterAboutYou";
import AboutPage from "./components/AboutPage";
import FilesPage from "./components/FilesPage";
import Deletedfiles from "./components/Deletedfiles";

// import HomePage from "./components/HomePage";

    class App extends Component {
        render() {
            return (
              <div className="App">
                    {/*<HomePage/>*/}
                    {/*<NewHomePage/>*/}
                <Router history={history}>
                        <div>
                                <Route exact path="/" component={SignInPage} />
                                <Route exact path="/HomePage" component={HomePage} />
                                <Route path="/Newpage" component={Newpage} />
                                <Route path="/SignUpPage" component={SignUpPage} />
                                <Route path="/EnterAboutYou" component={EnterAboutYou} />
                                <Route path="/AboutPage" component={AboutPage} />
                                <Route path="/FilesPage" component={FilesPage} />
                                <Route path="/Deletedfiles" component={Deletedfiles} />

                        </div>
                     </Router>           
                    
                </div>
                
                    
            );
        }
    }

    export default App;

