import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {globalAction} from '../../store/reducers';
import {RouteNames} from '../../constants';
import data from '../../allContacts/data.json';
import {Avatar} from '../../components/atoms/Avatar';
import {Header} from '../../components/Header';

const PageOne = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {contactlist} = useSelector(state => state.globalState);

  const updateReduxContact = data => {
    dispatch(globalAction.setContact(data));
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => {
        dispatch(globalAction.updateSelectedContact(item));
        navigation.navigate(RouteNames.PageTwo)
      }}>
        <View
          style={{
            flexDirection: 'row',
            minHeight: 56,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <Avatar size={48} style={{backgroundColor: 'transparent'}} />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontWeight: '700',
              color: 'black',
            }}>{`${item.firstName} ${item.lastName}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (!Boolean(contactlist)) {
      console.log(data);
      updateReduxContact(data);
    } else {
      console.log('data => ', contactlist);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        title="Contacts"
        leftIcon="ri-search-line"
        onPressLeft={()=>{}}
        rightIcon="ri-add-line"
        onPressRight={()=>{}}
      />
      {contactlist ? (
        <FlatList
          data={contactlist}
          renderItem={renderItem}
          keyExtractor={item => `contacts-${item.id}`}
          style={{
            flex: 1,
            width: '100%',
            paddingHorizontal: 10,
            paddingTop: 10,
          }}
          contentContainerStyle={{paddingBottom: 10}}
          ItemSeparatorComponent={() => {
            return <View style={{height: 1, backgroundColor: 'gray'}}></View>;
          }}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default PageOne;
