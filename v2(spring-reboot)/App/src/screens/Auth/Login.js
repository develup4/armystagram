import React, { useState } from 'react';
import styled from 'styled-components';
import {
  View,
  Text,
  Image,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useInput from '../../components/hooks/useInput';
import AuthButton from '../../components/Auth/AuthButton';
import AuthInput from '../../components/Auth/AuthInput';
import { ToastAndroid } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { LOG_IN } from './AuthQueries';
import { useLogIn } from '../../commons/AuthContext';
import dimensions from '../../styles/dimensions';
import sha256 from 'sha256';

const SignupLinkText = styled.Text`
  color: ${(props) => props.theme.blueColor};
  font-weight: 600;
`;

export default ({ navigation }) => {
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);

  // useInput
  const emailInput = useInput('');
  const pwdInput = useInput('');

  // Mutation
  const [requestLoginMutation] = useMutation(LOG_IN, {
    variables: {
      email: emailInput.value,
      password: sha256(pwdInput.value + 'develup4'),
    },
  });

  // Login
  const handleLogin = async () => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailInput.value === '' || pwdInput.value === '') {
      ToastAndroid.show('빠진 정보가 있어요!', ToastAndroid.BOTTOM);
      return;
    } else if (
      !emailInput.value.includes('@') ||
      !emailInput.value.includes('.')
    ) {
      ToastAndroid.show('이메일 형식이 아니에요', ToastAndroid.BOTTOM);
      return;
    } else if (!emailRegex.test(emailInput.value)) {
      ToastAndroid.show('이메일 형식이 아니에요', ToastAndroid.BOTTOM);
      return;
    }

    try {
      setLoading(true);
      const { data } = await requestLoginMutation();

      // Check failure
      if (data.requestLogin === 'FAIL') {
        ToastAndroid.show(
          '로그인에 실패했어요. 입력내용을 확인해주세요.',
          ToastAndroid.BOTTOM
        );
      } else if (data.requestLogin === 'NOT_CONFIRM_YET') {
        ToastAndroid.show(
          '이메일 인증이 완료되지 않았어요',
          ToastAndroid.BOTTOM
        );

        navigation.navigate('Confirm');
      }

      // Local login
      logIn(data.requestLogin);
    } catch (e) {
      ToastAndroid.show('일시적인 오류가 발생했어요 ㅠ', ToastAndroid.BOTTOM);
    } finally {
      ToastAndroid.show('로그인에 성공했습니다!', ToastAndroid.BOTTOM);

      setLoading(false);
      navigation.navigate('Home');
    }
  };

  return (
    <KeyboardAwareScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            resizeMode={'contain'}
            source={require('../../../assets/Images/logo.png')}
            style={{
              marginTop: 250,
              width: dimensions.width / 2.5,
              height: dimensions.height / 3,
            }}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: dimensions.width / 1.2,
              height: dimensions.height / 4.5,
            }}
          >
            <AuthInput
              {...emailInput}
              placeholder='이메일'
              keyboardType='email-address'
              returnKeyType='next'
              onSubmitEditing={handleLogin}
              autoCorrect={false}
            />
            <AuthInput
              {...pwdInput}
              placeholder='비밀번호'
              returnKeyType='send'
              onSubmitEditing={handleLogin}
              autoCorrect={false}
              password={true}
            />
            <AuthButton loading={loading} onPress={handleLogin} text='로그인' />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontFamily: 'NanumGothic', fontSize: 12 }}>
                계정이 없으신가요?{'  '}
              </Text>
              <SignupLinkText
                style={{ fontFamily: 'NanumGothic', fontSize: 12 }}
              >
                회원가입
              </SignupLinkText>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};
