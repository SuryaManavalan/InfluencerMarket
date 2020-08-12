import React, { Component } from 'react';
import Communications from 'react-native-communications';
import _ from 'lodash';
import { connect } from 'react-redux';
import { campaignUpdate, campaignEdit, campaignDelete } from '../actions';
import { Card, CardSection, ModalConfirm, Button } from '../../components/common';
import CampaignForm from './campaignForm';
import { View, Text} from 'react-native';

class CampaignEdit extends Component {

    state = { modalVisible: false };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    componentDidMount() {
        const { navigation, route } = this.props;
        //    console.log("Edit willmount:", route.params.selectedCampaign);
        _.each(route.params.selectedCampaign, (value, prop) => {
            if (prop === "name") prop = "campaignName";
            if (prop === "description") prop = "campaignDesc";
            if (prop === "name") prop = "categoryName";
            if (prop === "key") prop = "campaignKey";
            this.props.campaignUpdate({ prop, value });
        });
    }

    onButtonPress() {
        const { campaignName,
            campaignDesc,
            campaignMobile,
            // campaignDiscount,
            campaignCategory, campaignKey } = this.props;

        console.log("button press :");

        this.props.campaignEdit({
            campaignKey, campaignName,
            campaignDesc,
            campaignMobile,
            // campaignDiscount,
            campaignCategory: campaignCategory || 'Clothing'
        });


    }

    buttonRender() {
        if (this.props.usertype === 'influencer') {
            return (
                <Card>
                    <CardSection>
                        <Button onPress={this.onRegister.bind(this)}>
                            Register
                        </Button>
                    </CardSection>
                </Card>
            )
        }else{
            return (
                <Card>
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
                        <Button onPress={() => this.setModalVisible(true)}>
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
    }

    onRegister() {
        console.log("Registered for Campaign");
        
    }

    onTextPress() {
        const { campaignName,
            campaignMobile,
            campaignCategory } = this.props;

        console.log("text press :", campaignMobile);

        Communications.text(campaignMobile, `My campaign to propagate is ${campaignName} for category: ${campaignCategory}`);
    }

    onAccept() {
        console.log("in onAccept", this.props.campaignKey);
        this.setModalVisible(false);
        this.props.campaignDelete(this.props.campaignKey, this.props.navigation);
    }

    onDecline() {
        this.setModalVisible(false);
    }

    render() {
        return (
            <View>
                <Card>
                    <CampaignForm {...this.props} />
                </Card>
                {this.buttonRender()}
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    //console.log("mapStateToProps:", state);
    const {
        usertype,
        userData
    } = state.auth;

    const {
        campaignName,
        campaignDesc,
        campaignMobile,
        // campaignDiscount,
        campaignCategory,
        campaignKey
    } = state.campaignForm;

    return {
        campaignName,
        campaignDesc,
        campaignMobile,
        // campaignDiscount,
        campaignCategory,
        campaignKey,
        usertype,
        userData
    };

}


export default connect(mapStateToProps, { campaignUpdate, campaignEdit, campaignDelete })
    (CampaignEdit);