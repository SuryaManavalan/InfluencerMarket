import {CAMPAIGN_LIST_SUCCESS, CAMPAIGN_LIST_FAIL, CAMPAIGN_SEARCH_SUCCESS} from '../types';
import { act } from 'react-test-renderer';

const INITIAL_STATE= { campaignListInfo: [] };
// const RESET_STATE= { campaignForm: {
//     campaignName: '',
//     campaignDesc: '',
//     capaignMobile: '',
//     categoryName:'',
//     campaignDiscount: '',
//     campaignKey: ''

// } };

export default (state = INITIAL_STATE, action) => {
//    console.log("list reducer:", action.payload);
    
    switch (action.type) {
        case CAMPAIGN_SEARCH_SUCCESS:
            console.log("in CAMPAIGN_SEARCH_SUCCESS:", action.payload)
            //console.log("CAMPAIGN_SEARCH_SUCCESS");
            return {...state, campaignSearchList:action.payload   };
        case CAMPAIGN_LIST_SUCCESS:
            console.log("in CAMPAIGN_LIST_SUCCESS:", action.payload)
            //console.log("CAMPAIGN_LIST_SUCCESS");
            return {...state, campaignList:action.payload   };
        case CAMPAIGN_LIST_FAIL:
//            console.log("in CAMPAIGN_LIST_FAIL:", action.payload)
            return {...state, error: 'Campaign list Failed'};
        default:
            return state;
    }
}