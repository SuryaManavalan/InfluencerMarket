import {CAMPAIGN_EDIT_SUCCESS, CAMPAIGN_UPDATE,  CAMPAIGN_CREATE_SUCCESS,
    CAMPAIGN_CREATE_FAIL, CAMPAIGN_CREATE_INIT, CAMPAIGN_REGISTER} from '../types';
import {CAMPAIGN_LIST_SUCCESS, CAMPAIGN_LIST_FAIL, CAMPAIGN_SEARCH_SUCCESS, CAMPAIGN_SEARCH_INIT,
    MORE_CAMPAIGN_LIST_SUCCESS, MY_CAMPAIGN_LIST_SUCCESS, REG_CAMPAIGN_LIST_SUCCESS, CAMPAIGN_DELETE_SUCCESS} from '../types';
    
//    import { act } from 'react-test-renderer';
const LIST_INITIAL_STATE= { campaignListInfo: [] };
const SEARCH_INITIAL_STATE= { campaignSearchList: [] };

    
const INITIAL_STATE= {
    campaignName: '',
    campaignDesc: '',
    capaignMobile: '',
    categoryName:'',
    campaignDiscount: '',
    campaignKey: '',
    createdCamp:{}

};

export default (state = INITIAL_STATE, action) => {
//    console.log("reducer:", action.value);
//    console.log("reducer:", action.payload);
    
    switch (action.type) {
        case CAMPAIGN_REGISTER:
            return {...state, ...INITIAL_STATE};
        case CAMPAIGN_UPDATE:
//            console.log("in update");
            return {...state, [action.payload.prop]: action.payload.value};
        case CAMPAIGN_CREATE_INIT:
//            console.log("in CAMPAIGN_CREATE_INIT:")
            return {...state, ...INITIAL_STATE};
        case CAMPAIGN_CREATE_SUCCESS:
//            console.log("in CAMPAIGN_CREATE_SUCCESS:", action.payload)
            return {...state, ...INITIAL_STATE};
        case CAMPAIGN_EDIT_SUCCESS:
            console.log("in CAMPAIGN_EDIT_SUCCESS:", action.payload)
            return {...state, ...INITIAL_STATE};
        case CAMPAIGN_DELETE_SUCCESS:
//            console.log("in CAMPAIGN_DELETE_SUCCESS:", action.payload)
            return {...state, ...INITIAL_STATE};
    
            case CAMPAIGN_CREATE_FAIL:
//            console.log("in CAMPAIGN_CREATE_FAIL:", action.payload)
            return {...state, error: 'Campaign Create Failed'};
// LIST cases
        case CAMPAIGN_SEARCH_INIT:
//            console.log("in CAMPAIGN_SEARCH_INIT:", action.payload)
            return {...state, ...SEARCH_INITIAL_STATE   };
        case CAMPAIGN_SEARCH_SUCCESS:
//            console.log("in CAMPAIGN_SEARCH_SUCCESS:", action.payload)
            return {...state, campaignSearchList:action.payload   };
        case REG_CAMPAIGN_LIST_SUCCESS:
            console.log("in REG_CAMPAIGN_LIST_SUCCESS:", action.payload)
            return {...state, regCampaignList:action.payload   };
        case MY_CAMPAIGN_LIST_SUCCESS:
            console.log("in MY_CAMPAIGN_LIST_SUCCESS:", action.payload)
            return {...state, myCampaigns:action.payload   };
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