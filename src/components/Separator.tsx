import React from 'react';
import {View} from 'react-native';

export const Separator = (props: any) => {
  const {height} = props;
  return (
    <View
      style={{
        backgroundColor: '#c4c4c4',
        flex: 1,
        height: height,
        marginHorizontal: 10,
        marginVertical: 5,
      }}
    />
  );
};
