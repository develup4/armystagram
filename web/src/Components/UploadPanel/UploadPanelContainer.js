import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadPanelPresenter from './UploadPanelPresenter';
import { UPLOAD } from './UploadPanelQueries';
import { useMutation } from 'react-apollo-hooks';
import { useInput } from '../Input';
import { toast } from 'react-toastify';

const UploadPanelContainer = ({ isLogin, loading, setMutationLoading }) => {
  const caption = useInput('');
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    const tags = caption.value.match(/#\S+/g);
    if (Array.isArray(tags) === true) {
      setHashtags(tags);
    } else {
      setHashtags([tags]);
    }
  }, [caption.value]);

  const addHashtag = (hashtag) => {
    console.log(hashtag.item.name);
    setHashtags((hashtags) => [...hashtags, hashtag.item.char]);
  };

  const [pictures, setPictures] = useState([]);
  const [previews, setPreviews] = useState([]);
  const uploadMutation = useMutation(UPLOAD);

  const onAddImage = (e) => {
    const files = [...e.target.files];
    files.map((file) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((previews) => [...previews, reader.result]);
      };

      setPictures((pictures) => [...pictures, file]); // Need to array function to refresh
      reader.readAsDataURL(file);
      return files;
    });
  };

  const onUpload = async () => {
    // Prevent to overlap(double click)
    if (loading) {
      return;
    }

    if (!isLogin) {
      toast.error('로그인을 해야해요');
      return;
    }

    if (pictures.length === 0) {
      toast.error('카메라 모양 버튼을 눌러 사진을 먼저 추가하세요~');
      return;
    }

    try {
      setMutationLoading(true);

      const formData = new FormData();
      pictures.forEach((picture) => {
        formData.append('arrayOfFilesName', picture);
      });

      await axios({
        method: 'POST',
        url: process.env.NODE_ENV === 'development'? 'http://localhost:4000/api/upload': 'https://armystagram-backend.herokuapp.com/api/upload',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(function (response) {
        console.log(response.data);

        // Mutation
        uploadMutation({
          variables: {
            files: response.data,
            caption: caption.value,
            hashtags,
          },
        });

        window.location.reload();
      });
    } catch (e) {
      toast.error(e);
    } finally {
      setMutationLoading(false);
    }
  };

  return (
    <UploadPanelPresenter
      caption={caption}
      hashtags={hashtags}
      addHashtag={addHashtag}
      previews={previews}
      onAddImage={onAddImage}
      onUpload={onUpload}
    />
  );
};

export default UploadPanelContainer;
