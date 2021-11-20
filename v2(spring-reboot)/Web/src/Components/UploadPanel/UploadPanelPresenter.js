import React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import '@webscopeio/react-textarea-autocomplete/style.css';
import Button from '../Button/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Hashtags } from '../../Resources/Datas/Hashtags';
import { IconButton, Avatar, Tooltip, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const UploadPanel = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 900;
  margin-left: 5px;
  color: #8e8e8e;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CameraButton = styled(IconButton)`
  width: 10px;
  height: 10px;
`;

const UploadWrapper = styled.div`
  width: 60px;
  margin-left: 5px;
`;

const Textarea = styled(TextareaAutosize)`
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const HashtagArea = styled.div`
  margin-left: 7px;
  width: 245px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  z-index: -1;
`;

const UploadImageWrapper = styled.div`
  margin-top: 7px;
  margin-left: 7px;
  width: 245px;
  display: flex;
  justify-content: flex-start;
  z-index: -1;
`;

const PictureSelectInput = styled.input`
  display: none;
`;

const PictureSelectIcon = styled(PhotoCamera)`
  color: ${(props) => props.theme.blueColor};
`;

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Item = ({ entity: { name, char } }) => (
  <span style={{ color: '#3897f0' }}>{`# ${name}`}</span>
);
const Loading = ({ data }) => <div>Loading</div>;

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default ({
  caption,
  hashtags,
  addHashtag,
  previews,
  onAddImage,
  onUpload,
}) => {
  const classes = useStyles();
  return (
    <UploadPanel>
      <TitleWrapper>
        <Title>새 게시물</Title>
        <ButtonWrapper>
          <PictureSelectInput
            accept='image/*'
            id='icon-button-file'
            type='file'
            multiple={true}
            onChange={onAddImage}
          />
          <label htmlFor='icon-button-file'>
            <CameraButton color='default' component='span'>
              <Tooltip
                title={'여러 장의 사진을 한번에 올릴 수 있어요'}
                placement='top'
                arrow
              >
                <PictureSelectIcon />
              </Tooltip>
            </CameraButton>
          </label>
          <UploadWrapper>
            <Button text={'업로드'} onClick={onUpload}></Button>
          </UploadWrapper>{' '}
        </ButtonWrapper>
      </TitleWrapper>

      <ReactTextareaAutocomplete
        loadingComponent={Loading}
        textAreaComponent={{ component: Textarea, ref: 'innerRef' }}
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          fontSize: '12px',
        }}
        containerStyle={{
          width: '248px',
          height: '100px',
          marginTop: '5px',
          marginLeft: '5px',
          marginBottom: '4px',
          resize: 'none',
        }}
        itemStyle={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          fontSize: '12px',
          border: 'none',
        }}
        onItemSelected={addHashtag}
        minChar={0}
        maxLength={140}
        trigger={{
          '#': {
            dataProvider: (token) => {
              return shuffle(Hashtags);
            },
            component: Item,
            output: (item, trigger) => item.char,
          },
        }}
        value={caption.value}
        onChange={caption.onChange}
        placeholder={'해시태그는 #으로 추가할 수 있어요'}
      />

      <HashtagArea>
        {hashtags.map(
          (hashtag, index) =>
            hashtag && (
              <Chip
                key={index}
                label={hashtag}
                size='small'
                variant='outlined'
                clickable
              />
            )
        )}
      </HashtagArea>
      <UploadImageWrapper>
        <AvatarGroup max={5}>
          {previews.map((preview, index) => (
            <Avatar key={index} className={classes.large} src={preview} />
          ))}
        </AvatarGroup>
      </UploadImageWrapper>
    </UploadPanel>
  );
};
