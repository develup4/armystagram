import React from 'react';
import styled, { keyframes } from 'styled-components';
import btsLogo from '../../Resources/Images/BTS_Logo.png';

const MemberPanel = styled.div`
  ${(props) => props.theme.whiteBox};
  height: 110px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Member = styled.span`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const gradient = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const gradient_inverse = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

const MemberImg = styled.img`
  src: url(${(props) => props.src});
  width: 60px;
  height: 60px;
  border-radius: 70%;
  border: 3px solid #dbdbdb;
  padding: 1px;
`;

const SelectedImg = styled.img`
  src: url(${(props) => props.src});
  width: 60px;
  height: 60px;
  border-radius: 70%;
  padding: 1px;
  animation: ${gradient_inverse} 1s linear infinite;
`;

const Selected = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  border-radius: 70%;
  background: -webkit-linear-gradient(left bottom, #f99d4c 0%, #c72d8f 100%);
  animation: ${gradient} 1s linear infinite;
`;

const NameText = styled.span`
  margin-top: 2px;
  font-weight: 500;
  font-size: 5px;
  color: #808080;
`;

export default ({ loading, data, selectedMember, setSelectedMember }) => {
  return (
    <MemberPanel>
      <Member
        onClick={() => {
          setSelectedMember('BTS');
        }}
      >
        {selectedMember === 'BTS' ? (
          <Selected>
            <SelectedImg src={btsLogo} />
          </Selected>
        ) : (
          <MemberImg src={btsLogo} />
        )}
        <NameText>BTS</NameText>
      </Member>
      {!loading &&
        data &&
        data.getMembers &&
        data.getMembers.map((member) => (
          <Member
            key={member.username}
            onClick={() => {
              setSelectedMember(member.username);
            }}
          >
            {selectedMember !== member.username ? (
              <MemberImg src={member.profile} />
            ) : (
              <Selected>
                <SelectedImg src={member.profile} />
              </Selected>
            )}
            <NameText>{member.username} </NameText>
          </Member>
        ))}
    </MemberPanel>
  );
};
