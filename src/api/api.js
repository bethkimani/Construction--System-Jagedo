// Mock API for frontend-only functionality
const mockApi = {
  // Simulate POST request for signup
  post: async (endpoint, data) => {
    // Simulate signup by returning the data as if the backend saved it
    if (endpoint === '/doctors/' || endpoint === '/patients/') {
      return { data: { ...data, id: Math.floor(Math.random() * 1000) } };
    }
    // Simulate token endpoint for login
    if (endpoint === '/o/token/') {
      return { data: { access_token: 'dummy-token' } };
    }
    throw new Error('Endpoint not supported in mock API');
  },

  // Simulate GET request for fetching user data
  get: async (endpoint, config) => {
    if (endpoint === '/me/') {
      // Return the user stored in localStorage
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