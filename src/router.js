import React from 'react';
import {Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './login/components/LoginForm'
import CampaignList from './campaignMgmt/components/campaignList';
import CampaignCreate from './campaignMgmt/components/campaignCreate';
import CampaignEdit from './campaignMgmt/components/campaignEdit';
import CampaignSearch from './campaignMgmt/components/campaignSearch';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{paddingTop: 5}}>
            <Scene key="root" hideNavBar >
                <Scene key="auth">
                    <Scene key="login" component={LoginForm}
                            title="Please Login" initial/>
                </Scene>
                <Scene key="campaign">
                    <Scene key="campaignList" component={CampaignList}
                    title="Campaigns"  rightTitle="Add"  initial
                    onRight={()=>{Actions.campaignCreate()}}
                    leftTitle="Search" onLeft={()=>{Actions.campaignSearch()}}
                    />

                    <Scene key="campaignSearch" component={CampaignSearch}
                    title="Search for Campaigns"  />

                    <Scene key="campaignCreate" component={CampaignCreate}
                    title="Add  Campaign"  />

                    <Scene key="campaignEdit" component={CampaignEdit}
                    title="Edit Campaign"  />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;