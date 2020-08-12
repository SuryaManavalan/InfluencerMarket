import React, { Component } from   'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import ResultsDetail from './resultsDetail';
import {Actions } from 'react-native-router-flux';
import * as RootNavigation from '../../../src/RootNavigation.js';
//import { withNavigation } from 'react-navigation';

class ResultsList extends Component  {

   // navigation = useNavigation();

         onCampaignPress =(selectedCampaign) => {
            // Actions.campaignEdit({selectedCampaign: selectedCampaign});
            //   console.log("before navigate", selectedCampaign);
            //    this.props.navigation.navigate('Home', {
            //     screen: 'CampaignEdit',
            //     params: { selectedCampaign: selectedCampaign}});
            
            RootNavigation.navigate('CampaignEdit', { selectedCampaign: selectedCampaign});
        }
        
    render() {
        return <View style={styles.container}>
            <Text style={styles.titleStyle}>{this.props.title}</Text>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data = {this.props.filteredResults}
                keyExtractor={(filteredResult) => filteredResult.key}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity >
                            <ResultsDetail 
                            result={item} 
                            onPress={this.onCampaignPress.bind(this,  item)}/>
                        </TouchableOpacity>
                    )
                }}
                onEndReached={()=>this.props.moreListfunc(this.props.uid, this.props.type, 
                    this.props.limit, this.props.lastVisible )}
                // How Close To The End Of List Until Next Data Request Is Made
                onEndReachedThreshold={0}
      
            />

        </View>
        }
    }


const styles = StyleSheet.create({
    titleStyle: { 
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5
    },
    container : {
        marginBottom: 10
    }
});

//export default withNavigation(ResultsList);
export default ResultsList;