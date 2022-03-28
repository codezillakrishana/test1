import { Row, Col, Form } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import nairaCurrency from "../assets/icons/nairaCurrency.svg"
import { IPropsPredictionItem } from '../constants/interface';

const PredictionItem = ({ data, handleChange, ind, levels, type, stateData }: IPropsPredictionItem) => {
	const electionDataState: IElection = useSelector(
		(state: ElectionAction) => state.electionData,
		shallowEqual
	);
	return (
		<div className='raven-card px-3 mb-3 py-4'>
			<Row>
				<Col md='1'>
					<p className='raven-label fw-bold'>{type}</p>
					<p className='radio-label mt-1'>{data?.name}</p>
				</Col>
				<Col md='2'>
					<p className='raven-label fw-bold'>Strong Hold</p>
					<Form className='mt-1'>
						<Form.Check
							className='raven-switch'
							type='switch'
							id='custom-switch'
							onChange={(e) => handleChange('strongHold', e, ind)}
						/>
					</Form>
				</Col>
				<Col md='2'>
					<p className='raven-label fw-bold'>Level of Confidence </p>
					<div className='d-flex mt-1 justify-content-between align-items-center'>
						<div>
							<p className='eg-label fs-12 navy-blue-light'>Low</p>
						</div>
						<div>
							<p className='eg-label fs-12 navy-blue-light'>High</p>
						</div>
					</div>
					<div className='rating'>
						{levels.map((item: string[], index: number) => (
							<>
								<input
									key={index + 1}
									type='radio'
									name={`rating-${data._id}${index + 1}`}
									id={`rating-${data._id}${index + 1}`}
									onChange={(e) => handleChange('levelOfConfidence', e)}
								/>
								<label htmlFor={`rating-${data._id}${index + 1}`} />
							</>
						))}
					</div>
				</Col>
				<Col>
					<Form.Group>
						<Form.Label className='raven-label fw-bold'>
							Turnout Prediction (%)
						</Form.Label>

						<Form.Control
							className='raven-input shadow-none mt-1'
							type='number'
							value={data.turnoutPrediction || ''}
							onChange={(e) => handleChange('turnoutPrediction', e, ind)}
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group>
						<Form.Label className='raven-label'>Budget per head</Form.Label>

						<div className='d-flex position-relative'>
							<Form.Control
								className='raven-input ps-5  shadow-none mt-1'
								type='number'
								disabled={electionDataState.allocationTypeStrong}
								onChange={(e) => handleChange('budgetPerHead', e, ind)}
								value={data.strongHold && !electionDataState.allocationTypeLga ? stateData.spendingOnStrongHolds : !data.strongHold && !electionDataState.allocationTypeLga ? stateData.spendingOnWeekHolds : data.budgetPerHead || ''}
							/>
							<div className='position-absolute money-icon-1'>
								<img src={nairaCurrency} />
							</div>
						</div>
					</Form.Group>
				</Col>
			</Row>
		</div>
	);
};

export default PredictionItem