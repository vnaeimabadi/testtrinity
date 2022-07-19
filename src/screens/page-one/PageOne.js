import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {globalAction} from '../../store/reducers';
const PageOne = ({navigation, route}) => {

  const globalState = useSelector(state => state.globalState);

  return (
    <View style={{flex:1}}>
      <Text>PageOne</Text>
    </View>
  );
};

export default PageOne;
