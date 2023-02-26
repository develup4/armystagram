import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Input } from '../../Components/Input';
import Header from '../../Components/Header';
import Button from '../../Components/Button/Button';

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`;

const StateChangerWrapper = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

const LoginPresenter = ({ email, password, onSubmit }) => (
  <>
    <Header loading={false} />
    <Helmet>
      <title>Login | Armystagram</title>
    </Helmet>
    <form onSubmit={onSubmit}>
      <Input placeholder={'이메일'} {...email} type='email' />
      <Input placeholder={'비밀번호'} {...password} type='password' />
      <Button text={'로그인'} />
    </form>
  </>
);

const SignUpPresenter = ({ username, email, password, onSubmit }) => (
  <>
    <Helmet>
      <title>Sign up | Armystagram</title>
    </Helmet>
    <form onSubmit={onSubmit}>
      <Input placeholder={'이메일'} {...email} type='email' />
      <Input placeholder={'닉네임'} {...username} />
      <Input placeholder={'비밀번호'} {...password} type='password' />
      <Button text={'회원가입'} />
    </form>
  </>
);

const ConfirmPresenter = ({ secret, onSubmit }) => (
  <>
    <Helmet>
      <title>E-Mail confirm | Armystagram</title>
    </Helmet>
    <form onSubmit={onSubmit}>
      <Input
        placeholder='수신한 이메일의 코드를 입력해주세요'
        required
        {...secret}
      />
      <Button text={'확인'} />
    </form>
  </>
);

const StateChanger = ({ action, setAction }) => (
  <StateChangerWrapper>
    {action === 'LOGIN' ? (
      <>
        계정이 없으신가요?{' '}
        <Link onClick={() => setAction('SIGNUP')}>회원가입</Link>
      </>
    ) : (
      <>
        이미 계정이 있으신가요?{' '}
        <Link onClick={() => setAction('LOGIN')}>로그인</Link>
      </>
    )}
  </StateChangerWrapper>
);

export default ({
  action,
  setAction,
  username,
  email,
  password,
  secret,
  onSubmit,
}) => (
  <Wrapper>
    <Form>
      {action === 'LOGIN' && (
        <LoginPresenter email={email} password={password} onSubmit={onSubmit} />
      )}
      {action === 'SIGNUP' && (
        <SignUpPresenter
          username={username}
          email={email}
          password={password}
          onSubmit={onSubmit}
        />
      )}
      {action === 'CONFIRM' && (
        <ConfirmPresenter secret={secret} onSubmit={onSubmit} />
      )}
    </Form>
    {action !== 'CONFIRM' && (
      <StateChanger action={action} setAction={setAction} />
    )}
  </Wrapper>
);

// TODO: KAKAO LOGIN, NAVER LOGIN
