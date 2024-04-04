import React, { useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getContactsList } from '../../store/actions';
import { Form, List, Loading, Spacer, Text } from '../components';
import { ContactsListProps } from '../types/dataTypes';

const RenderContactItem = ({ item }: { item: any }) => {
  if (item) {
    const { firstName, lastName, photo } = item;
    // console.log(item);
    return <List leftImage={photo} label={`${firstName} ${lastName}`} />;
  }
};

const DATA: ContactsListProps = {
  message: 'Get contacts',
  data: [
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
    {
      id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Luke',
      lastName: 'Skywalker',
      age: 20,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      age: 50,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
      id: '0d7481f0-f1e8-11ee-be77-1531bc1edd89',
    },
    {
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
      id: '5d793160-f1f1-11ee-be77-1531bc1edd89',
    },
    {
      firstName: 'Bilbso',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
      id: '6570d5d0-f1f1-11ee-be77-1531bc1edd89',
    },
    {
      firstName: 'Pokemon',
      lastName: 'Dot',
      age: 20,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
      id: '6e083cb0-f1f1-11ee-be77-1531bc1edd89',
    },
    {
      firstName: 'Luke',
      lastName: 'Skywalker',
      age: 20,
      photo:
        'file:///Users/loratech/Library/Developer/CoreSimulator/Devices/503A1561-8C8C-4239-BA09-173716F26369/data/Containers/Data/Application/2CC53E6C-BD1D-41EB-B2D0-0EFEDE3DD58C/Library/Caches/ExponentExperienceData/%2540anonymous%252Fcontact-app-e58fc7ae-3f69-45f5-bc0c-cdc9aabf3bf3/ImagePicker/ACE8E92F-306A-4C2E-8691-A89725E4FB0E.jpg',
      id: '2aba5be0-f1f2-11ee-be77-1531bc1edd89',
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      age: 22,
      photo:
        'file:///Users/loratech/Library/Developer/CoreSimulator/Devices/503A1561-8C8C-4239-BA09-173716F26369/data/Containers/Data/Application/2CC53E6C-BD1D-41EB-B2D0-0EFEDE3DD58C/Library/Caches/ExponentExperienceData/%2540anonymous%252Fcontact-app-e58fc7ae-3f69-45f5-bc0c-cdc9aabf3bf3/ImagePicker/AB80BFC8-B376-4B49-9ADE-CE091EE371B1.jpg',
      id: '2a8573c0-f1f3-11ee-be77-1531bc1edd89',
    },
    {
      firstName: 'Mawar',
      lastName: 'Melati',
      age: 33,
      photo:
        'file:///Users/loratech/Library/Developer/CoreSimulator/Devices/503A1561-8C8C-4239-BA09-173716F26369/data/Containers/Data/Application/2CC53E6C-BD1D-41EB-B2D0-0EFEDE3DD58C/Library/Caches/ExponentExperienceData/%2540anonymous%252Fcontact-app-e58fc7ae-3f69-45f5-bc0c-cdc9aabf3bf3/ImagePicker/86309FAF-ED66-41B2-8242-679927A2EE88.jpg',
      id: '7d6a4ed0-f1f3-11ee-be77-1531bc1edd89',
    },
    {
      firstName: 'Daun',
      lastName: 'Hijau',
      age: 33,
      photo:
        'file:///Users/loratech/Library/Developer/CoreSimulator/Devices/503A1561-8C8C-4239-BA09-173716F26369/data/Containers/Data/Application/2CC53E6C-BD1D-41EB-B2D0-0EFEDE3DD58C/Library/Caches/ExponentExperienceData/%2540anonymous%252Fcontact-app-e58fc7ae-3f69-45f5-bc0c-cdc9aabf3bf3/ImagePicker/4C48FCD7-191C-4818-BC0F-805DD9F9587B.jpg',
      id: 'ec83ed80-f1f3-11ee-be77-1531bc1edd89',
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      age: 33,
      photo:
        'file:///Users/loratech/Library/Developer/CoreSimulator/Devices/503A1561-8C8C-4239-BA09-173716F26369/data/Containers/Data/Application/2CC53E6C-BD1D-41EB-B2D0-0EFEDE3DD58C/Library/Caches/ExponentExperienceData/%2540anonymous%252Fcontact-app-e58fc7ae-3f69-45f5-bc0c-cdc9aabf3bf3/ImagePicker/AB80BFC8-B376-4B49-9ADE-CE091EE371B1.jpg',
      id: '37fb89d0-f1f4-11ee-be77-1531bc1edd89',
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      age: 33,
      photo:
        'file:///Users/loratech/Library/Developer/CoreSimulator/Devices/503A1561-8C8C-4239-BA09-173716F26369/data/Containers/Data/Application/2CC53E6C-BD1D-41EB-B2D0-0EFEDE3DD58C/Library/Caches/ExponentExperienceData/%2540anonymous%252Fcontact-app-e58fc7ae-3f69-45f5-bc0c-cdc9aabf3bf3/ImagePicker/AB80BFC8-B376-4B49-9ADE-CE091EE371B1.jpg',
      id: '4d888190-f1f4-11ee-be77-1531bc1edd89',
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      age: 33,
      id: '5f392980-f1f4-11ee-be77-1531bc1edd89',
      photo: 'N/A',
    },
    {
      firstName: 'Bambang',
      lastName: 'Pacul',
      age: 27,
      photo:
        'file:///Users/loratech/Library/Developer/CoreSimulator/Devices/503A1561-8C8C-4239-BA09-173716F26369/data/Containers/Data/Application/2CC53E6C-BD1D-41EB-B2D0-0EFEDE3DD58C/Library/Caches/ExponentExperienceData/%2540anonymous%252Fcontact-app-e58fc7ae-3f69-45f5-bc0c-cdc9aabf3bf3/ImagePicker/1B2F0AA0-BD0C-47EC-A058-7040E729D33E.jpg',
      id: '6bd31af0-f1f6-11ee-be77-1531bc1edd89',
    },
    {
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
      id: '9e6d8870-f209-11ee-be77-1531bc1edd89',
    },
    {
      age: 39,
      firstName: 'John',
      lastName: 'Cena',
      photo:
        'data:image/png;base64,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',
      id: '964cac20-f240-11ee-be77-1531bc1edd89',
    },
    {
      age: 23,
      firstName: 'Asep',
      lastName: 'Indomie',
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
      id: '1a21a540-f242-11ee-be77-1531bc1edd89',
    },
    {
      firstName: 'mHmud',
      lastName: 'mmm',
      age: 25,
      photo: 'wkwkwk',
      id: '45712e40-f243-11ee-be77-1531bc1edd89',
    },
  ],
};

export default ({ route, navigation }) => {
  const [search, setSearch] = useState('');
  const [calls, setCalls] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { data: contactsListQuery } = useSelector(
    (state: any) => state.contactsList,
  );
  const contactsListData = useMemo<ContactsListProps>(() => {
    return {
      message: DATA.message,
      data: DATA.data.map(item =>
        `${item.firstName} ${item.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase())
          ? item
          : null,
      ),
    };
  }, [search]);

  const queryContactsHandler = () => {
    setLoading(true);

    if (!calls) {
      dispatch(
        getContactsList({
          onSuccess: () => setLoading(false),
          onError: () => setLoading(false),
        }),
      );
    }
  };

  useEffect(() => {
    if (contactsListQuery && !calls) {
      // console.log(contactsListQuery);
      setCalls(true);
    }
  }, [contactsListQuery, calls]);

  useEffect(() => {
    if (!calls) {
      queryContactsHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calls]);

  // if (loading) {
  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <Loading />
  //     </SafeAreaView>
  //   );
  // }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Form
          pressable={false}
          input={search}
          onChangeText={v => setSearch(v)}
        />
        <Spacer height={24} />
        <Spacer
          width={Dimensions.get('window').width}
          style={{ borderColor: '#eee', borderBottomWidth: 1 }}
        />
        <FlatList
          data={contactsListData.data}
          renderItem={RenderContactItem}
          keyExtractor={item => item?.id}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonNavigateToSearch: {
    position: 'absolute',
    backgroundColor: 'red',
    flex: 1,
    width: '100%',
    height: 46,
    justifyContent: 'center',
  },
});
