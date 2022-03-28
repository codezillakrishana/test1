import { useState } from "react";
import { Form } from "react-bootstrap";
import { toast} from "react-toastify";
import authService from "../../api/service/auth";
import Logo from '../../assets/image/raven-logo.svg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [field, setField] = useState({ userEmail: "", userPass: "" })
  const [isEmailValid, setIsEmailValid] = useState(false)
  const navigate = useNavigate();

  const userData = {
    email: field.userEmail,
    password: field.userPass

  }

  const submitUserLoginData = async () => {
    // if (isEmailValid === true) {
      try {
        const response = await authService.loginService(userData);

        if (response.data.statusCode === 200) {
          toast.success("Login Sucessfull", {theme: 'colored',pauseOnHover: false,})
          localStorage.setItem('accessToken', JSON.stringify(response.data.data.accessToken))
          localStorage.setItem('refreshToken', JSON.stringify(response.data.data.refreshToken))
          setTimeout(() => { 
            // aasd
            navigate("/app/level", { replace: true });
          }, 1000)

        } else {
          toast.error("Failed To Login" , {theme: 'colored',pauseOnHover: false,})
        }
      } catch (error) {
        toast.error("Failed To Login" , {theme: 'colored',pauseOnHover: false,})
      }
    // }
    // else {
    //   toast.error("invalid email", {theme: 'colored',pauseOnHover: false,})

    // }
  }
  // const emailValidate = (userEmail: string) => {
  //   var iemail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //   if (userEmail.match(iemail)) {
  //     setIsEmailValid(true)
  //     setField({ ...field, userEmail: userEmail });
  //     return true;
  //   } else {
  //     setIsEmailValid(false)
      
  //     return false;
  //   }
  // }
  return (
    <>
      <div className="login-page mt-5" >
        <div className="container" id="container">
          <div className="form-container sign-in-container">
            <div className="form">
              <h1 className="mb-4">Sign in</h1>
              <Form.Control className="raven-input shadow-none mt-1" type="email" placeholder="Email"
                onChange={(e) => { setField({ ...field, userEmail: e.target.value })}}
                value={field.userEmail} />
              <Form.Control className="raven-input shadow-none mt-2" type="password" placeholder="Password"
                onChange={(e) => {
                  setField({ ...field, userPass: e.target.value });
                }}
                value={field.userPass} />
              <a >Forgot your password?</a>
              <button onClick={submitUserLoginData}>
                Sign In
              </button>
            </div>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 >Welcome Back!</h1>
              </div>
              <div className="overlay-panel overlay-right">
                <img className="mb-4" src={Logo} />
                <h2>Admin</h2>
                {/* <p className="mt-2 mb-0">Hi, Lorem Ipsum has been the industry's </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

