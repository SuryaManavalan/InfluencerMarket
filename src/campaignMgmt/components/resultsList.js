import React, { Component } from   'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import ResultsDetail from './resultsDetail';
import {Actions } from 'react-native-router-flux';


class ResultsList extends Component  {

         onCampaignPress =(selectedCampaign) => {
            Actions.campaignEdit({selectedCampaign: selectedCampaign});
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