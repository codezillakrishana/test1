export default {
    // BASE_URL: "http://192.168.1.42:3000/app/v1/", // dev
    BASE_URL: "http://54.171.195.79:3000/app/v1/", // local
    // BASE_URL: "http://localhost:3000/app/v1/", // staging
    // BASE_URL: "http://localhost:3000/app/v1/", // production
};

export const SELECT_ELECTION_TYPE = [
	{ id: 1, name: 'Presedential' },
	{ id: 2, name: 'Governor' },
	{ id: 3, name: 'LGA' },
	{ id: 4, name: 'WARD' },
	
];

export const ELECTION_TYPE = [
	{ id: 1, name: 'Presedential' },
	{ id: 2, name: 'Governor' },
	{ id: 3, name: 'LGA' },
	{ id: 4, name: 'WARD' },
	{ id: 5, name: 'PU\'S' },
];

export const ELECTION_NAME = {
	'Presedential': '1',
	'Governor': '2',
	'LGA': '3',
	'WARD': '4'
}
export const ELECTION_ID = {
	'1': 'Presedential',
	'2': 'Governor',
	'3': 'LGA',
	'4': 'WARD'
}

export const color = {  
    violet : "#3730A3",
    ripeMango :"#FEBF2D",
    yellow :"ffff00",

}
