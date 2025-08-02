import { useEffect } from 'react';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import SignMenu from './SignMenu.jsx';
import BackBtn from './BackBtn.jsx';
import { SignProvider } from '../../contexts/sign.jsx';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Base = () => {
    const navigate = useNavigate();
    const [currComp, setCurrComp] = useState('menu')

    const changeCurrComp = (newComp) => {
        setCurrComp(newComp)
    }

    // useEffect(() => {
    //   console.log(currComp)
    
    // }, [currComp])
    

    return (
        <SignProvider value={{ currComp, changeCurrComp }}>
            <div className="h-screen bg-cover bg-center min-h-screen flex items-center">
                <div className='p-10 relative top-[-20px] h-screen bg-[#F0F0F0]  text-[60px] font-bold flex justify-center items-center w-1/2 hover:cursor-default bg-gradient-to-r from-blue-400 via-blue-700 to-violet-700 bg-clip-text text-transparent'>
                    Task Manager
                </div>


                <div className='flex flex-col justify-center items-center w-1/2 h-screen bg-gradient-to-br from-blue-400 via-blue-700 to-violet-700 backdrop-blur-lg bg-opacity-30 p-6 text-white shadow-xl border border-white/20'>
                    {
                        currComp === 'menu' && (<><SignMenu /></>)
                    }
                    {
                        currComp === 'in' && (<><SignIn /> <BackBtn /></>)
                    }
                    {
                        currComp === 'up' && (<><SignUp /> <BackBtn /></>)
                    }
                </div>

            </div>
        </SignProvider>
    );
};

export default Base;
