import { useDispatch } from "react-redux";
import { gmailsAction } from "../Store/GmailSlice";
import { getAccessTokenGmail } from "./useGoogleAuth";

const useGmail =  () => {
  const dispatch = useDispatch();  
  const fetchEmails = async (lable) => {
     const token = await getAccessTokenGmail();
     console.log("token type",typeof(token));
    lable = lable.toUpperCase();
    dispatch(gmailsAction.removeInitialItems());
    try { 
      const fetchPromise = token.map(async (token) => {
        const response = await fetch(
          //https://www.googleapis.com/gmail/v1/users/me/messages?INBOX=%2A
          `https://gmail.googleapis.com/gmail/v1/users/me/messages?${lable}=%2A&maxResults=5`,
          {
            method: "GET",
            headers: new Headers({ Authorization: `Bearer ${token}` }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const newMessages = [];

          for (const message of data.messages) {
            try {
              const messageResponse = await fetch(
                `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
                {
                  method: "GET",
                  headers: new Headers({ Authorization: `Bearer ${token}` }),
                }
              );

              if (messageResponse.ok) {
                const info = await messageResponse.json();
                let res = {};
                Array.from(info.payload.headers).forEach((msg) => {
                  if (
                    msg.name === "Date" ||
                    msg.name === "Subject" ||
                    msg.name === "From"
                  ) {
                    res[msg.name] = msg.value;
                  }
                });

                res["message"] = info.snippet;
                res["id"] = message.id;
                newMessages.push(res);
              }
            } catch (error) {
              console.error("Error fetching individual message:", error);
            }
          }
          
          dispatch(gmailsAction.addInitialItems(newMessages));
        } else {
          console.error("Failed to fetch messages");
        }
      });
      await Promise.all(fetchPromise);
      
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };
  return {
    fetchEmails,
  };
};
export default useGmail;
