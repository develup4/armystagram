import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer``;

const List = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  margin: 0px 0px;
  margin-bottom: 5px;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Link = styled.a`
  color: #cacaca;
`;

const CopyrightWrapper = styled.div`
  margin-top: 15px;
`;
const Copyright = styled.span`
  color: #c0c0c0;
`;

export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link href='#'>·소개</Link>
      </ListItem>
      <ListItem>
        <Link href='#'>·도움말</Link>
      </ListItem>
      <ListItem>
        <Link href='#'>·홍보센터</Link>
      </ListItem>
      <ListItem>
        <Link href='#'>·API</Link>
      </ListItem>
      <ListItem>
        <Link href='#'>·채용정보</Link>
      </ListItem>
    </List>
    <List>
      <ListItem>
        <Link href='#'>·약관</Link>
      </ListItem>
      <ListItem>
        <Link href='#'>·위치</Link>
      </ListItem>
      <ListItem>
        <Link href='#'>·인기 계정</Link>
      </ListItem>
      <ListItem>
        <Link href='#'>·해시태그</Link>
      </ListItem>
      <ListItem>
        <Link href='#'>·언어</Link>
      </ListItem>
    </List>
    <CopyrightWrapper>
      <Copyright>&copy;{new Date().getFullYear()} ARMYSTAGRAM</Copyright>
    </CopyrightWrapper>
  </Footer>
);
