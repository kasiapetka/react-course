import React, {Component} from 'react'
import classes from "./Posts.module.css";
import Post from "../../../components/Post/Post";
import axios from "axios";
import {Link, Route} from "react-router-dom";
import FullPost from "../FullPost/FullPost";

class Posts extends Component {
    state = {
        posts: [],
    };

    componentDidMount() {

        axios.get('/posts').then(
            response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({
                    posts: updatedPosts
                });
                console.log(this.state.posts)
            }
        ).catch(error => {

        })
    }


    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/posts/' + id})
    };

    render() {
        const posts = this.state.posts.map(post => {
                return (//<Link to={'/'+post.id}
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}/>)
                // </Link>)
            }
        );
        return (
            <React.Fragment>
                <section className={classes.Posts}>
                    {posts}
                </section>
                <Route path={this.props.match.url +"/:id"} exact component={FullPost}/>
            </React.Fragment>
        )
    }
}

export default Posts;