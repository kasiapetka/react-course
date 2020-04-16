import React, { Component } from 'react';

import classes from './FullPost.module.css';
import axios from 'axios'

class FullPost extends Component {

    state= {
        post: null,
        error: false
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.id) {
            if (!this.state.post || (this.state.post && this.state.post.id !== this.props.id)) {
                axios.get('/posts/' + this.props.id).then(
                    response => {
                        this.setState({
                            post: response.data
                        });
                    }
                ).catch(error =>{
                    if(!this.state.error)
                    this.setState({
                        error:true
                    })
                })
            }
        }
    }

    postDeleteHandler=()=>{
        axios.delete('/posts/' + this.props.id).then(
            response => {
                console.log(response)
            }
        ).catch(error =>{
            this.setState({
                error:true
            })
        })
    };


    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        if(this.props.id)
            post = <p style={{textAlign: 'center'}}>Loading...</p>;

        if(this.state.post)
        post = (
            <div className={classes.FullPost}>
                <h1>{this.state.post.title}</h1>
                <p>{this.state.post.body}</p>
                <div className={classes.Edit}>
                    <button onClick={this.postDeleteHandler} className={classes.Delete}>Delete</button>
                </div>
            </div>

        );

        if(this.state.error)
            post = (
                <div className={classes.FullPost}>
                    <h1>Error</h1>
                </div>

            );

        return post;
    }
}

export default FullPost;