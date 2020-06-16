import React, {useState, useEffect, Component} from 'react';
import { ActivityIndicator, Text, View,  ScrollView } from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaView, FlatList, StyleSheet } from 'react-native';
import {campaignCatList} from '../actions';
//import CampaignListIem from './campaignListItem';
import ResultsList from './resultsList.js';



class CampaignList extends Component {
  componentDidMount() {
    console.log("comp WILLLLL MOUNT");
    this.props.campaignCatList();

  }
       
  filterResultsByCategory = (category)=> {
    return searchResults.filter(filteredResult => {
        return filteredResult.categoryName === category;
    })

  }


      render(){
        console.log("in list comp", this.props.campaignList);
        return (
          <SafeAreaView style={styles.container}>
            <ResultsList filteredResults={this.props.campaignList} title="Category 1" />
            <ResultsList filteredResults={this.props.campaignList} title="Category 1" />
            <ResultsList filteredResults={this.props.campaignList} title="Category 1" />
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
//    console.log("mapStateToProps camp list:", state);
    const  {campaignList} = state.campaignListInfo;
//    console.log("mapStateToProps camp list2:", campaignList);

     return{ campaignList  };

}

  // export default CampaignList;
  export default connect(mapStateToProps, {campaignCatList}) (CampaignList);
