import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TextInput, ScrollView, Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar} from '../../components/atoms/Avatar';
import {Header} from '../../components/Header';
import {Separator} from '../../components/Separator';
import { wait } from '../../helpers/wait';
import {globalAction} from '../../store/reducers';

const PageTwo = ({navigation}) => {
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);
  const [updated, setUpdate] = useState({status: '', message: ''});
  const {selectedContact} = useSelector(state => state.globalState);
  const [singleContact, setSingleContact] = useState(selectedContact);
  const updateContact = data => {
    dispatch(globalAction.updateContactList(data));
  };

  const lastName_Ref = useRef();
  const email_Ref = useRef();
  const phone_Ref = useRef();
  const updateInput = (text, type) => {
    setSingleContact({...singleContact, [type]: text});
  };
  const updateSingleUser = () => {
    if (saving) {
      return;
    }
    Keyboard.dismiss();
    setSaving(true);
    if (Boolean(singleContact.firstName) && Boolean(singleContact.lastName)) {
      updateContact(singleContact);
      setUpdate({status: 'success', message: 'updated!'});
    } else {
      setUpdate({
        status: 'error',
        message: 'firstName and lastName are required!',
      });
    }
    setSaving(false);
    wait(2000).then(() =>
      setUpdate({
        status: '',
        message: '',
      }),
    );
  };

  const renderInput = ({label, value, onChangeText, ref, toRef}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginTop: 5,
        }}>
        <Text style={{minWidth: 85, fontSize: 17, fontWeight: 'bold'}}>
          {label}
        </Text>
        <TextInput
          ref={ref}
          style={{
            flex: 1,
            height: 40,
            marginLeft: 15,
            borderColor: '#c4c4c4',
            borderRadius: 5,
            borderWidth: 1,
          }}
          onSubmitEditing={() => {
            toRef?.focus();
          }}
          returnKeyType="next"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    );
  };

  const renderContent = () => {
    return (
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            marginVertical: 20,
            alignItems: 'center',
          }}>
          <Avatar size={100} />
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: '#c4c4c4',
              color: 'black',
            }}>
            Main Information
          </Text>
          {renderInput({
            label: 'First Name',
            onChangeText: text => {
              updateInput(text, 'firstName');
            },
            value: singleContact.firstName,
            toRef: lastName_Ref.current,
          })}
          <Separator height={1} />
          {renderInput({
            label: 'Last Name',
            onChangeText: text => {
              updateInput(text, 'lastName');
            },
            value: singleContact.lastName,
            ref: lastName_Ref,
            toRef: email_Ref.current,
          })}
          <Separator height={1} />
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: '#c4c4c4',
              color: 'black',
            }}>
            Sub Information
          </Text>
          {renderInput({
            label: 'Email',
            onChangeText: text => {
              updateInput(text, 'email');
            },
            value: singleContact.email,
            ref: email_Ref,
            toRef: phone_Ref.current,
          })}
          <Separator height={1} />
          {renderInput({
            label: 'Phone',
            onChangeText: text => {
              updateInput(text, 'phone');
            },
            value: singleContact.phone,
            ref: phone_Ref,
          })}
          <Separator height={1} />
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header
        leftTitle="Cancel"
        onPressLeft={() => {
          navigation.goBack();
        }}
        rightTitle="Save"
        onPressRight={updateSingleUser}
      />
      {Boolean(updated.status) && (
        <View
          style={{
            backgroundColor: updated.status === 'success' ? 'green' : 'red',
            height: 46,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}>
            {updated.message}
          </Text>
        </View>
      )}
      {selectedContact ? renderContent() : <Text>Loading...</Text>}
    </View>
  );
};

export default PageTwo;
