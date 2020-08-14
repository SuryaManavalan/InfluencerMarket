import {CAMPAIGN_LIST_SUCCESS, CAMPAIGN_LIST_FAIL, CAMPAIGN_SEARCH_SUCCESS, CAMPAIGN_SEARCH_INIT,
    MORE_CAMPAIGN_LIST_SUCCESS, NEW_CAMPAIGN_LIST_SUCCESS} from '../types';
import { act } from 'react-test-renderer';

const INITIAL_STATE= { campaignListInfo: [] };
const SEARCH_INITIAL_STATE= { campaignSearchList: [] };

export default (state = INITIAL_STATE, action) => {
//    console.log("list reducer:", action.payload);
    
    switch (action.type) {
        case CAMPAIGN_SEARCH_INIT:
//            console.log("in CAMPAIGN_SEARCH_INIT:", action.payload)
            return {...state, ...SEARCH_INITIAL_STATE   };
        case CAMPAIGN_SEARCH_SUCCESS:
//            console.log("in CAMPAIGN_SEARCH_SUCCESS:", action.payload)
            return {...state, campaignSearchList:action.payload   };
        case NEW_CAMPAIGN_LIST_SUCCESS:
            console.log("in NEW_CAMPAIGN_LIST_SUCCESS:", action.payload)
            return {...state, newCampList:action.payload   };
        case CAMPAIGN_LIST_SUCCESS:
//            console.log("in CAMPAIGN_LIST_SUCCESS:", action.payload)
            return {...state, myCampList:action.payload   };
        case MORE_CAMPAIGN_LIST_SUCCESS:
//            console.log("in MORE_CAMPAIGN_LIST_SUCCESS1:", state.myCampList.documentData)
//            console.log("in MORE_CAMPAIGN_LIST_SUCCESS2:", action.payload.documentData)
            return {...state, myCampList:{
                documentData:[...state.myCampList.documentData, ...action.payload.documentData],
                lastVisible: action.payload.lastVisible,
                loading: action.payload.loading,
            }  }; 
    
        case CAMPAIGN_LIST_FAIL:
//            console.log("in CAMPAIGN_LIST_FAIL:", action.payload)
            return {...state, error: 'Campaign list Failed'};
        default:
            return state;
    }
}