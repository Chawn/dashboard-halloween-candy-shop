import axios from 'axios';
import jwt_decode from "jwt-decode";

// export const authenticate = (response, next) => {
//   if(window !== 'undefined'){
//     const { access_token, refresh_token } = response.data;
//     localStorage.setItem('access_token', access_token);
//     localStorage.setItem('refresh_token', refresh_token);
//   }
//   next();
// }

export const isAccessTokenExpired = (token) => {
  const decodedToken = jwt_decode(token);
  const currentTime = Date.now() / 1000; // convert to seconds
  return decodedToken.exp < currentTime;
}

export const isRefrechTokenExpired = (token) => {
  const decodedToken = jwt_decode(token);
  const currentTime = Date.now() / 1000; // convert to seconds
  return decodedToken.exp < currentTime;
}

export const isLoggedIn = () => {
  if(window !== 'undefined'){
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    if(!refresh_token || isRefrechTokenExpired(refresh_token)){
      return false
    }

    if(!access_token || isAccessTokenExpired(access_token)){
      console.log(`Access token expired`);
      refreshAccessToken();
    }

    return true;
  }
}

export const refreshAccessToken = async () => {
  try {
    const refresh_token = localStorage.getItem('refresh_token');
    if(isRefrechTokenExpired(refresh_token)){
      if(window.location.href !== '/login'){
        window.location.href = '/login';
      }
    }

    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://freddy.codesubmit.io/refresh',
      headers: { 
        'Authorization': `Bearer ${refresh_token}`
      }
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));

    const { access_token } = response.data;

    // Save the new access token to local storage
    localStorage.setItem('access_token', access_token);

    })
    .catch(function (error) {
      console.log(error);
    });


    // Return the new access token to the calling component
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  if(window !== 'undefined'){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
   
    window.location.href = `${process.env.PUBLIC_URL}`;
    
  }
}



