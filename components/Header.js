import React from 'react';
import { View } from 'react-native';
import { HeaderStyle } from '../assets/style/HeaderStyle';
import { UserHeaderIcons } from './TabIcons';

export default function Header({ navigation }) {
    return (
        <View style={HeaderStyle.container}>
            <UserHeaderIcons style={HeaderStyle.userIcon} size={30} color="black" />
        </View>
    );
}