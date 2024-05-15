import { useContext, useEffect } from "react";
import AuthContext from "../Context/AuthProvider";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;

//this useConnectGmail hook will be called when the user connect's his gmail account for the first time, this hook will get refresh token from gmail, NOTE- We will be storing this refresh token on our MongoDB server
const useGoogleAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const connectGmail = async () => {
    //parameters that we need to send
    const scopes = "https://www.googleapis.com/auth/gmail.readonly";
    const params = {
      scope: scopes,
      access_type: "offline",
      include_granted_scopes: true,
      response_type: "code",
      state: "state_parameter_passthrough_value",
      redirect_uri: "http://localhost:5173/connect",
      client_id: GOOGLE_CLIENT_ID,
    };

    //the above parameters needs to be supplied with the URL hence joining then
    const queryParams = Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");

    //setting the current URL to google's authentication URL
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`;
  };

  //For Setting Phone Number in Database
  const setPhoneNumber = async (phoneNumber) => {
    const response = await fetch("http://localhost:3500/user/ph/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: new URLSearchParams({
        id: localStorage.getItem("id"),
        phoneNumber: phoneNumber,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      return response.ok;
    } else {
      console.log(data);
      return data;
    }
  };

  const updateToken = async (emailId) => {
    //**********UNDER REVIEW */
    // const getGoogleInfo = async (accessToken) => {
    //   console.log(accessToken);
    //   const response = await fetch(
    //     `https://www.googleapis.com/oauth2/v2/userinfo`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     }
    //   );

    //   if (response.ok) {
    //     const data = await response.json();
    //     return data.email;
    //   } else {
    //     console.log(response);
    //   }
    // };
    //**********review end* */

    //storing the refresh token on our MongoDB server for future use
    const setGoogleInfo = async (refresh) => {
      const access_token = localStorage.getItem("accessToken");
      if (access_token) {
        const response = await fetch("http://localhost:3500/user/rt", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: new URLSearchParams({
            id: localStorage.getItem("id"),
            gmailID: emailId,
            refresh: refresh,
          }),
        });


        if(response.ok){
          return true;
        }
        else{
          return false;
        }
      } else {
        console.log("Getting fail");
        return false;
      }
    };
    const getRefreshToken = async () => {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          code: localStorage.getItem("code"),
          grant_type: "authorization_code",
          redirect_uri: "http://localhost:5173/connect",
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;
        setAuth({ ...auth, accessToken: accessToken });
        const refreshToken = data.refresh_token;
        // *************REVIEW SECTION CALL **************
        // const emailID = await getGoogleInfo(accessToken);
        //can extract pic, name etc from userInfo
        //*********CALL END********************** */
        const res= await setGoogleInfo(refreshToken);
        return res;
      } else {
        console.log("Error in fetching refresh token from code");
      }
      localStorage.removeItem("code");
    };
    return await getRefreshToken();
  };

  //This useEffect will get invoked when the page get's back after google's verification
  useEffect(() => {
    //this function is for getting refresh token from google, so that we can keep getting access token
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const code = params.get("code");
    if (code) {
      localStorage.setItem("code", code);
    }
  }, []);
  return {
    connectGmail,
    setPhoneNumber,
    updateToken,
  };
};


//getting stored access token
  const getRefreshTokenFromDB = async () => {
    const response = await fetch(
      `http://localhost:3500/user/${localStorage.getItem("id")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      const dataArray=[];
      for (const email in data.data) {
        if(Object.hasOwnProperty.call(data.data, email)){
          const entry={email, gRT:data.data[email].gmailRefreshToken}
          dataArray.push(entry);
        }
      }
      return dataArray;
    } else {
      console.log(data.message);
    }
  };

  export const getAccessTokenGmail = async () => {
    const refreshTokenData = await getRefreshTokenFromDB();
    const accessTokens = [];
    for (const refreshTokenObj of refreshTokenData) {
      const refreshToken = refreshTokenObj.gRT;
      console.log(refreshToken);
      try {
        const response = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          body: new URLSearchParams({
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            refresh_token: refreshToken,
            grant_type: "refresh_token",
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // Send the token data to your backend
          const accessToken = data.access_token;
          accessTokens.push(accessToken);
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }
    return accessTokens;
    
  };

export default useGoogleAuth;
