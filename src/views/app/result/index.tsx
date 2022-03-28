import { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import 'react-circular-progressbar/dist/styles.css';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import electionTypeService from '../../../api/service/electionService';
import { ELECTION_ID, ELECTION_NAME, ELECTION_TYPE } from '../../../constants/constant';
import { IResultDataItem, IResultKey, IResultPostData } from '../../../constants/interface';
import eyeViewIcon from "../../../assets/icons/eyeViewIcon.svg"
import { toast } from 'react-toastify';

const Result = () => {

	const [resultData, setResultData] = useState([]);
	const { _id, type, budget, total_voter } = useParams();
	const [title, setTitle] = useState<String>('')
	const navigate = useNavigate();
	const navigateTo = (title: String | undefined, id: string, budget: number, totalVoters: string) => {
		navigate(`/app/result/${title}/${id}/${budget}/${totalVoters}`);
		getResultData()
		
	  }
	const electionDataState: IElection = useSelector(
		(state: ElectionAction) => state.electionData,
		shallowEqual
	);
	const titleFun = () => {
		const ElectionType = ELECTION_TYPE;
		ElectionType.map((key: IResultKey, ind) => {

			if (key.name === type) {
				setTitle(ElectionType[ind + 1].name)
			}
		})
	}
	const handelNavigate = (item)=>{
		navigateTo(title, item._id, item.budget, item.total_voter)
	}
	const getResultData = async () => {

		const postData: IResultPostData = {
			id:
				electionDataState.electionType === ELECTION_NAME['Governor'] ?
					electionDataState.stateId : electionDataState.electionType === ELECTION_NAME['LGA'] ?
						electionDataState.lgasId : electionDataState.electionType === ELECTION_NAME['WARD'] ?
							electionDataState.wardsId : _id,

			budget: budget,
			total_voter: total_voter,
		};
		if (type === ELECTION_ID['2'] || type === ELECTION_ID['1']) {
			try {
				const response = await electionTypeService.postLgasData(postData);
				setResultData(response.data.data.lga_array);
			} catch (error) {
				console.error('getResultData error ==> ', error)
			}
		} else if (type === ELECTION_ID['3']) {
			try {
				const response = await electionTypeService.postWardData(postData);
				setResultData(response.data.data.ward_array);
			} catch (error) {
				console.error('getResultData error ==> ', error)
			}
		} else if (type === ELECTION_ID['4']) {
			try {
				const response = await electionTypeService.postPusData(postData);
				setResultData(response.data.data.pu_array);
			} catch (error) {
				console.error('getResultData error ==> ', error)
			}
		} else { console.log("end of conditions") }

	}

	useEffect(() => {
		window.scrollTo(0, 0)
		getResultData();
		titleFun()
	}, []);

	return (
		<>
			<section className='mt-5'>
				<Container>
					<div className='graph-card mt-5'>
						<div className='table-responsive border-radius-inherit'>
							<table className='table mb-0 raven-table table-borderless'>
								<thead>
									<tr>
										<th>{title}</th>
										<th>Population</th>
										<th>Budget</th>
										<th>Action</th>

									</tr>
								</thead>
								<tbody>
									{console.log("tabledata",resultData)}
									{
										resultData && resultData.map((item: IResultDataItem, ind: number) => (
											<tr key={ind + 1}>
												<td>{item.name}</td>
												<td>{item.total_voter}</td>
												<td>₦ {item.budget.toFixed(2)}</td>
												<td>
													<a className="cursor-pointer" onClick={() => {
														 handelNavigate(item)
													}}>
														<img src={eyeViewIcon} />
													</a>
												</td>

											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>

					<Row className='pt-5'>
						<Col>
							<div className='graph-card p-4 '>
								<h2 className='raven-label fw-bold'>Factors to consider</h2>
								<Row>
									<Col md={6}>
										<ul className='ps-3 mt-3 mb-0'>
											<li className='raven-input-title'>
												Party A’s candidate will affect votes in x LGA
											</li>
										</ul>
									</Col>
									<Col md={6}>
										<ul className='ps-3 mt-3 mb-0'>
											<li className='raven-input-title'>
												New electrical law will increase voter turout
											</li>
										</ul>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>

					<p className='raven-input-title py-4 fs-18 text-center'>
						Powered by Artificial Intelligence{' '}
					</p>
				</Container>
			</section>
		</>
	);
};

export default Result;
