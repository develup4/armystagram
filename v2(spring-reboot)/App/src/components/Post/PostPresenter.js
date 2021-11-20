import React from 'react';
import styled from 'styled-components';
import { Image, Platform, View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FacePile from 'react-native-face-pile';
import MessageLink from '../MessagesLink';
import Swiper from 'react-native-swiper';
import dimensions from '../../styles/dimensions';
import theme from '../../styles/theme';

const Container = styled.View`
  margin-bottom: 20px;
  background-color: white;
`;

const Header = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`
  flex-direction: row;
  margin-left: 10px;
`;

const PictureCount = styled.Text`
  margin-left: 10px;
  font-size: 9px;
  font-family: HelveticaNeueLt;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
  margin-left: 5px;
`;

const IconContainer = styled.View`
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  padding-left: 10px;
`;

const Caption = styled.Text`
  margin: 5px 0px;
  font-family: 'NanumSquareRoundL';
  font-size: 13;
`;

export default ({
  isLogin,
  user: { username, profile, isFollowing, isMember, isSelf },
  caption,
  follow,
  files,
  likes,
  isLiked,
  likeCount,
  toggleLike,
  mergedComments,
  newComment,
  onSubmit,
  createdAt,
  foldComments,
  toggleFold,
  navigation,
}) => {
  const foldCommentNumber = 4;

  let likeAvatar = [];
  likes.map((like) => {
    if (like.user.isMember) {
      likeAvatar.push({ id: like.user.username, imageUrl: like.user.profile });
    }
  });

  return (
    <Container>
      <Header>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{ height: 35, width: 35, borderRadius: 20 }}
            source={{ uri: profile }}
          />
          <View style={{ flexDirection: 'column' }}>
            <HeaderUserContainer>
              <Touchable
                onPress={() => navigation.navigate('UserDetail', { username })}
              >
                <Text style={{ fontFamily: 'HelveticaNeueLt' }}>
                  {username}
                </Text>
              </Touchable>
              {isMember && (
                <Image
                  style={{
                    width: 15,
                    height: 15,
                    marginLeft: 2,
                    marginTop: 1,
                  }}
                  source={require('../../../assets/Images/influencer.png')}
                />
              )}
            </HeaderUserContainer>
            <PictureCount>
              {files.length === 1 ? '1 picture' : `${files.length} pictures`}
            </PictureCount>
          </View>
        </View>
        {!isSelf && !isFollowing && isLogin && (
          <Touchable onPress={follow}>
            <Ionicons
              style={{ marginRight: 5 }}
              color={theme.blackColor}
              size={24}
              name={Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'}
            />
          </Touchable>
        )}
      </Header>

      <Swiper
        showsPagination={true}
        paginationStyle={{ position: 'relative', top: 5 }}
        loop={true}
        style={{ height: dimensions.width }}
      >
        {files.map((file) => (
          <Image
            key={file.id}
            style={{ width: dimensions.width, height: dimensions.width }}
            source={{ uri: file.url }}
          />
        ))}
      </Swiper>

      {files.length === 1 && <View style={{ marginTop: 10 }} />}

      <InfoContainer>
        <IconsContainer>
          <Touchable onPress={toggleLike}>
            <IconContainer>
              <Ionicons
                size={24}
                color={isLiked ? theme.redColor : theme.blackColor}
                name={
                  Platform.OS === 'ios'
                    ? isLiked
                      ? 'ios-heart'
                      : 'ios-heart-empty'
                    : isLiked
                    ? 'md-heart'
                    : 'md-heart-empty'
                }
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons
                style={{ marginLeft: 1 }}
                color={theme.blackColor}
                size={24}
                name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'}
              />
            </IconContainer>
          </Touchable>
          <MessageLink size={26} />
        </IconsContainer>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'HelveticaNeueMd', marginRight: 5 }}>
            {likeCount === 1 ? '1 like' : `${likeCount} likes`}
          </Text>

          <FacePile
            numFaces={likeAvatar.length}
            faces={likeAvatar}
            imageStyle={{ width: 30, height: 30, marginRight: 10 }}
          />
        </View>

        <Caption>
          <Text style={{ fontFamily: 'HelveticaNeueMd' }}>{username}</Text>{' '}
          {caption}
        </Caption>

        {mergedComments.length > foldCommentNumber &&
          (foldComments === true ? (
            <Touchable onPress={toggleFold}>
              <Text
                style={{
                  margin: 3,
                  marginTop: 2,
                  fontFamily: 'NanumSquareRoundL',
                  fontSize: 12,
                  color: '#999',
                }}
              >
                댓글 {mergedComments.length}개 모두 보기
              </Text>
            </Touchable>
          ) : (
            <Touchable onPress={toggleFold}>
              <Text
                style={{
                  margin: 3,
                  marginTop: 2,
                  fontFamily: 'NanumSquareRoundL',
                  fontSize: 12,
                  color: '#999',
                }}
              >
                댓글 닫기
              </Text>
            </Touchable>
          ))}

        {mergedComments &&
          mergedComments.map(
            (comment, index) =>
              ((foldComments &&
                mergedComments.length - index <= foldCommentNumber) ||
                !foldComments) && (
                <View key={comment.id} style={{ flexDirection: 'row' }}>
                  {/* <Touchable
                    onPress={() =>
                      navigation.navigate('UserDetail', { comment.user.username })
                    }
                  > */}
                  <Text style={{ fontFamily: 'HelveticaNeueMd', fontSize: 12 }}>
                    {comment.user.username}{' '}
                  </Text>
                  {/* </Touchable> */}
                  {comment.user.isMember && (
                    <Image
                      style={{
                        width: 10,
                        height: 10,
                        marginTop: 2,
                        marginRight: 5,
                        marginLeft: -2,
                      }}
                      source={require('../../../assets/Images/influencer.png')}
                    />
                  )}
                  <Text
                    style={{ fontFamily: 'NanumSquareRoundL', fontSize: 12 }}
                  >
                    {comment.text}
                  </Text>
                </View>
              )
          )}

        <Text
          style={{
            fontFamily: 'NanumSquareRoundL',
            fontSize: 12,
            marginTop: 5,
          }}
        >{`${createdAt.split('T')[0]} ${
          createdAt.split('T')[1].split('.')[0]
        }`}</Text>

        <TextInput
          style={{
            fontFamily: 'NanumSquareRoundL',
          }}
          onSubmitEditing={onSubmit}
          placeholder={'댓글 달기...'}
          value={newComment.value}
          onChangeText={newComment.onChange}
        />
      </InfoContainer>
    </Container>
  );
};
