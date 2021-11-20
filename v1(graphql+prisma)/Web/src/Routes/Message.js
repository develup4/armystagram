import React from 'react';
import { Helmet } from 'rl-react-helmet';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

export default withRouter(({ history }) => {
  toast.error('Direct message 기능은 준비중이에요');
  setTimeout(() => {
    history.push('/');
  }, 5000);

  return (
    <>
      <Helmet>
        <title>Message | Armystagram</title>
      </Helmet>
    </>
  );
});
