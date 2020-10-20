import React from "react";
import "../App.css";
import styled from "styled-components";
import {BackendSimResponse} from "./Backend";
import SimulationResults from "./SimulationResults";

interface Props {
}

interface State {
    changeChoice: boolean,
    numberOfSimulations: number,
    simulationResult?: BackendSimResponse,
    error?: any,
}

const Title = styled.h1`
  margin: 0.5em;
  padding: 0.5em;
  font-size: 5em; 
`;

const InputWrap = styled.div`
  margin: 1em;
  display: flex;
  justify-content: space-around;
  padding: 1em;
  align-items: baseline;
  font-size: 20px;
`;

const Input = styled.input`
  max-width: 100%;
  text-align: center;
  font-size: 20px;
  padding: 0.2em;
  margin: 0.2em;
  color: black;
  background: transparent;
  border-radius: 10px;
`;

const Source = styled.div`
  max-width: 100%;
  text-align: center;
  font-size: 1em;
  padding: 0.2em;
  margin: 0.2em;
`;

const StyledButton = styled.button`
  cursor: ${({disabled}) => (disabled ? "not-allowed" : "pointer")};
  border: 5px;
  appearance: none;
  border-radius: 10px;
  height: 75px;
  width: 250px;
  font-size: 1.5rem;
  text-align: center;
  background: pink;
  color: black;
  transition: 0.25s ease;
`;

class Main extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            changeChoice: true,
            numberOfSimulations: 0,
        };

        this.handleChoiceChange = this.handleChoiceChange.bind(this);
        this.handleSimulationInputChange = this.handleSimulationInputChange.bind(this);
        this.onStartSimulation = this.onStartSimulation.bind(this);
    }

    handleChoiceChange(event: { target: any; }) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            ...this.state,
            changeChoice: value,
        });
    }

    handleSimulationInputChange(event: { target: any; }) {
        const target = event.target;
        const value: number = target.value;

        this.setState({
            ...this.state,
            numberOfSimulations: value,
        });
    }

    onStartSimulation(e: React.FormEvent): boolean {
        e.preventDefault()

        fetch("http://localhost:5001/simulate?numberOfSimulations=" +
            this.state.numberOfSimulations +
            "&changeChoice=" +
            this.state.changeChoice
        )
            .then(res => res.json())
            .then((result: BackendSimResponse) => {
                    this.setState({
                        ...this.state,
                        simulationResult: result,
                    });
                },
                (error: any) => {
                    this.setState({
                        simulationResult: undefined,
                        error: error
                    });
                },
            )
        return false;
    }

    render() {
        return <div className="App">
            <form onSubmit={this.onStartSimulation}>
                <Title>Monty Hall Paradox</Title>
                <InputWrap>
                    <div>
                        Write number of simulations:
                        <Input
                            type="text"
                            name="numberOfSimulations"
                            value={this.state.numberOfSimulations}
                            onChange={this.handleSimulationInputChange}/>
                    </div>
                    <div>
                        Change the door choice:
                        <Input
                            type="checkbox"
                            name="changeChoice"
                            checked={this.state.changeChoice}
                            onChange={this.handleChoiceChange}/>
                    </div>
                    <Source>
                        Source:
                        <a target="_blank"
                           rel="noopener noreferrer"
                           href="https://en.wikipedia.org/wiki/Monty_Hall_problem">
                            Monty Hall problem in Wiki</a>
                    </Source>
                </InputWrap>

                <StyledButton type="submit"
                              value="Start simulation">
                    Start simulation
                </StyledButton>
            </form>

            <SimulationResults simulationResult={this.state.simulationResult}/>
        </div>
    }
}

export default Main