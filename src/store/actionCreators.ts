import * as actionTypes from "./actionTypes"

export function addElection(electionData: IElection) {
    const action: ElectionAction = {
        type: actionTypes.ADD_ELECTION_TYPE,
        electionData,
    }

    return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: ElectionAction) {
    return (dispatch: DispatchType) => {
        dispatch(action)
    }
}