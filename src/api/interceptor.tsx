import React, { useLayoutEffect, useState } from 'react'
import axios from "axios";
import constant from '../constants/constant';
import { createBrowserHistory } from "history";
import { SunspotLoader } from "react-awesome-loaders";
import { color  } from '../constants/constant';


const Interceptor = () => {
    const [isLoading, setIsLoading] = useState(false)
    const AUTH_TOKEN: any = localStorage.getItem("accessToken")
    axios.defaults.baseURL = constant.BASE_URL;
    axios.defaults.headers.common.Authorization = AUTH_TOKEN;

  const history = createBrowserHistory();
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });
  useLayoutEffect(() => history.listen(setState), [history]);

  axios.interceptors.request.use((config) => {

    if (!AUTH_TOKEN) {
      history.replace("/user/login");
      
    }
    setIsLoading(true)
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(
     (response) => {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
      return response;
    },
    (error)=> {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status == 401) {
            history.replace("/user/login");
            // window.location.reload()
          }
        }
      }
      return Promise.reject(error);
    }
  ); return (
    <>
    
      <div className='loaderCss'>
        {isLoading && <SunspotLoader
          gradientColors={[color.ripeMango,color.yellow]}
          shadowColor={color.violet}
          desktopSize={"30px"}
          mobileSize={"30px"}
        />}
      </div>
    </>
  )
}


export default Interceptor;