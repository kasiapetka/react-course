import React,{Component} from 'react'
import classes from './PersonManager.module.css'
import Persons from "../../components/Persons/Persons";
import WithClass from "../../hoc/WithClass";
import Cockpit from "../../components/Cockpit/Cockpit";
import AuthContext from '../../context/authContext'

class PersonManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            persons: [
                {id: 'aaaa', name: 'Kasiula', age: 22},
                {id: 'cccc', name: 'Mikus', age: 21},
                {id: 'bbbb', name: 'Karolek', age: 22},
            ],
            showPersons: false,
            showCocpit: true,
            auth: false
        };
    }

    deletePersonHandler = (personIndex) => {
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons})
    };

    onNameChangeHandler = (event, id) => {
        const personId = this.state.persons.findIndex(p => {
            return p.id === id;
        });
        const person = {
            ...this.state.persons[personId]
        };

        person.name = event.target.value;
        const persons = [...this.state.persons];
        persons[personId] = person;

        this.setState({persons: persons})
    };

    togglePersonsHandler = () => {
        const aux = this.state.showPersons;
        this.setState({
            showPersons: !aux
        })
    };

    toggleCockpitHandler = () => {
        const aux = this.state.showCocpit;
        this.setState({
            showCocpit: !aux
        })
    };

    loginHandler = () => {
        this.setState({auth: true});
    };

    render() {
        const showPersons = this.state.showPersons;
        const showCockpit = this.state.showCocpit;
        let persons;
        if (showPersons) {
            persons = (<div>
                <Persons persons={this.state.persons}
                         clicked={this.deletePersonHandler}
                         changed={this.onNameChangeHandler}
                />
            </div>)

        }

        return (
            <WithClass classes={classes.PersonManager}>
                    <button onClick={this.toggleCockpitHandler}>Remove cockpit</button>

                    <AuthContext.Provider value={{auth: this.state.auth, login: this.loginHandler}}>
                        {showCockpit
                            ?
                            <Cockpit toggle={this.togglePersonsHandler}
                                     personsLength={this.state.persons.length}
                                     showPersons={this.state.showPersons}
                                     title={this.props.appTitle}/>
                            :
                            null}
                        {persons}
                    </AuthContext.Provider>
            </WithClass>
        );
    }
}

export default PersonManager;