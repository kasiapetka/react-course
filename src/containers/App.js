import React, {Component, Suspense} from 'react';
import styleClasses from './App.module.css';
import WithClass from "../hoc/WithClass";
import {BrowserRouter as Router} from "react-router-dom";
import PersonManager from "./PersonManager/PersonManager";
import {Route, NavLink, Switch, Redirect} from "react-router-dom";
import Posts from "./Blog/Posts/Posts";
// import NewPost from "./Blog/NewPost/NewPost";
import asyncComponent from "../hoc/AsyncComponent";

// const AsyncNewPost = asyncComponent(()=>{
//     return import("./Blog/NewPost/NewPost");
// });

const NewPosts = React.lazy(()=>import("./Blog/NewPost/NewPost"));


class App extends Component {

    constructor(props) {
        super(props);
        console.log('[App] constructor')
    }

    //
    // static getDerivedStateFromProps(props, state) {
    //     //After constructor and after rendering, everytime before some action
    //     console.log('[App] getDerivedStateFromProps')
    //     return state;
    // }

    componentDidMount() {
        //When component rendered
        console.log('[App] getDerivedStateFromProps')
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        //Before updating component, when returning false component wont update
        console.log('[App] shouldComponentUpdate')
        return true
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //Right after component updated
        console.log('[App] componentDidUpdate')
    }

    render() {
        console.log('[App] render');


        return (
            <WithClass classes={styleClasses.App}>
                <Router>
                    <header>
                        <nav>
                            <ul>
                                <li><NavLink to="/posts" exact
                                             activeStyle={{color: 'orange', textDecoration: 'underline'}}>Posts</NavLink>
                                </li>
                                <li><NavLink to={{
                                    pathname: '/newPost'
                                }} activeStyle={{color: 'orange'}}>New Post</NavLink></li>
                                <li><NavLink to="/persons" activeStyle={{color: 'orange'}}>Person Manager</NavLink></li>
                            </ul>
                        </nav>
                    </header>

                    <Switch>
                        <Route path="/persons" exact component={PersonManager}/>
                        <Route path="/newPost" exact render={()=><Suspense fallback={<div>Loading...</div>}>
                            <NewPosts/>
                        </Suspense>}
                        />
                        <Route path="/posts" component={Posts}/>
                        <Route render={()=><p>404 </p>}/>
                        {/*<Redirect from="/" to="/posts"/>*/}
                    </Switch>
                </Router>
            </WithClass>
        );
    }
}

export default App;
