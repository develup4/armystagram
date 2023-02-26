export const defaults = {
  isLogin: Boolean(localStorage.getItem('token')) || false,
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem('token', token);
      cache.writeData({
        data: {
          isLogin: true,
        },
      });
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem('token');
      cache.writeData({
        data: {
          isLogin: false,
        },
      });
      window.location = '/';
      return null;
    },
  },
};
