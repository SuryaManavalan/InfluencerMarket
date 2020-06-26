import React, { Component} from 'react';
import { ActivityIndicator, Text, View,  ScrollView } from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaView, FlatList, StyleSheet } from 'react-native';
import {campaignSearch} from '../actions';
import SearchBar from '../../components/common/SearchBar';
import ResultsList from './resultsList.js';



class CampaignSearch extends Component {

  state = {searchTerm: ''};
  
      render(){

        console.log("in search comp", this.props.campaignSearchList);
        return (
          <>
            <SearchBar searchTerm={this.state.searchTerm} 
            onSearchTermChange={ newSearchTerm => this.setState({searchTerm: newSearchTerm}) 
          }
            onSearchTermSubmit={ () => this.props.campaignSearch(this.state.searchTerm)}
            />

            <SafeAreaView style={styles.container}>
              <ResultsList filteredResults={this.props.campaignSearchList} title="Campaigns" />
            </SafeAreaView>
        </>
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
//    console.log("mapStateToProps camp search list:", state);
    const  {campaignSearchList} = state.campaignListInfo;
    console.log("mapStateToProps camp srch list2:", campaignSearchList);

     return{ campaignSearchList  };

}

  // export default CampaignList;
  export default connect(mapStateToProps, {campaignSearch}) (CampaignSearch);
