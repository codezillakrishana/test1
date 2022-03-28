import React, { ChangeEvent, useEffect, useState} from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import 'react-circular-progressbar/dist/styles.css';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import electionTypeService from '../../../api/service/electionService';
import PredictionItem from '../../../components/PredictionItem';
import {
	ELECTION_ID,
	ELECTION_NAME,
	ELECTION_TYPE,
	
} from '../../../constants/constant';
import { IPresidentialResult, IStateData } from '../../../constants/interface';
const Presidential = () => {
	const navigate = useNavigate();
	const [states, setStates] = useState<IStateData[]>([]);
	const [lgas, setLgas] = useState<IStateData[]>([]);
	const [wards, setWards] = useState<IStateData[]>([]);
	const [pollingunits, setPollingunits] = useState<IStateData[]>([]);

	const levels: string[][] = [[], [], [], [], []];

	const electionDataState: IElection = useSelector(
		(state: ElectionAction) => state.electionData,
		shallowEqual
	);
	const selectState = async (value:string) => {
		try {
			const response = await electionTypeService.getLgasByState(value);
			setLgas(response.data.data.reference_id);
		} catch (error) {
			console.error('selectState error =>', error);
		}
	};
	const selectLgas = async (value: string) => {
		try {
			const response = await electionTypeService.getWardsByLga(value);
			setWards(response.data.data.reference_id);
		} catch (error) {
			console.error('selectLgas error ==> ', error);
		}
	};
	const selectWards = async (value: string) => {
		const response = await electionTypeService.getPollingUnitsByWardId(value);
		setPollingunits(response.data.data);
	};
	const getStates = async () => {
		try {
			const response = await electionTypeService.getAllStates();
			setStates(response.data.data.states_object);
		} catch (error) {
			console.error(error);
		}
	};
	const handleChange = (field: string, event:  ChangeEvent<HTMLInputElement>, index: number) => {
		if (electionDataState.electionType === ELECTION_NAME['Presedential']) {
			const tmpState: IStateData[] = [...states];
			if (field === 'strongHold') {
				tmpState[index][field] = !tmpState[index][field];
			}
			if (field === 'budgetPerHead' || field === 'turnoutPrediction') {
				tmpState[index][field] = event.target.value;
			}
			setStates(tmpState);
		}
		if (electionDataState.electionType === ELECTION_NAME['Governor']) {
			const tmpLgas: IStateData[] = [...lgas];
			if (field === 'strongHold') {
				tmpLgas[index][field] = !tmpLgas[index][field];
			}
			if (field === 'budgetPerHead' || field === 'turnoutPrediction') {
				tmpLgas[index][field] = event.target.value;
			}
			setLgas(tmpLgas);
		}
		if (electionDataState.electionType === ELECTION_NAME['LGA']) {
			const tmpWards: IStateData[] = [...wards];
			if (field === 'strongHold') {
				tmpWards[index][field] = !tmpWards[index][field];
			}
			if (field === 'budgetPerHead' || field === 'turnoutPrediction') {
				tmpWards[index][field] = event.target.value;
			}
			setWards(tmpWards);
		}
		if (electionDataState.electionType === ELECTION_NAME['WARD']) {
			const tmpPollingUnits: IStateData[] = [...pollingunits];
			if (field === 'strongHold') {
				tmpPollingUnits[index][field] = !tmpPollingUnits[index][field];
			}
			if (field === 'budgetPerHead' || field === 'turnoutPrediction') {
				tmpPollingUnits[index][field] = event.target.value;
			}
			setPollingunits(tmpPollingUnits);
		}
	};

	const handelSubmit = async () => {
		const result: IPresidentialResult = { name: [], budget:0};
		if (electionDataState.electionType === ELECTION_NAME['Presedential']) {
			states.map((item: IStateData) => {
				return result.name.push({
					_id: item._id,
					name: item.name,
					voters_turnout_percent: item.turnoutPrediction,
					total_voter: electionDataState.totalVotes,
					per_head:
						item.strongHold && !electionDataState.allocationTypeLga
							? electionDataState.spendingOnWeekHolds
							: !item.strongHold && !electionDataState.allocationTypeLga
							? electionDataState.spendingOnStrongHolds
							: item.budgetPerHead,
					strong: item.strongHold,
					spread: electionDataState.spreadNeed,
				});
			});
		}
		if (electionDataState.electionType === ELECTION_NAME['Governor']) {
			lgas.map((item: IStateData) => {
				return result.name.push({
					_id: item._id,
					name: item.name,
					voters_turnout_percent: item.turnoutPrediction,
					total_voter: electionDataState.totalVotes,
					per_head:
						item.strongHold && !electionDataState.allocationTypeLga
							? electionDataState.spendingOnWeekHolds
							: !item.strongHold && !electionDataState.allocationTypeLga
							? electionDataState.spendingOnStrongHolds
							: item.budgetPerHead,
					strong: item.strongHold,
					spread: electionDataState.spreadNeed,
				});
			});
		}
		if (electionDataState.electionType === ELECTION_NAME['LGA']) {
			wards.map((item: IStateData) => {
				return result.name.push({
					_id: item._id,
					name: item.name,
					voters_turnout_percent: item.turnoutPrediction,
					total_voter: electionDataState.totalVotes,
					per_head:
						item.strongHold && !electionDataState.allocationTypeLga
							? electionDataState.spendingOnWeekHolds
							: !item.strongHold && !electionDataState.allocationTypeLga
							? electionDataState.spendingOnStrongHolds
							: item.budgetPerHead,
					strong: item.strongHold,
					spread: electionDataState.spreadNeed,
				});
			});
		}
		if (electionDataState.electionType === ELECTION_NAME['WARD']) {
			pollingunits.map((item: IStateData) => {
				return result.name.push({
					_id: item._id,
					name: item.name,
					voters_turnout_percent: item.turnoutPrediction,
					total_voter: electionDataState.totalVotes,
					per_head:
						item.strongHold && !electionDataState.allocationTypeLga
							? electionDataState.spendingOnWeekHolds
							: !item.strongHold && !electionDataState.allocationTypeLga
							? electionDataState.spendingOnStrongHolds
							: item.budgetPerHead,
					strong: item.strongHold,
					spread: electionDataState.spreadNeed,
				});
			});
		}
		result.budget = +electionDataState.budget;
		try {
			const response = await electionTypeService.postSubmitPredictionData(
				result
			);
			if (electionDataState.electionType === ELECTION_NAME['Presedential']) {
				response.data.data.type = ELECTION_ID['1'];
			}
			if (electionDataState.electionType === ELECTION_NAME['Governor']) {
				response.data.data.type = ELECTION_ID['2'];
			}
			if (electionDataState.electionType === ELECTION_NAME['LGA']) {
				response.data.data.type = ELECTION_ID['3'];
			}
			if (electionDataState.electionType === ELECTION_NAME['WARD']) {
				response.data.data.type = ELECTION_ID['4'];
			}
			localStorage.setItem('result', JSON.stringify(response.data.data));
			navigate('/app/result');
		} catch (error) {
			console.error('handleSubmit error ==>', error);
		}
	};

	useEffect(() => {
		try {
			if (
				electionDataState.electionType === ELECTION_NAME['Presedential'] ||
				electionDataState.electionType === ELECTION_NAME['Governor']
			) {
				getStates();
			}
			electionDataState.stateId && selectState(electionDataState.stateId);
			electionDataState.lgasId && selectLgas(electionDataState.lgasId);
			electionDataState.wardsId && selectWards(electionDataState.wardsId);
		} catch (error) {
			console.error(error);
		}
	}, [electionDataState]);

	const renderPredictionItems = () => {
		let list: JSX.Element[] = [];
		if (electionDataState.electionType === ELECTION_NAME['Presedential']) {
			list = states.map((item: IStateData, index: number) => (
				<PredictionItem
					key={item._id}
					data={item}
					ind={index}
					stateData={electionDataState}
					handleChange={handleChange}
					levels={levels}
					type={'States'}
				/>
			));
		} else if (electionDataState.electionType === ELECTION_NAME['Governor']) {
			list = lgas.map((item: IStateData, index: number) => (
				<PredictionItem
					key={item._id}
					data={item}
					ind={index}
					stateData={electionDataState}
					handleChange={handleChange}
					levels={levels}
					type={'Lgas'}
				/>
			));
		} else if (electionDataState.electionType === ELECTION_NAME['LGA']) {
			list = wards.map((item: IStateData, index: number) => (
				<PredictionItem
					key={item._id}
					data={item}
					ind={index}
					stateData={electionDataState}
					handleChange={handleChange}
					levels={levels}
					type={'Wards'}
				/>
			));
		} else if (electionDataState.electionType === ELECTION_NAME['WARD']) {
			list = pollingunits.map((item: IStateData, index: number) => (
				<PredictionItem
					key={item._id}
					data={item}
					ind={index}
					stateData={electionDataState}
					handleChange={handleChange}
					levels={levels}
					type={'Polling Units'}
				/>
			));
		}
		return list;
	};

	return (
		<>
			<section>
				<Container className='mt-4'>
					<Row>
						<Col>
							<h2 className='raven-heading'>
								{
									ELECTION_TYPE[
										+electionDataState.electionType !== 0
											? +electionDataState.electionType - 1
											: 0
									].name
								}
							</h2>
							<p className='raven-label mt-2'>
								Voting Budget In publishing and graphic design, Lorem ipsum is
								aVoting Budget In publishing placeholder text commonly.
							</p>
						</Col>
					</Row>
					<hr className='divider-line my-4'></hr>
					{renderPredictionItems()}
					<hr className='divider-line' />
					<Row className='py-4'>
						<Col>
							<div className='text-end px-4'>
								<Button
									style={{ padding: '7px 60px' }}
									className='raven-button'
									onClick={handelSubmit}
								>
									Get Result
								</Button>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
};

export default Presidential;
