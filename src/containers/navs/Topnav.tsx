import { Navbar, Container, Nav } from 'react-bootstrap';
import Logo from '../../assets/image/raven-logo.svg';
import { shallowEqual, useSelector } from 'react-redux';
import { ELECTION_TYPE } from '../../constants/constant';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from "../../api/service/auth";

const TopNav = () => {
	const electionDataState: IElection = useSelector(
		(state: ElectionAction) => state.electionData,
		shallowEqual
	);
	console.log("election selected data",electionDataState.titleName)
	const navigate = useNavigate();
	const homeNavigate = () => {
		navigate('/app/level', { replace: true });
	}
	const logOut =async ()=>{
		try {
			const token = JSON.parse(localStorage.getItem("accessToken") || '')
			const response = await authService.logOutService(token);
	
			if (response.data.statusCode === 200) {
			  toast.success("Log Out Sucessfull", {theme: 'colored',pauseOnHover: false,})
			localStorage.clear();
  
			setTimeout(() => {
				navigate("/user/login", { replace: true });
			  }, 1000)
	
			} else {
				toast.error("Error In Logging Out", {theme: 'colored',pauseOnHover: false,})
			}
		  } catch (error) {
			setTimeout(() => {
				navigate("/user/login", { replace: true });
			  }, 1000)
			// toast.error("Error In Logging Out", {theme: 'colored',pauseOnHover: false,})
		  }
	}
	return (
		<>
			<Navbar className='raven-nav'>
				<Container>
					<Navbar.Brand onClick={homeNavigate} className="cursor-pointer" >

						<img src={Logo} />

					</Navbar.Brand>
					<Nav className='m-auto'>
						<p className='raven-title'>
						{`${electionDataState.titleName === undefined ? "" :electionDataState.titleName } 
							${" "}
							${
								ELECTION_TYPE[
									+electionDataState.electionType !== 0
										? +electionDataState.electionType - 1
										: 0
								].name
							}${" "}`}
							election analysis
						</p>
					</Nav>
					<Nav className='ms-auto cursor-pointer'>
						<Nav.Link onClick={homeNavigate}  className='raven-nav-bar'>
							Home
						</Nav.Link>
						<Nav.Link onClick={logOut} className='raven-nav-bar' >Logout</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default TopNav;
