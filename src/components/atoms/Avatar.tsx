import React from 'react';
import {View} from 'react-native';

export const Avatar = (props: any) => {
  const {size} = props;

  return (
    <View
      style={{
        borderRadius: 100,
        backgroundColor: '#ff8c00',
        width: size,
        height: size,
      }}
    />
  );
};
