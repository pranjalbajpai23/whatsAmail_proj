/* eslint-disable react/prop-types */
const Success=({text})=>{
    return <>
        <div className="flex flex-col w-fit  text-3xl  border-2 border-black p-8 rounded-md items-center">
            <span className="text-center" >Successfully Connected your {text}</span>
            <img src="success.svg" className="w-28 h-28" alt="" />
        </div >
    </>   
}
export default Success