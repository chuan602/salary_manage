import React, {Component} from 'react'
import { View } from 'react-native'

export default class SeparatorLine extends Component{
    render(){
        return (
            <View style={{
                borderBottomWidth: 1,
                borderColor: '#eee',
                width: '100%'
            }} />
        )
    }
}