import firestore, { firebase } from '@react-native-firebase/firestore';
import * as RootNavigation from '../../../src/RootNavigation.js';
import { Actions } from 'react-native-router-flux'
import {
    CAMPAIGN_EDIT, CAMPAIGN_EDIT_SUCCESS, CAMPAIGN_UPDATE, CAMPAIGN_CREATE_SUCCESS,
    CAMPAIGN_CREATE_FAIL, MORE_CAMPAIGN_LIST_SUCCESS, CAMPAIGN_LIST_SUCCESS, CAMPAIGN_CREATE_INIT,
    CAMPAIGN_SEARCH_SUCCESS, CAMPAIGN_SEARCH_INIT, CAMPAIGN_REGISTER
} from '../types'


export const campaignRegister = (uid, cid, preRegUsers) => {
    console.log("Registering for Campaign: ", cid)
    return (dispatch) => {
        const userId = preRegUsers;
        userId.push(uid);
        firestore().collection('campaigns').doc(cid)
            .update({
                registeredUsers: userId
            })
            .then(data => {
                dispatch({
                    type: CAMPAIGN_REGISTER,
                    payload: data
                });
            });
    };
};

export const campaignUpdate = ({ prop, value }) => {
    console.log("action:************", prop)
    return {
        type: CAMPAIGN_UPDATE,
        payload: { prop, value }
    };
};

export  const campaignCatList= (uid, type, limit)=>{
    console.log("Campaign Cat List");

    return (dispatch) => {
        // const collection = firestore().collection('campaigns');
        // var query;
        // if(type === MY_CAMPAIGNS){
        //     query = collection.where('author_id', '==', uid);
        // }
        // else {
        //     query = collection.where('author_id', '!=', uid);
        // }
        // query.limit(limit);

        // console.log("query :", query);

        var docRef = firestore().collection('campaigns').where('author_id', '==', uid)
        .orderBy('name').limit(limit)

             docRef.get().then(querySnapshot => {
                        const campList = [];
                            querySnapshot.forEach(documentSnapshot => {
                                campList.push({
                                ...documentSnapshot.data(),
                                key: documentSnapshot.id,
                              });
                            })
                            var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
                            
                            const myCampaigns = {
                                documentData: campList,
                                lastVisible: lastVisible,
                                loading: false,
                            }
//                            console.log("Campaign Cat List3*******", myCampaigns);
                            dispatch({type: CAMPAIGN_LIST_SUCCESS,
                                payload:  myCampaigns
                            });

                        })
    };
}

export const moreCampaignCatList = (uid, type, limit, lastVisible) => {
    console.log("Retrieve more Campaign Cat List", uid, type, limit, lastVisible);

    return (dispatch) => {
        // const collection = firestore().collection('campaigns');
        // var query;
        // if(type === MY_CAMPAIGNS){
        //     query = collection.where('author_id', '==', uid);
        // }
        // else {
        //     query = collection.where('author_id', '!=', uid);
        // }
        // query.limit(limit);

        // console.log("query :", query);

        const campList = [];
        try {
            var docRef = firestore().collection('campaigns').where('author_id', '==', uid)
                .orderBy('name').startAfter(lastVisible).limit(limit)

            docRef.get().then(querySnapshot => {
                            querySnapshot.forEach(documentSnapshot => {
//                                console.log("more each:", documentSnapshot.data())
                                campList.push({
                                ...documentSnapshot.data(),
                                key: documentSnapshot.id,
                              });
                            })
                            
                            var lastVisibleNow = querySnapshot.docs[querySnapshot.docs.length-1];               
//                            console.log("lastVisNow:", lastVisibleNow)
                            const myCampaigns = {
                                documentData: campList,
                                lastVisible: lastVisibleNow,
                                loading: false,
                            }
//                            console.log("More ****Campaign Cat List3*******", myCampaigns);
                            dispatch({type: MORE_CAMPAIGN_LIST_SUCCESS,
                                payload:  myCampaigns
                            });
                    
                        })

        } catch(exception){ console.log("retrieve more campaigns exception:", exception)}
    };
}

export  const newCampaignList= (uid)=>{
    var beginningDate = Date.now() - 604800000;
    var beginningDateObject = new Date(beginningDate);

    console.log("newCampaignList", beginningDateObject);
    console.log("newCampaignList2",  uid);

     return (dispatch) => {
        firestore().collection('campaigns').where('created_date', '>=', beginningDateObject)
         .where('author_id', '==', uid).orderBy('created_date')
            .onSnapshot(querySnapshot => {
                console.log("query snap for new:", querySnapshot)
                const newCampaignList = [];
                if(querySnapshot){
                    querySnapshot.forEach(documentSnapshot => {
                        console.log("new camp - foreach:", documentSnapshot.data());
                        newCampaignList.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });
                    })
                }
                    console.log("newCampaignList*******", newCampaignList);
                dispatch({type: NEW_CAMPAIGN_LIST_SUCCESS,
                    payload: newCampaignList});
                })
            };
    };
  

export const campaignCreateInit = () => {
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
//            dispatch({type: CAMPAIGN_CREATE});
//            const uid = firebase.auth.id;
            firestore().collection('campaigns')
                .add({
                    name: campaignName,
                    description: campaignDesc,
                    categoryName: campaignCategory,
                    nameKeywords: nameKeywords,
                    author: firebase.auth().currentUser.displayName, 
                    author_id: firebase.auth().currentUser.uid,
                    created_date: firebase.firestore.FieldValue.serverTimestamp()                 
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

export const campaignCreateFail = (dispatch, error) => {
    console.log("Campaign create error", error);
    dispatch({
        type: CAMPAIGN_CREATE_FAIL
    });
}

export const campaignCreateSuccess = (dispatch, data) => {
    console.log("campaign Create Success ");
    dispatch({
        type: CAMPAIGN_CREATE_SUCCESS,
        payload: data
    });

    RootNavigation.navigate('CampaignList');

}

export const campaignEdit = ({ campaignKey, campaignName, campaignDesc, campaignMobile,
    campaignDiscount, campaignCategory }) => {

    //       console.log("***camp edit2 :", campaignDesc)
    return (dispatch) => {
        //            dispatch({type: CAMPAIGN_EDIT});
        firestore().collection('campaigns').doc(campaignKey)
            .update({
                name: campaignName,
                description: campaignDesc,
                campaignMobile: campaignMobile,
                categoryName: campaignCategory
            })
            .then(data => {
                dispatch({
                    type: CAMPAIGN_EDIT_SUCCESS,
                    payload: data
                });
                RootNavigation.navigate('CampaignList');
                console.log("campaign Edit Success ");
            })

            .catch((error) => {
                console.log("campaign Edit failed : ", error);
            });
    }
}

export const campaignDelete = (campaignKey) => {

    console.log("***camp del :", campaignKey);
    return () => {
        firestore().collection('campaigns').doc(campaignKey)
            .delete()
            .then(() => {
                console.log("campaign del Success ");
                RootNavigation.navigate('CampaignList');
            })

            .catch((error) => {
                console.log("campaign Del failed : ", error);
            });
    }
}

export const campaignSearchInit = () => {
    console.log("campaignSearchInit:************")
    return {
        type: CAMPAIGN_SEARCH_INIT,
        payload: {}
    };
};

export const campaignSearch = (searchTerm) => {
    console.log("Campaign Search", searchTerm);

    return (dispatch) => {
        const campaignSearchList = [];
        const querySnapshot = firestore().collection('campaigns')
            .where('nameKeywords', 'array-contains', searchTerm.toLowerCase());

        console.log("after qs");

        querySnapshot.get()
            .then(documentSnapshot => {
                console.log("in qs", documentSnapshot);

                documentSnapshot.docs.forEach(doc => {
                    campaignSearchList.push({
                        ...doc.data()
                    });
                    console.log("doc data", doc.data());
                })

                //     campaignSearchList.push({
                //     ...documentSnapshot.data(),
                //     key: documentSnapshot.id,
                //})
                console.log("CAMPAIGN_SEARCH2", campaignSearchList);
                dispatch({
                    type: CAMPAIGN_SEARCH_SUCCESS,
                    payload: campaignSearchList
                });

            })
            .catch(err => {
                console.log('Error getting documents', err);
            });

        //            });
    };
}