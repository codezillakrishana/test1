import { ELECTION_NAME, ELECTION_TYPE, SELECT_ELECTION_TYPE } from '../../../constants/constant';
import { ChangeEvent, useEffect, useState } from 'react';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';
import 'react-circular-progressbar/dist/styles.css';
import electionTypeService from '../../../api/service/electionService';
import { addElection } from '../../../store/actionCreators';
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import infoIcon from "../../../assets/icons/infoIcon.svg"
import nairaCurrency from "../../../assets/icons/nairaCurrency.svg"
import { IFormData } from '../../../constants/interface';
import { toast } from 'react-toastify';

const ElectionType = () => {
	const navigate = useNavigate();
	const [electionType, setElectionType] = useState(0);
	const [states, setStates] = useState([]);
	const [lgas, setLgas] = useState([]);
	const [wards, setWards] = useState([]);
	const [pollingunits, setPollingunits] = useState([]);
	const [stateId, setStateId] = useState('');
	const [lgasId, setLgasId] = useState('');
	const [wardsId, setWardsId] = useState('');
	const dispatch: Dispatch<any> = useDispatch()
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

	const selectType = async (event: ChangeEvent<HTMLSelectElement>) => {
		setElectionType(+event.target.value);
		getStates();
	};
	const selectState = async (event: ChangeEvent<HTMLSelectElement>) => {
		setStateId(event.target.value);
		const response = await electionTypeService.getLgasByState(
			event.target.value
		);
		setLgas(response.data.data.reference_id);
	};
	const selectLgas = async (value: string) => {
		setLgasId(value);
		const response = await electionTypeService.getWardsByLga(
			value
		);
		setWards(response.data.data.reference_id);
	};
	const selectWards = async (value: string) => {
		setWardsId(value);
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

	const showOutOf = () => {
		if (electionType === +ELECTION_NAME['Governor'] && stateId) return `${lgas.length} LGA`;
		if (electionType === +ELECTION_NAME['LGA'] && stateId && lgasId) return `${wards.length} Wards`;
		if (electionType === +ELECTION_NAME['WARD'] && stateId && lgasId && wardsId) return `${pollingunits.length} Pu's`;
		if (electionType === +ELECTION_NAME['Presedential']) return `${states.length} States`;
	};

	const setFormValue = (type: string, inputValue: string) => {
		let tempValues = { ...formData };
		if (
			(type === 'totalVotes' || type === 'spreadNeed') &&
			+inputValue <= 100 &&
			+inputValue >= 0
		) {
			tempValues[type] = inputValue;
		}
		if (type === 'votes') {
			if (electionType === +ELECTION_NAME['Presedential'] && +inputValue <= states.length) tempValues[type] = inputValue;
			if (electionType === +ELECTION_NAME['Governor'] && +inputValue <= lgas.length) tempValues[type] = inputValue;
			if (electionType === +ELECTION_NAME['LGA'] && +inputValue <= wards.length) tempValues[type] = inputValue;
			if (electionType === +ELECTION_NAME['WARD'] && +inputValue <= pollingunits.length) tempValues[type] = inputValue;
		}
		if (type === 'breathSpace') {
			if (+inputValue >= 0 && +inputValue <= 20) {
				tempValues[type] = inputValue;
			}
		}
		if (type === 'allocationTypeStrong' || type === 'allocationTypeLga') {
			tempValues.allocationTypeStrong = !tempValues.allocationTypeStrong;
			tempValues.allocationTypeLga = !tempValues.allocationTypeLga;
		}
		if (type === 'spendingOnStrongHolds' || type === 'spendingOnWeekHolds') {
			tempValues[type] = inputValue;
		}
		if (type === 'budget') {
			tempValues[type] = inputValue;
		}
		setFormData(tempValues);
	};
	function handleNext() {
		console.log("=============>", formData)

		formData.stateId = stateId;
		formData.lgasId = lgasId;
		formData.wardsId = wardsId;
		formData.electionType = electionType + '';
		try {
			dispatch(addElection(formData));
		} catch (error) {
			console.error('error ==> ', error);
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

	}
	console.log("election type ===>", electionType)
	useEffect(() => { }, []);

	return (
		<Container>
			{/* top dropdown section start */}
			<Row className='mt-4'>
				<Col md={3}>
					<Form.Group controlId='formGridState'>
						<Form.Label className='raven-heading'>Election Type</Form.Label>
						<Form.Select
							className='ravem-dropdown shadow-none mt-2'
							onChange={(e) => selectType(e)}
							value={electionType}
						>
							<option value='0'>Select type</option>
							{SELECT_ELECTION_TYPE.map(({ id, name }, index) => (
								<option value={id} key={id + name}>
									{name}
								</option>
							))}
						</Form.Select>
					</Form.Group>
				</Col>
				{(electionType === +ELECTION_NAME['Governor'] || electionType === +ELECTION_NAME['LGA'] || electionType === +ELECTION_NAME['WARD']) &&
					states && (
						<Col md={3}>
							<Form.Group controlId='formGridState'>
								<Form.Label className='raven-heading'>Select State</Form.Label>
								<Form.Select
									className='ravem-dropdown shadow-none mt-2'
									onChange={(e) => selectState(e)}
								>
									<option value='0'>Select State</option>
									{states.map(({ _id, name }) => (
										<option value={_id} key={_id + name}>
											{name}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						</Col>
					)}
				{(electionType === +ELECTION_NAME['LGA'] || electionType === +ELECTION_NAME['WARD']) &&
					lgas &&
					stateId && (
						<Col md={3}>
							<Form.Group controlId='formGridState'>
								<Form.Label className='raven-heading'>Select LGA</Form.Label>
								<Form.Select
									className='ravem-dropdown shadow-none mt-2'
									onChange={(e) => selectLgas(e.target.value)}
								>
									<option value='0'>Select Lga</option>
									{lgas.map(({ _id, name }, index) => (
										<option value={_id} key={_id + name}>
											{name}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						</Col>
					)}
				{(electionType === +ELECTION_NAME['WARD']) &&
					wards &&
					lgasId && (
						<Col md={3}>
							<Form.Group controlId='formGridState'>
								<Form.Label className='raven-heading'>Select Ward</Form.Label>
								<Form.Select
									className='ravem-dropdown shadow-none mt-2'
									onChange={(e) => selectWards(e.target.value)}
								>
									<option value='0'>Select Ward</option>
									{wards.map(({ _id, name }, index) => (
										<option value={_id} key={_id + name}>
											{name}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						</Col>
					)}
			</Row>

			{/* card section start */}
			<div className='raven-card mt-4 mb-5 py-4 raven-heading'>
				<div className='px-4'>
					<h2 className='raven-heading'>Votes Requirement :</h2>
					<Row className='mt-4'>
						<Col md={3}>
							<Form.Group>
								<Form.Label className='raven-label'>
									Total Votes (%)
									<span className='ms-2'>
										<img src={infoIcon} />
									</span>{' '}
								</Form.Label>
								<Form.Control
									className='raven-input shadow-none mt-1'
									type='number'
									min='1'
									max='100'
									value={formData.totalVotes}
									onChange={(e) => setFormValue('totalVotes', e.target.value)}
								/>
							</Form.Group>
						</Col>
					</Row>
				</div>

				<hr className='divider-line' />

				<div className='px-4'>
					<Row className='mt-2'>
						<Col md={12}>
							<p className='raven-label'>
								Spread
								<span className='ms-2'>
									<img src={infoIcon} />
								</span>
							</p>
							<div className='d-flex align-items-center'>
								<div className='me-2'>
									<p className='raven-input-title'>Need</p>
								</div>
								<div className='me-2 w-5'>
									<Form.Control
										className='raven-input shadow-none mt-1'
										type='number'
										min='1'
										max='100'
										value={formData.spreadNeed}
										onChange={(e) => setFormValue('spreadNeed', e.target.value)}
									/>
								</div>
								<div className='me-2'>
									<p className='raven-input-title'>% of votes in </p>
								</div>
								<div className='me-2 w-5'>
									<Form.Control
										className='raven-input shadow-none  mt-1'
										type='number'
										min='1'
										max={
											states.length
												? lgas.length
													? lgas.length
													: wards.length
												: 0
										}
										value={formData.votes}
										onChange={(e) => setFormValue('votes', e.target.value)}
									/>
								</div>
								<div className='me-2'>
									<p className='raven-input-title'>out of {showOutOf()}</p>
								</div>
							</div>
						</Col>
					</Row>
				</div>
				<hr className='divider-line' />

				<div className='px-4'>
					<Row>
						<Col md={3}>
							<Form.Group controlId='formBasicPassword'>
								<Form.Label className='raven-label'>
									Breathing Space (0-20%){' '}
									<span className='ms-2'>
										<img src={infoIcon} />
									</span>{' '}
								</Form.Label>
								<Form.Control
									className='raven-input shadow-none mt-1'
									type='number'
									value={formData.breathSpace}
									onChange={(e) => setFormValue('breathSpace', e.target.value)}
								/>
							</Form.Group>
						</Col>
						<Col md={3}>
							<Form.Group controlId='formBasicPassword'>
								<Form.Label className='raven-label'>
									Budget
								</Form.Label>
								<Form.Control
									className='raven-input shadow-none mt-1'
									type='number'
									value={formData.budget}
									onChange={(e) => setFormValue('budget', e.target.value)}
								/>
							</Form.Group>
						</Col>
					</Row>
				</div>
				<hr className='divider-line' />
				<div className='px-4 pt-2'>
					<h2 className='raven-heading'>Resource Allocation :</h2>
					<Row className='mt-4'>
						<Col md={12}>
							<Form.Group>
								<Form.Label className='raven-label'>
									Allcation Type
									<span className='ms-2'>
										<img src={infoIcon} />
									</span>{' '}
								</Form.Label>
							</Form.Group>
							<div className='d-flex mt-3'>
								<div className='me-4'>
									<Form.Check
										className='radio-label custom-radio'
										type={'radio'}
										id={`Strong Hold v/s Rest Hold`}
										label={`Strong Hold v/s Rest Hold`}
										name={'LGA'}
										checked={formData.allocationTypeStrong}
										onChange={(e) =>
											setFormValue('allocationTypeStrong', e.target.value)
										}
									/>
								</div>
								<div>
									<Form.Check
										className='radio-label custom-radio'
										type={'radio'}
										label={(electionType === +ELECTION_NAME['Governor'] && stateId) ? `LGA` : (electionType === +ELECTION_NAME['LGA'] && stateId && lgasId) ? `Wards` : (electionType === +ELECTION_NAME['WARD'] && stateId && lgasId && wardsId) ? `Pu's` : electionType === +ELECTION_NAME['Presedential'] ? `States` : ''}
										id={`disabled-default-radio`}
										name={'LGA'}
										checked={formData.allocationTypeLga}
										onChange={(e) =>
											setFormValue('allocationTypeLga', e.target.value)
										}
									/>
								</div>
							</div>
						</Col>
					</Row>
				</div>
				{formData.allocationTypeStrong && (
					<div>
						<hr className='divider-line' />
						<div className='px-4'>
							<Row className=''>
								<Col md={5}>
									<Form.Group>
										<Form.Label className='raven-label'>
											Spending On Strong Holds
											<span className='ms-2'>
												<img src={infoIcon} />
											</span>{' '}
										</Form.Label>
										<div className='d-flex align-items-center'>
											<div className='d-flex position-relative'>
												<Form.Control
													className='raven-input ps-5 me-2 shadow-none mt-1'
													type='number'
													value={formData.spendingOnStrongHolds}
													onChange={(e) =>
														setFormValue('spendingOnStrongHolds', e.target.value)
													}
												/>
												<div className='position-absolute money-icon'>
													<img src={nairaCurrency} />
												</div>
											</div>
											<div>
												<p className='mb-0 radio-label'>Per Head</p>
											</div>
										</div>
									</Form.Group>
								</Col>
							</Row>
						</div>
						<hr className='divider-line' />
						<div className='px-4'>
							<Row className=''>
								<Col md={5}>
									<Form.Group>
										<Form.Label className='raven-label'>
											Spending On Weak Holds
											<span className='ms-2'>
												<img src={infoIcon} />

											</span>{' '}
										</Form.Label>
										<div className='d-flex align-items-center'>
											<div className='d-flex position-relative'>
												<Form.Control
													className='raven-input ps-5 me-2  shadow-none mt-1'
													type='number'
													value={formData.spendingOnWeekHolds}
													onChange={(e) =>
														setFormValue('spendingOnWeekHolds', e.target.value)
													}
												/>
												<div className='position-absolute money-icon'>
													<img src={nairaCurrency} />

												</div>
											</div>
											<div>
												<p className='mb-0 radio-label'>Per Head</p>
											</div>
										</div>
									</Form.Group>
								</Col>
							</Row>
						</div>
					</div>
				)}

				<hr className='divider-line' />
				<Row>
					<Col>
						<div className='text-end px-4'>
							<Button
								style={{ padding: '7px 60px' }}
								className='raven-button'
								onClick={handleNext}
							>
								Next Step
							</Button>
						</div>
					</Col>
				</Row>
			</div>
		</Container>
	);
};

export default ElectionType;
