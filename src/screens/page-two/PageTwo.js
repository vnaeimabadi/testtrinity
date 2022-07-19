import {View, Text} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {globalAction} from '../../store/reducers';

const PageTwo = ({navigation, route}) => {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state.globalState);
  const updateContact = (data) => {
    dispatch(
      globalAction.updateContactList(data),
    );
  };
  return (
    <View style={{flex: 1}}>
      <Text>PageTwo</Text>
    </View>
  );
};

export default PageTwo;
