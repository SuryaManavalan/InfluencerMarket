import React, {Component} from 'react';
import {connect} from 'react-redux';
import { FlatList , Text, View} from 'react-native';
import ListItem from './ListItem';
import {CardSection} from './common';


class CategoryList extends Component {

    renderItem({item}) {
        return (
            <ListItem category={item} />
        );
    }
    render() {
        return (
            <FlatList 
                data={this.props.categories}
                renderItem={this.renderItem}
                keyExtractor={category => category.id}
            />
        )
    }
}

const mapStateToProps = state=>{
     return {     categories: state.categories }
};
export default connect(mapStateToProps)(CategoryList);