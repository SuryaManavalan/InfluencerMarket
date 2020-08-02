import React, {useState, useEffect, Component} from 'react';
import { ActivityIndicator, Text, View,  ScrollView } from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaView, FlatList, StyleSheet } from 'react-native';
import {campaignCatList} from '../actions';
//import CampaignListIem from './campaignListItem';
import ResultsList from './resultsList.js';



class CampaignList extends Component {
  componentDidMount() {
    console.log("comp WILLLLL MOUNT", this.props.navigation);
    this.props.campaignCatList();

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
        console.log("in list comp$$$$$$", this.props.campList);

        const myCampaignList = this.myCampaigns(this.props.campList);
        const otherCampaignList = this.otherCampaigns(this.props.campList);
        
        return (
          <SafeAreaView style={styles.container}>
            <ResultsList filteredResults={myCampaignList} navigation={this.props.navigation} title="My Campaigns" />
            <ResultsList filteredResults={otherCampaignList}  navigation={this.props.navigation} title="Other Campaigns" />
            <ResultsList filteredResults={otherCampaignList}  navigation={this.props.navigation} title="Trending Campaigns" />
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
    const  {campList} = state.campaignListInfo;
    const uid = state.auth.user.user.uid;
    console.log("list uid :", uid);
    console.log("mapStateToProps camp list2:", campList);

     return{ campList, uid  };

}

  // export default CampaignList;
  export default connect(mapStateToProps, {campaignCatList}) (CampaignList);
