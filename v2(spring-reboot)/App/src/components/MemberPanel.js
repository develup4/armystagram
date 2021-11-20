import React from 'react';
import { ScrollView, Image, Text, TouchableOpacity, View } from 'react-native';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import dimensions from '../../src/styles/dimensions';

export const GET_MEMBERS = gql`
  {
    getMembers {
      username
      profile
    }
  }
`;

export default ({ selectedMember, setSelectedMember }) => {
  const { data, loading } = useQuery(GET_MEMBERS);

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 10, marginBottom: 10, backgroundColor: 'white' }}
    >
      <TouchableOpacity
        onPress={() => {
          setSelectedMember('BTS');
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 10,
        }}
      >
        {selectedMember === 'BTS' ? (
          <LinearGradient
            colors={['#f99d4c', '#c72d8f']}
            style={{ borderRadius: 200, padding: 2 }}
          >
            <Image
              style={{
                width: dimensions.width / 7,
                height: dimensions.width / 7,
                paddingBottom: 10,
              }}
              source={require('../../assets/Images/BTS_Logo.png')}
            />
          </LinearGradient>
        ) : (
          <View
            style={{
              borderWidth: 2,
              borderColor: '#dbdbdb',
              borderRadius: 200,
            }}
          >
            <Image
              style={{
                width: dimensions.width / 7,
                height: dimensions.width / 7,
                paddingBottom: 10,
              }}
              source={require('../../assets/Images/BTS_Logo.png')}
            />
          </View>
        )}
        <Text
          style={{
            fontFamily: 'HelveticaNeueMd',
            color: '#808080',
            fontSize: 10,
            marginTop: 5,
          }}
        >
          BTS
        </Text>
      </TouchableOpacity>

      {!loading &&
        data &&
        data.getMembers &&
        data.getMembers.map((member) => (
          <TouchableOpacity
            key={member.username}
            onPress={() => {
              setSelectedMember(member.username);
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 10,
            }}
          >
            {selectedMember === member.username ? (
              <LinearGradient
                colors={['#f99d4c', '#c72d8f']}
                style={{ borderRadius: 200, padding: 3 }}
              >
                <Image
                  style={{
                    width: dimensions.width / 7,
                    height: dimensions.width / 7,
                    paddingBottom: 10,
                    borderRadius: 200,
                  }}
                  source={{ uri: member.profile }}
                />
              </LinearGradient>
            ) : (
              <View
                style={{
                  borderWidth: 2,
                  borderColor: '#dbdbdb',
                  borderRadius: 200,
                }}
              >
                <Image
                  style={{
                    width: dimensions.width / 7,
                    height: dimensions.width / 7,
                    paddingBottom: 10,
                    borderRadius: 200,
                    margin: 2,
                  }}
                  source={{ uri: member.profile }}
                />
              </View>
            )}
            <Text
              style={{
                fontFamily: 'HelveticaNeueMd',
                color: '#808080',
                fontSize: 10,
                marginTop: 5,
              }}
            >
              {member.username}
            </Text>
          </TouchableOpacity>
        ))}
      <Divider />
    </ScrollView>
  );
};
