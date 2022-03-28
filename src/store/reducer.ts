import * as actionTypes from "./actionTypes"

const initialState: ElectionAction = {
    electionData: {
        totalVotes: '',
        spreadNeed: '',
        votes: '',
        budget: '',
        breathSpace: '',
        stateId: '',
        lgasId: '',
        wardsId: '',
        electionType: '',
        allocationTypeStrong: true,
        allocationTypeLga: false,
        spendingOnStrongHolds: '',
        spendingOnWeekHolds: '',
        electionName: ''
    },
    type: ''
}
const reducer = (
    state: ElectionAction = initialState,
    action: ElectionAction
): ElectionAction => {
    switch (action.type) {
        case actionTypes.ADD_ELECTION_TYPE:
            return {
                ...state,
                electionData: action.electionData,
            }
        default:
            return state
    }

}

export default reducer