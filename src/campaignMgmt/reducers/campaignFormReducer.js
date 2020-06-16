import {CAMPAIGN_EDIT_SUCCESS, CAMPAIGN_UPDATE,  CAMPAIGN_CREATE_SUCCESS,
    CAMPAIGN_CREATE_FAIL, CAMPAIGN_CREATE_INIT} from '../types';
import { act } from 'react-test-renderer';

const INITIAL_STATE= {
    campaignName: '',
    campaignDesc: '',
    capaignMobile: '',
    categoryName:'',
    campaignDiscount: '',
    campaignKey: ''

};

export default (state = INITIAL_STATE, action) => {
    console.log("reducer:", action.value);
    console.log("reducer:", action.payload);
    
    switch (action.type) {
        case CAMPAIGN_UPDATE:
            console.log("in update");
            return {...state, [action.payload.prop]: action.payload.value};
        case CAMPAIGN_CREATE_INIT:
            console.log("in CAMPAIGN_CREATE_INIT:")
            return {...state, ...INITIAL_STATE};
        case CAMPAIGN_CREATE_SUCCESS:
//            console.log("in CAMPAIGN_CREATE_SUCCESS:", action.payload)
            return {...state, ...INITIAL_STATE};
        case CAMPAIGN_EDIT_SUCCESS:
//            console.log("in CAMPAIGN_EDIT_SUCCESS:", action.payload)
            return {...state, ...INITIAL_STATE};
        case CAMPAIGN_CREATE_FAIL:
//            console.log("in CAMPAIGN_CREATE_FAIL:", action.payload)
            return {...state, error: 'Campaign Create Failed'};
            
        default:
            return state;
    }
}