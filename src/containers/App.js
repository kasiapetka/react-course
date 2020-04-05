import React, { Component } from 'react';
import styleClasses from './App.css';
import Persons from './../components/Persons/Persons';
import Cockpit from "../components/Cockpit/Cockpit";
import WithClass from "../hoc/WithClass";


class App extends Component {

    constructor(props) {
        super(props);
        console.log('[App] constructor')
        this.state = {
            persons: [
                {id: 'aaaa', name: 'Kasiula', age: '21'},
                {id: 'cccc', name: 'Mikus', age: '21'},
                {id: 'bbbb', name: 'Karolek', age: '22'},
            ],
            showPersons: false,
            showCocpit: true,
        };
    }

    static getDerivedStateFromProps(props, state) {
        //After constructor and after rendering, everytime before some action
        console.log('[App] getDerivedStateFromProps')
        return state;
    }

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

    deletePersonHandler = (personIndex) => {
        const persons = [...this.state.persons]
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
    }

    toggleCockpitHandler = () => {
        const aux = this.state.showCocpit;
        this.setState({
            showCocpit: !aux
        })
    }

    render() {
        console.log('[App] render')
        const showPersons = this.state.showPersons;
        const showCockpit = this.state.showCocpit;
        let persons;
        if (showPersons) {
            persons = (<div>
                <Persons persons={this.state.persons}
                         clicked={this.deletePersonHandler}
                         changed={this.onNameChangeHandler}/>
            </div>)

        }

        return (
            <WithClass classes={styleClasses.App}>
                <button onClick={this.toggleCockpitHandler}>Remove cockpit</button>
                {showCockpit
                    ?
                    <Cockpit toggle={this.togglePersonsHandler}
                             personsLength={this.state.persons.length}
                             showPersons={this.state.showPersons}
                             title={this.props.appTitle}/>
                    :
                    null}
                {persons}
            </WithClass>
        );
    }
}

export default App;
