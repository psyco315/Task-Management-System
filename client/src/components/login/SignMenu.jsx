import useSign from "../../contexts/sign.jsx"

const SignMenu = () => {
    const { currComp, changeCurrComp } = useSign()

    return (
        <>
        <div>
            <div className="bg-white/10 text-[20px] backdrop-blur-md rounded-xl m-5 px-10 py-6
           text-white shadow-md border border-white/20
           transition duration-150 ease-in-out 
           hover:scale-105 hover:shadow-xl cursor-pointer" onClick={()=>{changeCurrComp('in')}}>Sign In</div>
            <div className="bg-white/10 text-[20px] backdrop-blur-md rounded-xl m-5 px-10 py-6
           text-white shadow-md border border-white/20
           transition duration-150 ease-in-out 
           hover:scale-105 hover:shadow-xl cursor-pointer" onClick={()=>{changeCurrComp('up')}}>Sign Up</div>
        </div>
    </>
    )
}

export default SignMenu