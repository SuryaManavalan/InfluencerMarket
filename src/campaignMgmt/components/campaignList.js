import React, {useState, useEffect, Component} from 'react';
import { ActivityIndicator, Text, View,  ScrollView } from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaView, FlatList, StyleSheet } from 'react-native';
import {campaignCatList, moreCampaignCatList} from '../actions';
//import CampaignListIem from './campaignListItem';
import ResultsList from './resultsList.js';
import {MY_CAMPAIGNS, OTHER_CAMPAIGNS, TRENDING_CAMPAIGNS} from '../types'



class CampaignList extends Component {
  componentDidMount() {
    console.log("comp WILLLLL MOUNT", this.props.navigation);
    this.props.campaignCatList(this.props.uid, MY_CAMPAIGNS, 4);

  }
       
  myCampaigns = (searchResults)=> {
//    console.log("filt result : ", searchResults);
    if(searchResults != undefined)
    {
      return searchResults.filter(filteredResult => {
          console.log("my filt:", this.props.uid)
          return filteredResult.author_id ==  this.props.uid;
      })
    }
  }

  otherCampaigns = (searchResults)=> {
    console.log("filt result2 : ", searchResults);
    if(searchResults != undefined)
    {
      return searchResults.filter(filteredResult => {
          return filteredResult.author_id !== this.props.uid;
      })
    }
  }

      render(){
        let docData = [];
        if(this.props.myCampList){
          //console.log("check this####:",this.props.myCampList )
          docData = this.props.myCampList.documentData;
        }
        console.log("in list comp$$$$$$", this.props.lastVisible);

        //const myCampaignList = this.myCampaigns(this.props.campList.documentData);
        //const otherCampaignList = this.otherCampaigns(this.props.campList.documentData);
        
        return (
          <SafeAreaView style={styles.container}>
            <ResultsList lastVisible={this.props.lastVisible} filteredResults={docData} 
                navigation={this.props.navigation} title="My Campaigns" 
                moreListfunc={this.props.moreCampaignCatList}
                uid={this.props.uid} type={MY_CAMPAIGNS} limit={4}
            />
            <ResultsList lastVisible={this.props.lastVisible} filteredResults={docData}  
              navigation={this.props.navigation} title="Other Campaigns" 
              moreListfunc={this.props.moreCampaignCatList}
              uid={this.props.uid} type={MY_CAMPAIGNS} limit={4}
            />
              <ResultsList lastVisible={this.props.lastVisible} filteredResults={docData}  
              navigation={this.props.navigation} title="Trending Campaigns" 
              moreListfunc={this.props.moreCampaignCatList}
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
//    console.log("mapStateToProps camp list:", state.campaignListInfo);
    const  {myCampList} = state.campaignListInfo;
    var lastVisible = 0;
    if (myCampList)
      lastVisible = myCampList.lastVisible;
    const uid = state.auth.user.user.uid;
    console.log("list lastVisible :", lastVisible);
    console.log("mapStateToProps camp list2:", myCampList);

     return{ myCampList, uid, lastVisible  };

}

  // export default CampaignList;
  export default connect(mapStateToProps, {campaignCatList, moreCampaignCatList}) (CampaignList);
