import React, {Component} from "react";

//Async component is used when you want to reach for the code of
//some components only if they are really needed, for ex if you log in
//as student you will never render admin components so the code is not
//needed

const asyncComponent = (importComponent) => {
    return class extends Component {

        state = {
            component: null
        };

        componentDidMount() {
            importComponent()
                .then(component => {
                    this.setState({component: component.default});
                });
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props}/> : null;
        }
    }
};

export default asyncComponent;