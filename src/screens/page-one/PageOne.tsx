import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {globalAction} from '../../store/reducers';
import {RouteNames} from '../../constants';
import data from '../../allContacts/data.json';
import {Avatar} from '../../components/atoms/Avatar';
import {Header} from '../../components/Header';
import {wait} from '../../helpers/wait';

const PageOne = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const {contactlist} = useSelector(state => state.globalState);
  const [refreshing, setRefreshing] = React.useState(false);

  const updateReduxContact = (data: any) => {
    dispatch(globalAction.setContact(data));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    updateReduxContact(data);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(globalAction.updateSelectedContact(item));
          navigation.navigate(RouteNames.PageTwo);
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
      updateReduxContact(data);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        title="Contacts"
        leftIcon="ri-search-line"
        onPressLeft={() => {}}
        rightIcon="ri-add-line"
        onPressRight={() => {}}
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
