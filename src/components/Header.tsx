import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-remix-icon';

export const Header = (props: any) => {
  const {
    title,
    leftIcon,
    rightIcon,
    leftTitle,
    rightTitle,
    onPressLeft,
    onPressRight,
  } = props;
  return (
    <View
      style={{
        height: 56,
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}>
      <TouchableOpacity onPress={onPressLeft}>
        {Boolean(leftIcon) && (
          <Icon name={leftIcon} size={30} color="#ff8c00" />
        )}
        {Boolean(leftTitle) && (
          <Text style={{fontSize: 22, color: '#ff8c00'}}>{leftTitle}</Text>
        )}
      </TouchableOpacity>
      {Boolean(title) && (
        <Text style={{fontWeight: 'bold', fontSize: 22, color: 'black'}}>
          {title}
        </Text>
      )}
      <TouchableOpacity onPress={onPressRight}>
        {Boolean(rightIcon) && (
          <Icon name={rightIcon} size={30} color="#ff8c00" />
        )}
        {Boolean(rightTitle) && (
          <Text style={{fontSize: 22, color: '#ff8c00'}}>{rightTitle}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
