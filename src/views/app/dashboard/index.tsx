import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from "react-router";
import AllocationLogo from '../../../assets/image/chart.svg';
import VottingPattern from "../../../assets/image/graph.svg";
import { IDashboardItem, IDashboardResult } from "../../../constants/interface";
import eyeViewIcon from "../../../assets/icons/eyeViewIcon.svg"
import people from "../../../assets/icons/people.svg"
import nairaCurrency from "../../../assets/icons/nairaCurrency.svg"
import { toast } from "react-toastify";
import { shallowEqual, useSelector } from 'react-redux';


const Dashboard = () => {
  const percentage = 50;
  const [resultData, setResultData] = useState<IDashboardResult>({ type: '', amount_array: [], total_budget: 0 });
  const navigate = useNavigate();
  const navigateTo = (type: string, _id: string, budget: number, totalVoters: number) => {
    navigate(`/app/result/${type}/${_id}/${budget}/${totalVoters}`);
  }
  const electionDataState: IElection = useSelector(
    (state: ElectionAction) => state.electionData,
    shallowEqual
  );

  const handelNavigate = (item) => {
    !item.budget && toast.error("Some Data Missing", { theme: 'colored', pauseOnHover: false })
    console.clear();
    console.log(item);
    console.log(resultData?.amount_array);
    console.log(resultData.type, item._id, item.budget, item.total_voter);
    navigateTo(resultData.type, item._id, item.budget, item.total_voter)
  }

  useEffect(() => {
    let data: IDashboardResult = JSON.parse(localStorage.getItem('result') || '');
    setResultData(data);
    window.scrollTo(0, 0)
    console.log(electionDataState);

  }, [])

  return (
    <>
      <section className="mt-5">
        <Container>
          {/* card section detail */}
          <Row className="mt-3">
            <Col md={'4'}>
              <div className="graph-card p-4">
                <h2 className="raven-heading text-center">Predicted Voter Turnout</h2>
                <div className="mt-4 position-relative circular-progresss-bar" style={{ width: 150, height: 150, margin: 'auto', }} >
                  <CircularProgressbar value={percentage || ''} text={`${percentage}%`} styles={buildStyles({ pathColor: '#2E4269', textColor: '#FA6E57', textSize: '22px', })} />
                  <div className="position-absolute people-icon">
                    <img src={people} />
                  </div>
                </div>
              </div>
            </Col>

            <Col md={'4'}>
              <div className="graph-card p-4">
                <h2 className="raven-heading text-center">Allocation</h2>
                <div className="mt-4 text-center">
                  <img src={AllocationLogo} />
                </div>
              </div>
            </Col>

            <Col md={'4'}>
              <div className="graph-card px-5 py-4">
                <h2 className="raven-heading text-center">Resource Allocation</h2>
                <div className="mt-5 d-flex align-items-center">
                  <div className="me-2">
                    <img src={nairaCurrency} />
                  </div>
                  <div>
                    <p className="price-rate">{electionDataState.spendingOnStrongHolds} <span className="sub-price-rate">Per head strong hold</span></p>
                  </div>
                </div>
                <div className="mt-2 d-flex align-items-center">
                <div className="me-2">
                  <img src={nairaCurrency} />
                </div>
                <div>
                  <p className="price-rate">{electionDataState.spendingOnWeekHolds} <span className="sub-price-rate">Per head Weak Holds</span></p>
                </div>
                </div>
                <div className="mt-2 d-flex align-items-center">
                  <div className="me-2">
                    <img src={nairaCurrency} />
                  </div>
                  <div>
                    <p className="price-rate">{resultData.total_budget}<span className="sub-price-rate"> in total</span></p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* graph section start */}
          <Row>
            <Col>
              <div className="graph-card p-2 mt-4">
                <h2 className="raven-heading text-center">Voting Pattern</h2>
                <div className="mt-4 text-center">
                  <img src={VottingPattern} />
                </div>
              </div>
            </Col>
          </Row>

          <div className="graph-card mt-5">
            <div className="table-responsive border-radius-inherit">
              <table className="table mb-0 raven-table table-borderless">
                <thead>
                  <tr>
                    <th>{resultData.type}</th>
                    <th>Registered Voters</th>
                    <th>Required Votes</th>
                    <th>Resources Allocation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {resultData?.amount_array.map((item: IDashboardItem, ind: number) => (
                    <tr key={ind + 1}>
                      <td>{item.name}</td>
                      <td>{item.total_voter === null ? 'N/A' : item.total_voter}</td>
                      <td>{item.required_voters === null ? "N/A" : item.required_voters}</td>
                      <td>{'\u20A6'} {item.budget === null ? "N/A " : item.budget.toFixed(2)}</td>
                      <td>
                        <a className="cursor-pointer" onClick={() => handelNavigate(item)}>
                          {console.log(item)}

                          <img src={eyeViewIcon} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Row className="pt-5">
            <Col>
              <div className="graph-card p-4 ">
                <h2 className="raven-label fw-bold">Factors to consider</h2>
                <Row>
                  <Col md={6}>
                    <ul className="ps-3 mt-3 mb-0">
                      <li className="raven-input-title">Party A’s candidate will affect votes in x LGA</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <ul className="ps-3 mt-3 mb-0">
                      <li className="raven-input-title">New electrical law will increase voter turout</li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <p className="raven-input-title py-4 fs-18 text-center">Powered by Artificial Intelligence </p>
        </Container>
      </section>
    </>
  );
}

export default Dashboard;
