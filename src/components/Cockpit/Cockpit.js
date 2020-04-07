import React, {useEffect, useRef} from 'react'
import styleClasses from "./Cockpit.css";

const Cockpit = (props) => {
    let btnClass;
    const classes =[];

    const buttonRef = useRef(null);

    useEffect(()=>{
        //in second argument you specify when method should be triggered
        //here when there is a change in second person
        //if you pass an empty array this will be executed only when component
        //is rendered and unmounted
        console.log("[Cockpit] useEffect");

        const timer = setTimeout(()=>{
            alert('Saved to the cloud')
        },1000);

        //i trigger this in useEffect after JSX code is executed
        buttonRef.current.click();

        //If you return some function it runs after the first render cycle
        //but before the main useEffect, you can do some cleanup here
        return ()=>{
            //when the component unmounts we clear timeout so there is no alert
            clearTimeout(timer);
            console.log("[Cockpit] useEffect - cleanup work")
        }
    },[]);


    useEffect(()=>{
        console.log("[Cockpit] second useEffect")

        //with no second argument useEffect will run for every update cycle
        //so clean up runs before useEffect everytime component is updated
        return ()=>{
            console.log("[Cockpit] useEffect - cleanup work second useEffect")
        }
    })

    if(props.personsLength <=2){
        classes.push(styleClasses.red);
    }
    if(props.personsLength <=1){
        classes.push(styleClasses.bold);
    }

    if(props.showPersons){
        btnClass=styleClasses.Red;
    }

    return(
        <div className={styleClasses.Cockpit}>
        <h1>React App</h1>
        <h3>{props.title}</h3>
        <p className={classes.join(' ')}>paragraph</p>
        <button ref={buttonRef} className={btnClass}
            onClick={props.toggle}>Toggle Persons</button>
        </div>
    );
}

//React.memo - stores the snapshot of this component and only if its input changes
//it will rerender it
export default React.memo(Cockpit)