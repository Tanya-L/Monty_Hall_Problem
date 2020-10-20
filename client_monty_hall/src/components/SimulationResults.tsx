import React from "react";
import "../App.css";
import styled from "styled-components";
import {BackendSimGame, BackendSimResponse} from "./Backend";

interface State {
}

const ResultWrap = styled.div`
  margin: 2em;
  display: block;   
  justify-content: space-around;
  flex-direction: row;
`;

const Strong = styled.strong`
  color: red;
  font-size: 1rem;
`;

interface Props {
    simulationResult?: BackendSimResponse
}

class SimulationResults extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    renderGameRow(game: BackendSimGame) {
        // Using 0.1.2 indices, using +1 to show 1.2.3
        return <ResultWrap>
            <div>The prize was in door <strong>{game.prize + 1}.</strong>
                The player chose <strong>{game.step1 + 1}.</strong>
                The presenter opened door <strong>{game.step2 + 1}.</strong>
                {game.step3 !== game.step1
                    ? "The player changed their choice to " + (game.step3 + 1) + "."
                    : " "}</div>
            <div><strong>{game.result ? "The player wins! ✅" : "The player loses ❌"}</strong></div>
        </ResultWrap>
    }

    statistics(r: BackendSimResponse): number {
        const wins = r.allGames.reduce(
            (accum: number, value: BackendSimGame) => accum + (value.result ? 1 : 0),
            0
        )
        // Return wins percent or 0 if no games
        return r.allGames.length === 0 ? 0 : (wins * 100 / r.allGames.length)
    }

    render() {
        const r = this.props.simulationResult
        if (!r) {
            return <h2>No simulation results</h2>
        }

        return <div>
            <h2>Result of {r.numberOfSimulations} simulations:</h2>
            <h3>The player choose to {r.changeChoice ? "" : <Strong>NOT</Strong>
            } change the door choice every time.</h3>
            <h3>The player won {this.statistics(r)}% games.</h3>

            <ResultWrap>
                {this.props.simulationResult?.allGames.map(this.renderGameRow)}
            </ResultWrap>
        </div>
    }
}

export default SimulationResults