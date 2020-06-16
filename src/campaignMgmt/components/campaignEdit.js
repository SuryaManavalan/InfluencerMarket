import React, {Component} from 'react';
import Communications from 'react-native-communications';
import _ from 'lodash';
import {connect} from 'react-redux';
import {campaignUpdate, campaignEdit, campaignDelete} from '../actions';
import {Card, CardSection, ModalConfirm, Button} from '../../components/common';
import CampaignForm from './campaignForm';

class CampaignEdit extends Component {

    state ={modalVisible: false};

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }

    componentDidMount() {
        console.log("willmount:", this.props.selectedCampaign);
        _.each(this.props.selectedCampaign, (value, prop) => {
            if(prop === "name") prop = "campaignName";
            if(prop === "description") prop = "campaignDesc";
            if(prop === "name") prop = "categoryName";
            if(prop === "key") prop = "campaignKey";
            this.props.campaignUpdate({prop, value});
        });
    }

    onButtonPress() {
        const {campaignName,
            campaignDesc,
            campaignMobile,
            // campaignDiscount,
            campaignCategory, campaignKey} = this.props;
        
        console.log("button press :", campaignKey);

        this.props.campaignEdit({campaignKey, campaignName,
            campaignDesc,
            campaignMobile,
            // campaignDiscount,
            campaignCategory: campaignCategory || 'Clothing'});
        

    }

    onTextPress() {
        const {campaignName,
             campaignMobile,
            campaignCategory} = this.props;
        
        console.log("text press :", campaignMobile);
        
        Communications.text(campaignMobile, `My campaign to propagate is ${campaignName} for category: ${campaignCategory}`);
    }

    onAccept(){
        console.log("in onAccept", this.props.campaignKey);
        this.setModalVisible(false);
        this.props.campaignDelete(this.props.campaignKey);
    }

    onDecline() {
        this.setModalVisible(false);
    }

    render() {
        return (
            <Card>
                <CampaignForm {...this.props}/>
                <CardSection> 
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Update
                    </Button>
                </CardSection>
                <CardSection> 
                    <Button onPress={this.onTextPress.bind(this)}>
                        Text
                    </Button>
                </CardSection>
                <CardSection> 
                    <Button onPress={()=>this.setModalVisible(true)}>
                        Delete Campaign
                    </Button>
                </CardSection>
                
                <ModalConfirm 
                    visible={this.state.modalVisible} 
                    text='Are you sure you want to delete this?'
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}>
                </ModalConfirm>
            </Card>
        )
    }
};

const mapStateToProps = (state) => {
    //console.log("mapStateToProps:", state);
    const  {
        campaignName,
        campaignDesc,
         campaignMobile,
        // campaignDiscount,
        campaignCategory,
        campaignKey
     } = state.campaignForm;

     return{        
        campaignName,
        campaignDesc,
         campaignMobile,
        // campaignDiscount,
        campaignCategory,
        campaignKey
    };

}


export default connect(mapStateToProps, {campaignUpdate, campaignEdit, campaignDelete}) 
    (CampaignEdit);