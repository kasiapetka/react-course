import React,{Component} from 'react'
import classes from './Person.css'
import WithClass from "../../../hoc/WithClass";
import PropTypes from 'prop-types'

import AuthContext from '../../../context/authContext'

class Person extends Component {

    constructor(props) {
        super(props);
        //defining a ref in a constructor and assigning a reference to an input
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        //this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.auth);
    }

    render() {
        return (
            //You can use aux component to wrap many elements and not return them as an array
            //You can use either Auxiliary component or React.Fragment it does the same
            //ref react property, only works in class components it creates a class property, you can use in your class
            <WithClass classes={classes.Person}>

                    {
                        this.context.auth
                            ?
                            <p>Authenticated</p>
                            :
                            <p>Please Authenticate</p>
                    }

                <p onClick={this.props.click}>I am {this.props.name} I am {this.props.age}</p>
                <p>{this.props.children}</p>
                 <input ref={this.inputElementRef}
                    //function
                    //ref={(inputEl)=>{this.inputElement = inputEl}}
                       type="text" onChange={this.props.changed}
                       value={this.props.name}/>
            </WithClass>
        )
    }
}

Person.propTypes={
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default Person