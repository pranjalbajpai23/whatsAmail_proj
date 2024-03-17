import { useContext, useEffect } from "react";
import AuthContext from "../Context/AuthProvider";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;

//this useConnectGmail hook will be called when the user connect's his gmail account for the first time, this hook will get refresh token from gmail, NOTE- We will be storing this refresh token on our MongoDB server
const useGoogleAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const connectGmail = () => {
    //parameters that we need to send
    const params = {
      scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
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
  const updateDB = async (phoneNumber) => {
    
    const getGoogleInfo = async (accessToken) => {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.email;
      } else {
        console.log(response);
      }
    };

    //storing the refresh token on our MongoDB server for future use
    const setGoogleInfo = async (emailID, refresh) => {
      const access_token = localStorage.getItem("accessToken");
      if (access_token) {
        const response = await fetch("http://localhost:3500/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: new URLSearchParams({
            id: localStorage.getItem("id"),
            gmailID: emailID,
            phoneNumber: phoneNumber,
            refresh: refresh,
          }),
        });
        const data = await response.json();
        console.log("data", data);
        return data;
      } else {
        console.log("Getting fail");
        return { error: "Access token not available" };
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
        const emailID = await getGoogleInfo(accessToken);
        //can extract pic, name etc from userInfo

        console.log("emailid", emailID);
        console.log("refresh", refreshToken);
        await setGoogleInfo(emailID, refreshToken);
      } else {
        console.log("Error in fetching refresh token from code");
      }
      localStorage.removeItem("code");
    };
    await getRefreshToken();
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
    updateDB,
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
  console.log(data);
  if (response.ok) {
    return data.refreshToken;
  } else {
    console.log(data.message);
  }
};

export const getAccessTokenGmail = async () => {
  const refreshToken = await getRefreshTokenFromDB();
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
    console.log(data);
    //***********************looking forward to store it on backend****************************************************************
    return data.access_token;
  }
};

export default useGoogleAuth;
