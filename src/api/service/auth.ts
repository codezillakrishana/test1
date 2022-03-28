import constant from "../../constants/constant"
import auth from "../dictionary/auth"
import axios from "axios";
import { ILoginData } from "../../constants/interface";

export default {

    loginService: async (data: ILoginData) => {
        return axios.post(constant.BASE_URL + auth.LOG_IN(), data);
    },
    
    logOutService: async (token:string) => {
        return axios.post(constant.BASE_URL + auth.LOG_OUT(), token);
    },

    // forgetService: async (data) => {
    //     return axios.post(constant.BASE_URL + dictionary.auth.FORGET(), data);
    // },

    // myProfileService: async () => {
    //     return axios.get(constant.BASE_URL + dictionary.auth.MY_PROFILE());
    // },

    // changePasswordService: async (data) => {
    //     return axios.post(constant.BASE_URL + dictionary.auth.CHANGE_PASSWORD(), data);
    // },

    // resetPasswordServices: async (data) => {
    //     return axios.post(constant.BASE_URL + dictionary.auth.RESET_PASSWORD(), data);
    // },




}