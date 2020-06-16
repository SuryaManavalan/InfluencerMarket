import React, {Component} from 'react';
import {Text, Platform, UIManager, LayoutAnimation,StyleSheet,View,  TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux';
import {CardSection} from './common';
import * as actions from '../actions';
import * as reducers from '../reducers';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

class ListItem extends Component {

    renderDescription() {
        const{category, expanded} = this.props;
        // console.log('render', category);
            if(expanded) {
            return(
                <CardSection>
                    <Text style={{flex:1}}>{category.Description}</Text>
                </CardSection>
            )
        }
    }
     render(){
        const {id, title} =  this.props.category;
        // console.log('props **id',id);
        return (
            <TouchableWithoutFeedback onPress={()=>{
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                this.props.selectCat(id);
                }}>
                
                <View>
                    <CardSection>
                        <Text style={styles.tilteStyle}> {title} </Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        )
    }
} 

const styles = StyleSheet.create({
    tilteStyle: {
        fontSize: 18,
        paddingLeft: 15
    }   
})

const mapStateToProps = (state, ownProps) => {
   const expanded = state.selectedCategoryId === ownProps.category.id;
    return {
        expanded
    };
  };

const mapDispatchToProps = (dispatch) => {
    // console.log("^^^ ownProps:", ownProps.category.id);
    return {
      // dispatching plain actions
     selectCategory: selectedCategoryId => dispatch(actions.selectCat(selectedCategoryId    ))

     }
  }


export default connect(mapStateToProps, actions)(ListItem); 