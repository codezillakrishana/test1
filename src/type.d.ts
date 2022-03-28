interface IElection {
    totalVotes: string;
    spreadNeed: string;
    votes: string;
    budget: string;
    breathSpace: string;
    stateId: string;
    lgasId: string;
    wardsId: string;
    electionType: string;
    allocationTypeStrong: boolean;
    allocationTypeLga: boolean;
    spendingOnStrongHolds: string;
    spendingOnWeekHolds: string;
    electionName?: string;
    titleName?: string;
}

type ElectionAction = {
    type: string
    electionData: IElection
}

type DispatchType = (args: ElectionAction) => ElectionAction