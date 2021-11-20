import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import AuthPresenter from './AuthPresenter';
import { useInput } from '../../Components/Input';
import { useMutation } from 'react-apollo-hooks';
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
} from './AuthQueries';
import sha256 from 'sha256';
import { toast } from 'react-toastify';

export default withRouter(({ history }) => {
  // LOGIN, SIGNUP, CONFIRM
  const [action, setAction] = useState('LOGIN');

  // useInput
  const username = useInput('');
  const secret = useInput('');
  const email = useInput('');
  const password = useInput('');

  // GraphQL
  const requestLoginMutation = useMutation(LOG_IN, {
    variables: {
      email: email.value,
      password: sha256(password.value + 'develup4'),
    },
  });

  const createAccountMutation = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      password: sha256(password.value + 'develup4'),
    },
  });

  const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value,
    },
  });

  const localLogInMutation = useMutation(LOCAL_LOG_IN);

  // Submit function
  const loginOnSubmit = async () => {
    if (email.value !== '' && password.value !== '') {
      try {
        const { data } = await requestLoginMutation();

        if (data && data !== undefined && data.requestLogin) {
          if (data.requestLogin === 'FAIL') {
            toast.error('로그인에 실패했어요');
          } else if (data.requestLogin === 'NOT_CONFIRM_YET') {
            toast.error('이메일 인증이 완료되지 않았어요');
            setAction('CONFIRM');
            history.push('/auth');
          } else {
            localLogInMutation({ variables: { token: data.requestLogin } });
            history.push('/');
            window.location.reload();
          }
        } else {
          toast.error('로그인에 실패했어요');
        }
      } catch (e) {
        toast.error('일시적인 오류가 발생했어요 ㅠ');
        toast.error(e.message);
      }
    } else {
      toast.error('빠진 정보가 있어요!');
    }
  };

  const signUpOnSubmit = async () => {
    if (email.value !== '' && username.value !== '' && password.value !== '') {
      try {
        const { data } = await createAccountMutation();

        if (data.createAccount !== 'SUCCESS') {
          toast.error(data.createAccount);
        } else {
          toast.success('회원가입 성공! 이메일 인증만 남았어요!');
          setAction('CONFIRM');
        }
      } catch (e) {
        toast.error('일시적인 오류가 발생했어요 ㅠ');
        toast.error(e.message);
      }
    } else {
      toast.error('빠진 정보가 있어요!');
    }
  };

  const confirmOnSubmit = async () => {
    if (secret.value !== '') {
      try {
        const { data } = await confirmSecretMutation();

        if (data.confirmSecret) {
          localLogInMutation({ variables: { token: data.confirmSecret } });
          history.push('/');
          window.location.reload();
        } else {
          toast.error('인증에 실패했어요(시무룩)');
        }
      } catch (e) {
        toast.error('일시적인 오류가 발생했어요 ㅠ');
        toast.error(e.message);
      }
    } else {
      toast.error('입력한 이메일에서 코드를 찾아보세요!');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (action === 'LOGIN') {
      loginOnSubmit();
    } else if (action === 'SIGNUP') {
      signUpOnSubmit();
    } else if (action === 'CONFIRM') {
      confirmOnSubmit();
    }
  };

  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      username={username}
      email={email}
      password={password}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
});
