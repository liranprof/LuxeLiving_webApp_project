// client.js
const axios = require('axios');

const testGetRequest = async (app_full_path) => {
    try {
      const response = await axios.get(app_full_path);
      console.log('GET Response:', response.data);
    } catch (error) {
      console.error('Error in GET request:', error.message);
    }
  };
  
  const testPostRequest = async (app_full_path) => {
    try {
      const response = await axios.post(app_full_path, {
        name: 'John Doe',
        age: 30,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('POST Response:', response.data);
    } catch (error) {
      console.error('Error in POST request:', error.message);
    }
  };
const runTests = async (app_url,app_port) => {

const app_full_path = `http://${app_url}:${app_port}/`;

  await testGetRequest(app_full_path);
  await testPostRequest(app_full_path);
};

module.exports = { runTests };