import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'rl-react-helmet';
import Header from '../../Components/Header';
import Post from '../../Components/Post';
import MemberPanel from '../../Components/MemberPanel';
import MiniProfile from '../../Components/MiniProfile';
import UploadPanel from '../../Components/UploadPanel';
import Filter from '../../Components/Filter';
import Footer from '../../Components/Footer';
import { Skeleton } from '../../Components/Post/Skeleton';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  padding: 0px;
  display: flex;
  justify-content: space-around;
`;

const LeftPanel = styled.div`
  width: 650px;
  display: flex;
  flex-direction: column;
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 285px;
  padding-left: 30px;
`;

const RigitFixedWrapper = styled.div`
  position: fixed;
`;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default ({
  isLogin,
  loading,
  setMutationLoading,
  posts,
  selectedMember,
  setSelectedMember,
  filterState,
  setFilterState,
}) => {
  return (
    <>
      <Header loading={loading} />
      <Wrapper>
        <Helmet>
          <title>Feed | Armystagram</title>
        </Helmet>
        <LeftPanel>
          <MemberPanel
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
          />
          <PostWrapper>
            {loading && <Skeleton />}
            {!loading &&
              posts &&
              posts.map((post) => (
                <Post
                  isLogin={isLogin}
                  key={post.id}
                  id={post.id}
                  caption={post.caption}
                  user={post.user}
                  files={post.files}
                  likes={post.likes}
                  likeCount={post.likeCount}
                  isLiked={isLogin ? post.isLiked : false}
                  comments={post.comments}
                  createdAt={post.createdAt}
                />
              ))}
          </PostWrapper>
        </LeftPanel>
        <RightPanel>
          <RigitFixedWrapper>
            <MiniProfile isLogin={isLogin} />
            <Filter
              isLogin={isLogin}
              filterState={filterState}
              setFilterState={setFilterState}
            />
            <UploadPanel
              isLogin={isLogin}
              loading={loading}
              setMutationLoading={setMutationLoading}
            />
            <Footer />
          </RigitFixedWrapper>
        </RightPanel>
      </Wrapper>
    </>
  );
};
