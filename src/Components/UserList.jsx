import { useEffect, useState } from "react";

const UserList=()=>{
    const [email_list,setEmailList]=useState([]);
    const [email, setEmail]=useState("");
    const id = localStorage.getItem("id");
    const load_list = async () => {
        const response = await fetch(`http://localhost:3500/user/mail_list/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        const data = await response.json();
        if (response.ok) {
            const emails = data['data'];
            const newdata = [...emails]
            setEmailList(newdata)
            localStorage.setItem("email_list",newdata)
            console.log(data);
        }
    }
    useEffect(()=>{
       
        load_list();      
    }, [])
    const add_email=async()=>{

        console.log(email);
        const response = await fetch('http://localhost:3500/user/mail_list', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: new URLSearchParams({
                id: id,
                email:email
            }),
        })
        let data = await response.json();
        data=data['data'];
        if (response.ok) {
            console.log(data);
            await load_list();
        }
        else{
            console.log(data);
        }
    }
    return <>
        <div className="w-full h-[80vh] flex flex-col items-center bg-white rounded-md  mt-8 border-2 border-[#1E0342] poppins-light">
            <ul className="flex h-fit w-full py-1 justify-evenly bg-[#0E46A3] rounded-md items-center">
                <li className="text-center font-semibold  cursor-pointer text-white ">Add Important Emails </li>
            </ul>
            <div className="flex items-center justify-evenly w-full h-full">
                <div className="h-full w-1/2">
                    <li className="font-bold list-none w-full text-center">Important Email List</li> 
                    <div className="bg-[#9AC8CD] h-[90%] rounded-md">
                    {
                        email_list.map(item=>{
                            return <div key={email.id} className="flex flex-row justify-between items-center border-white border-b-2">
                                                <div className="flex items-center pl-2">
                                                    <td >{item}</td>
                                                </div>
                                    </div>
                        })
                    }
                    </div>
                </div>
                <div className="flex flex-col w-fit h-fit text-3xl h-5/6 border-2 border-black p-8 rounded-md">
                    <label htmlFor="" className="text-base">Enter your important email</label>
                   <input type="text" className="border-2 border-black text-base px-1 w-[20rem]" name="" id="" onChange={(e)=>setEmail(e.target.value)}/>
                    <button type="button" className="px-1 text-lg border-2 border-black mt-2 rounded-md hover:bg-black hover:text-white" onClick={add_email}>Add Email to list</button>
                </div >
            </div>
        </div>
    </>
}
export default UserList;