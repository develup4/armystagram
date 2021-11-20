import React, { useState } from 'react';
import { View, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useInput from '../../components/hooks/useInput';
import AuthButton from '../../components/Auth/AuthButton';
import AuthInput from '../../components/Auth/AuthInput';
import { ToastAndroid } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { CREATE_ACCOUNT, CONFIRM_SECRET } from './AuthQueries';
import { useLogIn } from '../../commons/AuthContext';
import dimensions from '../../styles/dimensions';
import sha256 from 'sha256';

export default ({ navigation }) => {
  const logIn = useLogIn();

  const [stage, setStage] = useState('SIGNUP');
  const [loading, setLoading] = useState(false);

  // useInput
  const emailInput = useInput('');
  const userInput = useInput('');
  const pwdInput = useInput('');
  const confirmInput = useInput('');

  // Mutation
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: emailInput.value,
      username: userInput.value,
      password: sha256(pwdInput.value + 'develup4'),
    },
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: emailInput.value,
    },
  });

  // Login
  const handleSignUp = async () => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
      emailInput.value === '' ||
      userInput.value === '' ||
      pwdInput.value === ''
    ) {
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
      const { data } = await createAccountMutation();

      if (data.createAccount !== 'SUCCESS') {
        console.log(data.createAccount);
        ToastAndroid.show(data.createAccount, ToastAndroid.BOTTOM);
      } else {
        ToastAndroid.show(
          '회원가입 성공! 이메일 인증만 남았어요!',
          ToastAndroid.BOTTOM
        );
        setStage('CONFIRM');
      }
    } catch (e) {
      ToastAndroid.show('일시적인 오류가 발생했어요 ㅠ', ToastAndroid.BOTTOM);
      ToastAndroid.show(e, ToastAndroid.BOTTOM);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (confirmInput.value !== '') {
      try {
        const { data } = await confirmSecretMutation();

        if (data.confirmSecret) {
          console.log(data.confirmSecret);
          // Local login
          logIn(data.confirmSecret);

          navigation.navigate('Home');
        } else {
          ToastAndroid.show('인증에 실패했어요(시무룩)', ToastAndroid.BOTTOM);
        }
      } catch (e) {
        ToastAndroid.show('일시적인 오류가 발생했어요 ㅠ', ToastAndroid.BOTTOM);
        ToastAndroid.show(e, ToastAndroid.BOTTOM);
      }
    } else {
      ToastAndroid.show(
        '입력한 이메일에서 코드를 찾아보세요!',
        ToastAndroid.BOTTOM
      );
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

          {stage === 'SIGNUP' ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: dimensions.width / 1.2,
                height: dimensions.height / 4.25,
              }}
            >
              <AuthInput
                {...emailInput}
                placeholder='이메일'
                keyboardType='email-address'
                returnKeyType='next'
                onSubmitEditing={handleSignUp}
                autoCorrect={false}
              />
              <AuthInput
                {...userInput}
                placeholder='닉네임'
                returnKeyType='next'
                onSubmitEditing={handleSignUp}
                autoCorrect={false}
              />
              <AuthInput
                {...pwdInput}
                placeholder='비밀번호'
                returnKeyType='send'
                onSubmitEditing={handleSignUp}
                autoCorrect={false}
                password={true}
              />
              <AuthButton
                loading={loading}
                onPress={handleSignUp}
                text='회원가입'
              />
            </View>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: dimensions.width / 1.2,
                height: dimensions.height / 4.25,
              }}
            >
              <AuthInput
                {...confirmInput}
                placeholder='인증코드'
                returnKeyType='send'
                onSubmitEditing={handleConfirm}
                autoCorrect={false}
              />
              <AuthButton
                loading={loading}
                onPress={handleConfirm}
                text='확인'
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};
