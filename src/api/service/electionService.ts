import constant from "../../constants/constant"
import electionApiUrl from "../dictionary/electionApiUrl"
import axios from "axios";
import { IResultPostData,IPresidentialResult } from "../../constants/interface";

export default {

    getAllStates: async () => {
        return axios.get(constant.BASE_URL + electionApiUrl.GET_STATE(),);
    },

    getAllLgas: async () => {
        return axios.get(constant.BASE_URL + electionApiUrl.GET_LGAS(),);
    },

    getLgasByState: async (id:String) => {
        return axios.get(constant.BASE_URL + electionApiUrl.GET_LGAS_BY_STATE(id),);
    },

    getAllWards: async () => {
        return axios.get(constant.BASE_URL + electionApiUrl.GET_WARDS(),);
    },

    getWardsByState: async (id:String) => {
        return axios.get(constant.BASE_URL + electionApiUrl.GET_WARDS_BY_STATE(id),);
    },

    getWardsByLga: async (id:String) => {
        return axios.get(constant.BASE_URL + electionApiUrl.GET_WARDS_BY_LGA(id),);
    },

    getPollingUnitsByWardId: async (id: String) => {
        return axios.get(constant.BASE_URL + electionApiUrl.GET_POLLINGUNITS(id),);
    },

    postSubmitPredictionData: async (data: IPresidentialResult) => {
        return axios.post(constant.BASE_URL + electionApiUrl.SUBMIT_PREDICTION(), data);
    },

    postLgasData: async (data: IResultPostData) => {
        return axios.post(constant.BASE_URL + electionApiUrl.SUBMIT_LGAS(), data);
    },
    
    postWardData: async (data: IResultPostData) => {
        return axios.post(constant.BASE_URL + electionApiUrl.SUBMIT_WARD(), data);
    },

    postPusData: async (data: IResultPostData) => {
        return axios.post(constant.BASE_URL + electionApiUrl.SUBMIT_PUS(), data);
    },

}