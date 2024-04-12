const useTwilio = () => {
  const sendTwilio = async (from, subject, body) => {
    // console.log(from, subject, body);
    const response = await fetch("http://localhost:3500/twilio", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: new URLSearchParams({
        id: localStorage.getItem("id"),
        from: from,
        subject: subject,
        body: body,
      }),
    });
    console.log(await response.json());
    if (response.ok) {
      console.log("twilio working");
    } else {
      console.log("twilio not working");
    }
  };
  return {
    sendTwilio,
  };
};
export default useTwilio;
