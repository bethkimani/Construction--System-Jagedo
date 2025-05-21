const mockApi = {
  post: async (endpoint, data) => {
    if (endpoint === '/builders/' || endpoint === '/clients/') {
      return { data: { ...data, id: Math.floor(Math.random() * 1000) } };
    }
    if (endpoint === '/o/token/') {
      return { data: { access_token: 'dummy-token' } };
    }
    throw new Error('Endpoint not supported in mock API');
  },

  get: async (endpoint, config) => {
    if (endpoint === '/me/') {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        return { data: user };
      }
      throw new Error('User not found');
    }
    throw new Error('Endpoint not supported in mock API');
  },
};

export default mockApi;