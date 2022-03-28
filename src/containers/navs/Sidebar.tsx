import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { ELECTION_NAME, ELECTION_TYPE, SELECT_ELECTION_TYPE} from '../../constants/constant';
import electionTypeService from '../../api/service/electionService';
import { addElection } from '../../store/actionCreators';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import infoIcon from "../../assets/icons/infoIcon.svg"
import nairaCurrency from "../../assets/icons/nairaCurrency.svg"
import { IFormData } from '../../constants/interface';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
function Sidebar() {
	const navigate = useNavigate();
	const [electionType, setElectionType] = useState(0);

	const [states, setStates] = useState([]);
	const [lgas, setLgas] = useState([]);
	const [wards, setWards] = useState([]);
	const [pollingunits, setPollingunits] = useState([]);

	const [stateId, setStateId] = useState<String>('');
	const [lgasId, setLgasId] = useState<String>('');
	const [wardsId, setWardsId] = useState<String>('');

	const [formData, setFormData] = useState<IFormData>({
		totalVotes: '',
		spreadNeed: '',
		votes: '',
		budget: '',
		breathSpace: '',
		allocationTypeStrong: true,
		allocationTypeLga: false,
		stateId: '',
		lgasId: '',
		wardsId: '',
		electionType: '',
		spendingOnStrongHolds: '',
		spendingOnWeekHolds: '',
	});

	const electionDataState: IElection = useSelector(
		(state: ElectionAction) => state.electionData,
		shallowEqual
	);

	const dispatch = useDispatch();

	const selectType = async (value: string | number) => {
		setElectionType(+value);
		getStates();
	};
	const selectState = async (value: String) => {
		setStateId(value);
		const response = await electionTypeService.getLgasByState(value);
		setLgas(response.data.data.reference_id);
	};
	const getStates = async () => {
		try {
			const response = await electionTypeService.getAllStates();
			setStates(response.data.data.states_object);
		} catch (error) {
			console.error(error);
		}
	};
	const selectLgas = async (value:String) => {
		setLgasId(value);
		const response = await electionTypeService.getWardsByLga(value);
		setWards(response.data.data.reference_id);
	};
	const selectWards = async (value: String) => {
		setWardsId(value);
		const response = await electionTypeService.getPollingUnitsByWardId(value);
		setPollingunits(response.data.data);
	};

	const showOutOf = () => {
		if (electionType === +ELECTION_NAME['Governor'] && stateId) return `${lgas.length} LGA`;
		if (electionType === +ELECTION_NAME['LGA'] && stateId && lgasId) return `${wards.length} Wards`;
		if (electionType === +ELECTION_NAME['WARD'] && stateId && lgasId && wardsId)
			return `${pollingunits.length} Pu's`;
		if (electionType === +ELECTION_NAME['Presedential']) return `${states.length} States`;
	};

	useEffect(() => {
		try {
			electionDataState.electionType &&
				selectType(electionDataState.electionType);
			electionDataState.stateId && selectState(electionDataState.stateId);
			electionDataState.lgasId && selectLgas(electionDataState.lgasId);
			electionDataState.wardsId && selectWards(electionDataState.wardsId);
			electionDataState && setFormData(electionDataState);
		} catch (error) {
			console.error(error);
		}
	}, [electionDataState]);
	const changeFormHandler = (field: string, value: string | number | boolean, titleName?: string) => {
		let tmpFormData: IFormData = { ...formData };
		if (field === 'allocationTypeStrong' || field === 'allocationTypeLga') {
			tmpFormData['allocationTypeStrong'] =
				!tmpFormData['allocationTypeStrong'];
			tmpFormData['allocationTypeLga'] = !tmpFormData['allocationTypeLga'];
		} else if (
			(field === 'totalVotes' || field === 'spreadNeed') &&
			+value <= 100 &&
			+value >= 0 && typeof value === "string"
		) {
			tmpFormData[field] = value;
		} else if (field === 'votes') {
			if (electionType === +ELECTION_NAME['Presedential'] && +value <= states.length && typeof value === "string")
				tmpFormData[field] = value;
			if (electionType === +ELECTION_NAME['Governor'] && +value <= lgas.length && typeof value === "string")
				tmpFormData[field] = value;
			if (electionType === +ELECTION_NAME['LGA'] && +value <= wards.length && typeof value === "string")
				tmpFormData[field] = value;
			if (electionType === +ELECTION_NAME['WARD'] && +value <= pollingunits.length && typeof value === "string")
				tmpFormData[field] = value;
		}
		if (field === 'breathSpace') {
			if (+value >= 0 && +value <= 20 && typeof value === "string") {
				tmpFormData[field] = value;
			}
		} else if (field === 'breathSpace') {
			if (+value >= 0 && +value <= 20 && typeof value === "string") {
				tmpFormData['breathSpace'] = value;
			}
		} else if (field === 'electionType' ||
			field === 'stateId' ||
			field === 'lgasId' ||
			field === 'wardsId' ||
			field === 'spendingOnStrongHolds' ||
			field === 'spendingOnWeekHolds' ||
			field === 'budget') {
			tmpFormData[field] = typeof value === "string" ? value : String(value);
		} else if (field === 'budget' && typeof value === "string") {
			tmpFormData[field] = value;
		}
		if(field === 'stateId' ||
		field === 'lgasId' ||
		field === 'wardsId'
		){
			if(tmpFormData.electionType === '2'){
			
				let data: any = states.find((item: any) => item._id === value);
				tmpFormData['titleName'] = data.name;
			}else if (tmpFormData.electionType === '3'){
				let data: any = lgas.find((item: any) => item._id === value);
				tmpFormData['titleName'] = data.name;

			}else if (tmpFormData.electionType === '4'){
				let data: any = wards.find((item: any) => item._id === value);
				tmpFormData['titleName'] = data.name;

			}
		}
		if (formData.allocationTypeLga !== false) {
			navigate('/app/data', { replace: true });
		}
		if (formData.allocationTypeStrong !== true) {
			navigate('/app/data', { replace: true });
		}
		if (formData.electionType === "0") {
			toast.error("please fill all the fields", { theme: 'colored', pauseOnHover: false, });
			return false
		}
		
		if (electionType == 1 &&
			formData.breathSpace !== "" &&
			formData.budget !== "" &&
			formData.spendingOnStrongHolds !== "" &&
			formData.spendingOnWeekHolds !== "" &&
			formData.spreadNeed !== "" &&
			formData.totalVotes !== "" &&
			// formData.lgasId !== "" &&
			// formData.stateId !== "" &&
			// formData.wardsId !== "" &&
			formData.votes !== ""
		) {
			navigate('/app/data', { replace: true });
		} else if (electionType == 2 &&
			formData.breathSpace !== "" &&
			formData.budget !== "" &&
			formData.spendingOnStrongHolds !== "" &&
			formData.spendingOnWeekHolds !== "" &&
			formData.spreadNeed !== "" &&
			formData.totalVotes !== "" &&
			// formData.lgasId !== "" &&
			formData.stateId !== "" &&
			// formData.wardsId !== "" &&
			formData.votes !== ""
		) {
			navigate('/app/data', { replace: true });
		} else if (electionType == 3 &&
			formData.breathSpace !== "" &&
			formData.budget !== "" &&
			formData.spendingOnStrongHolds !== "" &&
			formData.spendingOnWeekHolds !== "" &&
			formData.spreadNeed !== "" &&
			formData.totalVotes !== "" &&
			formData.lgasId !== "" &&
			formData.stateId !== "" &&
			// formData.wardsId !== "" &&
			formData.votes !== ""
		) {
			navigate('/app/data', { replace: true });
		} else if (electionType == 4 &&
			formData.breathSpace !== "" &&
			formData.budget !== "" &&
			formData.spendingOnStrongHolds !== "" &&
			formData.spendingOnWeekHolds !== "" &&
			formData.spreadNeed !== "" &&
			formData.totalVotes !== "" &&
			formData.lgasId !== "" &&
			formData.stateId !== "" &&
			formData.wardsId !== "" &&
			formData.votes !== ""
		) {
			navigate('/app/data', { replace: true });
		} 
		else {
			toast.error("please fill all the fields", { theme: 'colored', pauseOnHover: false, })
		}
		console.table(tmpFormData);
		dispatch(addElection(tmpFormData));
	};

	return (
		<div className='side-nav pb-4'>
			<div className='px-5'>
				<Row className='mt-4'>
					<Col>
						<Form.Group controlId='formGridState'>
							<Form.Label className='raven-heading'>Election Type</Form.Label>
							<Form.Select
								className='ravem-dropdown-1 shadow-none mt-2'
								onChange={(e) =>
									changeFormHandler('electionType', e.target.value)
								}
								value={electionType || ''}
							>
								<option value='0'>Select type</option>
								{SELECT_ELECTION_TYPE.map(({ id, name }, index) => (
									<option value={id || ''} key={id + name}>
										{name}
									</option>
								))}
							</Form.Select>
						</Form.Group>
					</Col>
				</Row>
				{(electionType === +ELECTION_NAME['Governor'] || electionType === +ELECTION_NAME['LGA'] || electionType === +ELECTION_NAME['WARD']) &&
					states && (
						<Row className='mt-4'>
							<Col>
								<Form.Group controlId='formGridState'>
									<Form.Label className='raven-heading'>
										Select State
									</Form.Label>
									<Form.Select
										className='ravem-dropdown-1 shadow-none mt-2'
										onChange={(e) =>
											changeFormHandler('stateId', e.target.value)
										}
										value={formData.stateId || ''}
									>
										<option value='0'>Select State</option>
										{states.map(({ _id, name }) => (
											<option value={_id || ''} key={_id + name}>
												{name}
											</option>
										))}
									</Form.Select>
								</Form.Group>
							</Col>
						</Row>
					)}
				{(electionType === +ELECTION_NAME['LGA'] || electionType === +ELECTION_NAME['WARD']) && lgas && stateId && (
					<Row className='mt-4'>
						<Col>
							<Form.Group controlId='formGridState'>
								<Form.Label className='raven-heading'>Select LGA</Form.Label>
								<Form.Select
									className='ravem-dropdown-1 shadow-none mt-2'
									onChange={(e) => changeFormHandler('lgasId', e.target.value)}
									value={formData.lgasId || ''}
								>
									<option value='0'>Select Lga</option>
									{lgas.map(({ _id, name }, index) => (
										<option value={_id || ''} key={_id + name}>
											{name}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>
				)}
				{electionType === +ELECTION_NAME['WARD'] && wards && lgasId && (
					<Row className='mt-4'>
						<Col>
							<Form.Group controlId='formGridState'>
								<Form.Label className='raven-heading'>Select Ward</Form.Label>
								<Form.Select
									className='ravem-dropdown-1 shadow-none mt-2'
									onChange={(e) => changeFormHandler('wardsId', e.target.value)}
									value={formData.wardsId || ''}
								>
									<option value='0'>Select Ward</option>
									{wards.map(({ _id, name }, index) => (
										<option value={_id || ''} key={_id + name}>
											{name}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>
				)}
			</div>
			<hr className='divider-line'></hr>
			<div className='px-5 pt-3'>
				<h2 className='raven-heading'>Votes Requirement :</h2>
			</div>
			<hr className='divider-line'></hr>
			<div className='px-5'>
				<Row className='mt-4'>
					<Col>
						<Form.Group>
							<Form.Label className='raven-label'>
								Total Votes (%){' '}
								<span className='ms-2'>
									<img src={infoIcon}/>
								</span>{' '}
							</Form.Label>
							<Form.Control
								className='raven-input shadow-none mt-1'
								type='number'
								min='1'
								max='100'
								value={formData.totalVotes || ''}
								onChange={(e) =>
									changeFormHandler('totalVotes', e.target.value)
								}
							/>
						</Form.Group>
					</Col>
				</Row>
			</div>
			<hr className='divider-line'></hr>
			<div className='px-5'>
				<Row className='mt-2'>
					<Col md={12}>
						<p className='raven-label'>
							Spread
							<span className='ms-2'>
							<img src={infoIcon}/>
							</span>
						</p>
						<div className='d-flex align-items-center'>
							<div className='me-2'>
								<p className='raven-input-title'>Need</p>
							</div>
							<div className='me-2 w-25'>
								<Form.Control
									className='raven-input shadow-none px-2 mt-1'
									type='number'
									min='1'
									max='100'
									value={formData.spreadNeed || ''}
									onChange={(e) =>
										changeFormHandler('spreadNeed', e.target.value)
									}
								/>
							</div>
							<div className='me-2'>
								<p className='raven-input-title'>% of votes</p>
							</div>
						</div>
					</Col>
				</Row>
				<Row className='mt-2'>
					<Col md={12}>
						<div className='d-flex align-items-center'>
							<div className='me-2'>
								<p className='raven-input-title'>In </p>
							</div>
							<div className='me-2 w-25'>
								<Form.Control
									className='raven-input shadow-none px-2  mt-1'
									type='number'
									min='1'
									max={
										states.length
											? lgas.length
												? lgas.length
												: wards.length
											: 0
									}
									value={formData.votes || ''}
									onChange={(e) => changeFormHandler('votes', e.target.value)}
								/>
							</div>
							<div className='me-2'>
								<p className='raven-input-title'>out of {showOutOf()}</p>
							</div>
						</div>
					</Col>
				</Row>
				<p className='eg-label mt-2'>
					eg {formData.spreadNeed}% in {formData.votes}/
				
					{electionType === +ELECTION_NAME['Governor'] && stateId
						? lgas.length + 'LGA'
						: electionType === +ELECTION_NAME['LGA'] && stateId && lgasId
							? wards.length + 'Wards'
							: electionType === +ELECTION_NAME['WARD'] && stateId && lgasId && wardsId
								? pollingunits.length + "Pu's"
								: electionType === +ELECTION_NAME['Presedential']
									? states.length + 'States'
									: ''}
				</p>
			</div>
			<hr className='divider-line' />

			<div className='px-5'>
				<Row>
					<Col md={12}>
						<Form.Group controlId='formBasicPassword'>
							<Form.Label className='raven-label'>
								Breathing Space (0-20%){' '}
								<span className='ms-2'>
								<img src={infoIcon}/>
								</span>{' '}
							</Form.Label>
							<Form.Control
								className='raven-input shadow-none mt-1'
								type='number'
								value={formData.breathSpace || ''}
								onChange={(e) =>
									changeFormHandler('breathSpace', e.target.value)
								}
							/>
						</Form.Group>
					</Col>
					<Col md={12}>
						<Form.Group controlId='formBasicPassword'>
							<Form.Label className='raven-label'>Budget</Form.Label>
							<Form.Control
								className='raven-input shadow-none mt-1'
								type='number'
								value={formData.budget || ''}
								onChange={(e) => changeFormHandler('budget', e.target.value)}
							/>
						</Form.Group>
					</Col>
				</Row>
			</div>
			<hr className='divider-line'></hr>
			<div className='px-5 pt-3'>
				<h2 className='raven-heading'>Resource Allocation :</h2>
			</div>
			<hr className='divider-line'></hr>
			<div className='px-5'>
				<Row className='mt-4'>
					<Col md={12}>
						<Form.Group>
							<Form.Label className='raven-label'>
								Allcation Type
								<span className='ms-2'>
								<img src={infoIcon}/>
								</span>{' '}
							</Form.Label>
						</Form.Group>
						<Form.Check
							className='radio-label mt-1 custom-radio'
							type={'radio'}
							id={`Strong Hold v/s Rest Hold`}
							label={`Strong Hold v/s Rest Hold`}
							name={'LGA-1'}
							checked={formData.allocationTypeStrong}
							onChange={(e) =>
								changeFormHandler('allocationTypeStrong', e.target.checked)
							}
						/>
						<Form.Check
							className='radio-label mt-1 custom-radio'
							type={'radio'}
							label={
								electionType === +ELECTION_NAME['Governor'] && stateId
									? `LGA`
									: electionType === +ELECTION_NAME['LGA'] && stateId && lgasId
										? `Wards`
										: electionType === +ELECTION_NAME['WARD'] && stateId && lgasId && wardsId
											? `Pu's`
											: electionType === +ELECTION_NAME['Presedential']
												? `States`
												: ''
							}
							id={`disabled-default-radio`}
							name={'LGA-1'}
							checked={formData.allocationTypeLga}
							onChange={(e) =>
								changeFormHandler('allocationTypeLga', e.target.checked)
							}
						/>
					</Col>
				</Row>
			</div>
			{formData.allocationTypeStrong && (
				<div>
					<hr className='divider-line'></hr>
					<div className='px-5'>
						<Row className=''>
							<Col>
								<Form.Group>
									<Form.Label className='raven-label'>
										{/* Strong hold-Budget per head */}
										Spending On Strong Holds
										<span className='ms-2'>
										<img src={infoIcon}/>
										</span>{' '}
									</Form.Label>

									<div className='d-flex position-relative'>
										<Form.Control
											className='raven-input ps-5  shadow-none mt-1'
											type='number'
											value={formData.spendingOnStrongHolds || ''}
											onChange={(e) =>
												changeFormHandler(
													'spendingOnStrongHolds',
													e.target.value
												)
											}
										/>
										<div className='position-absolute money-icon-1'>
										<img src={nairaCurrency}/>
										</div>
									</div>
								</Form.Group>
							</Col>
						</Row>
					</div>
					<hr className='divider-line'></hr>
					<div className='px-5'>
						<Row className=''>
							<Col>
								<Form.Group>
									<Form.Label className='raven-label'>
										{/* Rest - Budget per head */}
										Spending On Weak Holds
										<span className='ms-2'>
										<img src={infoIcon}/>
										</span>{' '}
									</Form.Label>

									<div className='d-flex position-relative'>
										<Form.Control
											className='raven-input ps-5  shadow-none mt-1'
											type='number'
											value={formData.spendingOnWeekHolds || ''}
											onChange={(e) =>
												changeFormHandler('spendingOnWeekHolds', e.target.value)
											}
										/>
										<div className='position-absolute money-icon-1'>
										<img src={nairaCurrency}/>
										</div>
									</div>
								</Form.Group>
							</Col>
						</Row>
					</div>
				</div>
			)}
			<div className='px-5 pt-5'>
				<div className='mt-5'>
					<Button className='raven-button'>Download As PDF</Button>
				</div>
				<div className='mt-3'>
					<Button className='raven-button'>Download As CSV</Button>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
