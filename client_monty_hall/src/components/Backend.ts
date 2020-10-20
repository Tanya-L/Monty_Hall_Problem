export interface HttpResponse<T> extends Response {
    parsedBody?: T;
}

export interface BackendSimGame {
    prize: number, // where the prize was
    step1: number, // player chooses a door
    step2: number, // presenter removes a door without prize
    step3: number, // player chooses a door again
    result: boolean // whether player wins
}

export interface BackendSimResponse {
    numberOfSimulations: number,
    changeChoice: boolean,
    allGames: BackendSimGame[]
}
