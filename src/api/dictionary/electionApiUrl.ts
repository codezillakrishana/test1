export default {
    GET_STATE: () => `states`,
    GET_LGAS: () => `lgas`,
    GET_LGAS_BY_STATE: (id: String) => `lgas/${id}`,
    GET_WARDS: () => `wards`,
    GET_WARDS_BY_STATE: (id: String) => `wards/state/${id}`,
    GET_WARDS_BY_LGA: (id: String) => `wards/lga/${id}`,
    GET_POLLINGUNITS: (id: String) => `pollingunits/${id}`,
    SUBMIT_PREDICTION: () => `prediction`,
    SUBMIT_WARD: () => `prediction/wards`,
    SUBMIT_LGAS: () => `prediction/lgas`,
    SUBMIT_PUS: () => `prediction/pus`,
}