import React from 'react';
import {Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './login/components/LoginForm'
import CampaignList from './campaignMgmt/components/campaignList';
import CampaignCreate from './campaignMgmt/components/campaignCreate';
import CampaignEdit from './campaignMgmt/components/campaignEdit';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar >
                <Scene key="auth">
                    <Scene key="login" hideNavBar component={LoginForm}/>
                </Scene>
                <Scene key="campaign">
                    <Scene key="campaignList" component={CampaignList}
                    title="Campaigns"  rightTitle="Add"  initial
                    onRight={()=>{Actions.campaignCreate()}}/>

                    <Scene key="campaignCreate" component={CampaignCreate}
                    title="Add Campaign"  />

                    <Scene key="campaignEdit" component={CampaignEdit}
                    title="Edit Campaign"  />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;