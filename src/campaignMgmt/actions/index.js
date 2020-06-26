
import firestore, { firebase } from '@react-native-firebase/firestore';
import {Actions } from 'react-native-router-flux'
import {CAMPAIGN_EDIT,CAMPAIGN_EDIT_SUCCESS, CAMPAIGN_UPDATE, CAMPAIGN_CREATE, CAMPAIGN_CREATE_SUCCESS,
     CAMPAIGN_CREATE_FAIL, CAMPAIGN_CAT_LIST, CAMPAIGN_LIST_SUCCESS, CAMPAIGN_CREATE_INIT,
     CAMPAIGN_SEARCH_SUCCESS} from '../types'

    export const campaignUpdate = ({prop, value}) =>{
        console.log("action:************", prop)
        return {
            type: CAMPAIGN_UPDATE,
            payload: {prop, value}
        };
    };

    export  const campaignCatList= ()=>{
        console.log("Campaign Cat List");

        //const {currentUser} = firebase.auth();

        return (dispatch) => {
            dispatch({type: CAMPAIGN_CAT_LIST});
            firestore().collection('campaigns')
                .onSnapshot(querySnapshot => {
                    const campaignList = [];
//                    console.log("Campaign Cat List2", campaignList);

                    querySnapshot.forEach(documentSnapshot => {
                        campaignList.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                      });
//                      console.log("Campaign Cat List3*******", campaignList);
                      dispatch({type: CAMPAIGN_LIST_SUCCESS,
                        payload: campaignList});
                    })
                });
        };
    }
        

    export const campaignCreateInit = () =>{
        console.log("campaignCreateInit:************")
        return {
            type: CAMPAIGN_CREATE_INIT,
            payload: {}
        };
    };

export const campaignCreate= ( {campaignName, campaignDesc, campaignMobile,
    campaignDiscount,  campaignCategory} )  => {

       const  nameKeywords = generateKeywords(campaignName);

        return (dispatch) => {
            dispatch({type: CAMPAIGN_CREATE});
            firestore().collection('campaigns')
                .add({
                    name: campaignName,
                    description: campaignDesc,
                    categoryName: campaignCategory,
                    nameKeywords: nameKeywords
                })
                .then(data => {
                    campaignCreateSuccess(dispatch,data)  })
                .catch((error) =>{ 
                    campaignCreateFail(dispatch, error);
                });
        }
};

const createKeywords = name => {
    console.log("keyword name", name)
    const arrName = [];
    let curName = '';
 
    name.split('').forEach(letter => {
        curName += letter;
        arrName.push(curName);
    });
    name.split(' ').forEach(word => {
        let curName2 = '';
        word.split('').forEach(letter2 => {
            curName2 += letter2;
            arrName.push(curName2);
        });
    });

    return arrName;
  }
  
  
  const generateKeywords = name => {
    const keywordName = createKeywords(name);

     return [
      ...new Set([
        '',
        ...keywordName
      ])
    ];
  }

export const campaignCreateFail= (dispatch, error)=>{
    console.log("Campaign create error", error);
    dispatch({
        type: CAMPAIGN_CREATE_FAIL
    });
}

export const campaignCreateSuccess= (dispatch, data) => {
    console.log("campaign Create Success ");
    dispatch({type: CAMPAIGN_CREATE_SUCCESS,
        payload: data});
    
    Actions.campaignList();

}

export const campaignEdit= ( {campaignKey, campaignName, campaignDesc, campaignMobile,
    campaignDiscount,  campaignCategory} )  => {

//        console.log("***camp edit :", campaignKey);
//       console.log("***camp edit2 :", campaignDesc)
        return (dispatch) => {
            dispatch({type: CAMPAIGN_EDIT});
            firestore().collection('campaigns').doc(campaignKey)
                .update({
                    name: campaignName,
                    description: campaignDesc,
                    campaignMobile: campaignMobile,
                    categoryName: campaignCategory
                })
                .then(data => {
                    dispatch({type: CAMPAIGN_EDIT_SUCCESS,
                        payload: data});
                    
                    Actions.campaignList();
                    console.log("campaign Edit Success ");  
                })
                
                .catch((error) =>{ 
                    console.log("campaign Edit failed : ", error);
                });
        }
    }
    
export const campaignDelete= ( campaignKey)  => {

        console.log("***camp del :", campaignKey);
        return () => {
            firestore().collection('campaigns').doc(campaignKey)
                .delete()
                .then(() => {
                    console.log("campaign del Success ");  
                    Actions.campaignList();
                })
                
                .catch((error) =>{ 
                    console.log("campaign Del failed : ", error);
                });
        }
}


export  const campaignSearch= (searchTerm)=>{
    console.log("Campaign Search", searchTerm);

    return (dispatch) => {
        const campaignSearchList = [];
//        dispatch({type: CAMPAIGN_SEARCH});
//         firestore().collection('campaigns')
//             .onSnapshot(querySnapshot => {
//                 const campaignSearchList = [];
// //                    console.log("CAMPAIGN_SEARCH2", campaignSearchList);

//                 querySnapshot.forEach(documentSnapshot => {
//                     campaignSearchList.push({
//                     ...documentSnapshot.data(),
//                     key: documentSnapshot.id,
//                   });
//                 })
        const querySnapshot = firestore().collection('campaigns')
            .where('nameKeywords', 'array-contains', searchTerm.toLowerCase());
            
        console.log("after qs");

        querySnapshot.get()
        .then(documentSnapshot => {
            console.log("in qs", documentSnapshot);

            documentSnapshot.docs.forEach(doc => {
                campaignSearchList.push({
                    ...doc.data()});
                console.log("doc data", doc.data());
              })

        //     campaignSearchList.push({
        //     ...documentSnapshot.data(),
        //     key: documentSnapshot.id,
        //})
          console.log("CAMPAIGN_SEARCH2", campaignSearchList);
          dispatch({type: CAMPAIGN_SEARCH_SUCCESS,
              payload: campaignSearchList});

        })
        .catch(err => {
            console.log('Error getting documents', err);
          });

//            });
    };
}
    
