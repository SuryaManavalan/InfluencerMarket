import React, {Component} from 'react';
import {Text } from 'react-native'
import {CardSection} from '../../../src/components/common';

class CampaignListItem extends Component {
    render() {
        const { campaign } = this.props.item;

        return (
            <CardSection>
                <Text style= {styles.titleStyle}>
                    {campaign.name}
                </Text>
            </CardSection>
        )
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
}