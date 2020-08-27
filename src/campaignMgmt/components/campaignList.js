import React, {useState, useEffect, Component} from 'react';
import { ActivityIndicator, Text, View,  ScrollView } from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaView, FlatList, StyleSheet } from 'react-native';
import {campaignCatList, myCampaignList, moreCampaignCatList} from '../actions';
//import CampaignListIem from './campaignListItem';
import ResultsList from './resultsList.js';
import {MY_CAMPAIGNS, NEW_CAMPAIGNS, OTHER_CAMPAIGNS, TRENDING_CAMPAIGNS} from '../types'



class CampaignList extends Component {
  componentDidMount() {
    console.log("comp WILLLLL MOUNT", this.props.uid);
    this.props.campaignCatList(this.props.uid, MY_CAMPAIGNS, 4);
    this.props.myCampaignList(this.props.uid);
  }
       

      render(){
        let docData = [];
        if(this.props.myCampList){
          //console.log("check this####:",this.props.myCampList )
          docData = this.props.myCampList.documentData;
        }
        //console.log("in list new comp$$$$$$", this.props.newCampList);

//        console.log('before sending func:', this.props.campaignCatList)
        return (
           <SafeAreaView style={styles.container}>
            <ResultsList lastVisible={this.props.lastVisible} filteredResults={this.props.myCampaigns}  
              navigation={this.props.navigation} title="My Campaigns" scroll={false}
              uid={this.props.uid} 
            />
            <ResultsList lastVisible={this.props.lastVisible} filteredResults={docData} 
                navigation={this.props.navigation} title="Other Campaigns" 
                moreListfunc={this.props.moreCampaignCatList} scroll={true}
                uid={this.props.uid} type={MY_CAMPAIGNS} limit={4}
            />
            <ResultsList lastVisible={this.props.lastVisible} filteredResults={docData}  
              navigation={this.props.navigation} title="Trending Campaigns" 
              moreListfunc={this.props.moreCampaignCatList} scroll={true}
              uid={this.props.uid} type={MY_CAMPAIGNS} limit={4}
            />
            </SafeAreaView>

        ); 
      }
}


const styles = StyleSheet.create({
    container: {
      marginTop: 10,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });

const mapStateToProps = (state) => {
    console.log("mapStateToProps camp list:", state);
//    console.log ("created camp:", state.campaignForm.createCamp)
    const  {myCampList} = state.campaignForm;
    const {myCampaigns} = state.campaignForm;
    var lastVisible = 0;
    if (myCampList)
      lastVisible = myCampList.lastVisible;
    const uid = state.auth.user.user.uid;
//    console.log("list lastVisible :", lastVisible);
//    console.log("mapStateToProps newcamp list 2:", newCampList);

     return{ myCampList, myCampaigns, uid, lastVisible  };

}

  // export default CampaignList;
  export default connect(mapStateToProps, {campaignCatList,myCampaignList, moreCampaignCatList}) (CampaignList);
