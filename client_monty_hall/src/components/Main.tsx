import React from "react";
import "../App.css";
import styled from 'styled-components';

interface Props {

}

interface State {
    changeChoice: boolean,
    numberOfSimulations: number
}

class Main extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            changeChoice: true,
            numberOfSimulations: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event: { target: any; }) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            ...this.state,
            changeChoice: value,
        });
    }

    render() {
        return <div className="App">
            <form>
                <label>
                    Write number of simulations:
                    <input
                        type="text"
                        name="numberOfSimulations"/>
                </label>
                <label>
                    Change the door choice:
                    <input
                        type="checkbox"
                        name="changeChoice"
                        checked={this.state.changeChoice}
                        onChange={this.handleInputChange}/>
                </label>
                <input type="submit" value="Start simulation"/>
            </form>
        </div>
    }
}

export default Main