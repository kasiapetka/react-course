import React,{Component} from 'react'
import classes from './Person.css'
import Auxiliary from "../../../hoc/Auxiliary";

class Person extends Component {

    render() {
        return (
            //You can use aux component to wrap many elements and not return them as an array
            //You can use either Auxiliary component or React.Fragment it does the same
            <React.Fragment>
            <div className={classes.Person}>
                <p onClick={this.props.click}>I am {this.props.name} I am {this.props.age}</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name}/>
            </div>
            </React.Fragment>
        )
    }
}

export default Person