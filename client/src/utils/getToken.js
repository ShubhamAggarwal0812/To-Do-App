// client/src/utils/getToken.js

const getToken = () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo).token : null;
  };
  
  export default getToken;
