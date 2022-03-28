
export interface IResultKey {
    id : Number,
    name : String
}

export interface IResultPostData{   
    id : String | undefined ,
    budget : String | undefined,
    total_voter:String | undefined
}
export interface IResultDataItem {
    budget : number
    name : string
    population : number

	_id : string,
	total_voter : string,
}
export interface ILoginData {
    email : string
    password : string
}
export interface IFormData {
	votes: string,
	breathSpace: string,
	stateId: string,
	lgasId: string,
	wardsId: string,
	electionType: string,
	spendingOnStrongHolds: string,
	spendingOnWeekHolds: string,
	totalVotes:string,
	spreadNeed: string,
	budget: string,
	allocationTypeStrong: boolean,
	allocationTypeLga: boolean,
	electionName?: string;
}
export interface IData {
	name: string;
	_id: string;
	turnoutPrediction: string;
	strongHold: boolean;
	budgetPerHead: string;
}
export interface IPropsPredictionItem {
	data: IData;
	handleChange: any;
	ind: number;
	levels: string[][];
	type: String,
	stateData: IElection;
}
export interface IStateData {
	_id: string;
	name: string;
	index: number;
	state: string;
	lga: string;
	ward: string;

	turnoutPrediction: string
	strongHold: boolean;
	budgetPerHead: string;
}
export interface IResult {
	_id: string;
	name: string;
	voters_turnout_percent: string | number;
	total_voter:string | number;
	per_head: string | number;
	strong: boolean;
	spread:string | number;
}
export interface IPresidentialResult {
	name: IResult[];
	budget: number;
}
export interface IDashboardItem {
	_id: string;
	name: string;
	total_voter: number;
	required_voters: number;
	budget: number;
}
export interface IDashboardData {
	budget: number;
	name: string;
	per_head: string;
	required_voters: number
	spread: number;
	total_voter: number;
	voters_turnout_percent: string;
	_id: string;
}

export interface IDashboardResult {
	amount_array : IDashboardData[];
	total_budget : number;
	type : string;
}