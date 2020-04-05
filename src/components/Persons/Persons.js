import React,{Component} from 'react'
import Person from "./Person/Person";

class Persons extends Component{


    // static getDerivedStateFromProps(props, state){
    //     console.log('get der state from props persons')
    //     return state;
    // }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('[Persons] shouldComponentUpdate')
        //we are not updating persons if the persons didnt change but for ex only cockpit
        if (nextProps.persons !== this.props.persons)
            return true;
        else
            return false;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        //When you want to save for ex scrolling position before updating the component
        console.log('[Persons] getSnapshotBeforeUpdate')
        return {message: "Snapshot"}
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //Right after component is rerendered
        console.log('[Persons] componentDidUpdate')
        console.log(snapshot)
    }

    componentWillUnmount() {
        //Right before component is unmounted - you can do some clean up work here
        console.log('[Persons] componentWillUnmount')
    }

    render() {
        console.log('[Persons] render')
        return(
        this.props.persons.map((person, index) => {
            return <Person
                click={() => this.props.clicked(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.props.changed(event, person.id)}/>
        }))
    }
}
export default Persons