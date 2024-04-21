/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useGmail from "../Hooks/useGmail";
import { useSelector } from "react-redux";
import useTwilio from "../Hooks/useTwilio";
import Connecting from "../Pages/Connecting";

const EmailsListing = ({ lable }) => {
    const mails = useSelector(state => state.emails_Google);
    const date = new Date();
    const [refresh, setResfresh] = useState();
    const { fetchEmails } = useGmail()
    const { sendTwilio } = useTwilio();
    const handleRefresh = () => {
        setResfresh(!refresh)
    }
    useEffect(() => {
        fetchEmails(lable);
    }, [refresh])
    

    const sendMail = async () => {
        if (mails.length) {
            await sendTwilio(mails[0].From, mails[0].Subject, mails[0].message);
        }
    }
    return <>
        {
            lable=="connect"?
            <Connecting/>
            :
        <div className="bg-white h-[90%]  rounded-2xl  w-[80%] ">
            <div className="flex items-center p-2">
                <div className=" rounded-md p-2 mr-2 hover:bg-slate-400/25">
                    <input className="mx-2 hover:bg-slate-400/75" type="checkbox" name="" id="" />
                    <select className="w-4 bg-transparent">
                        <option value=""></option>
                        <option value="All">All</option>
                        <option value="None">None</option>
                        <option value="Read">Read</option>
                    </select>
                </div>
                <button className="rounded-full p-4 mr-2 hover:bg-slate-400/25" onClick={handleRefresh}>
                    <img src="/refresh.svg" className="w-4 h-4" alt="image not availabe" />
                </button>
            </div>

            <div className=" h-[90%]  ">
                <table className="flex h-[95%] overflow-hidden    flex-col divide-y divide-gray-200">
                    <thead className=" w-full bg-gray-50 ">
                        <tr className="w-full flex justify-between">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    {
                        mails.length == 0 ?
                            <div className="flex justify-center p-24">
                                <img src="/loading.svg" className=" animate-spin h-28 w-28 m-4 " />
                            </div>
                            :
                                    <tbody className="flex flex-col h-[95%] overflow-y-scroll bg-white divide-y divide-gray-200">
                                {mails.map((email) => {
                                    const name = email.From.split('<')[0].trim();
                                    // Split the date string by space
                                    const parts = email.Date.split(" ");

                                    const dayOfMonth = parts[1];
                                    const month = parts[2];
                                    const time = parts[4];
                                    const data = new Date(time);
                                    const time12hr = data.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                                    let displayData = time12hr;
                                    if (date.getDate() != dayOfMonth) {
                                        displayData = dayOfMonth + " " + month;
                                    }
                                    return <tr key={email.id} className="flex flex-row justify-between items-center hover:bg-[#8D99AE]/25">
                                                <td className="flex items-center w-[90%] pl-2">
                                                    <td className="w-[10%]  font-bold ">{name}</td>
                                                    <td className="w-[85%] flex text-left items-center text-ellipsis overflow-hidden px-4 py-4 whitespace-nowrap ">
                                                        <b>{email.Subject}</b > -
                                                        {email.message}...
                                                    </td>
                                                </td>
                                                <td className="w-[10%] flex flex-col pr-2  py-4 whitespace-nowrap text-right">{displayData}</td>
                                            </tr>
                                })}
                            </tbody>

                    }
                </table>
            </div>
            <button className="border-2 border-black p-2" onClick={sendMail}>Press to send top most email to twilio</button>
        </div>
        }
    </>
}
export default EmailsListing;
//.slice(0, 170 - email.Subject.length)