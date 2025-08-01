import React from 'react'
import TaskCard from './TaskCard'
import TaskGrid from './TaskGrid'
import TaskRow from './TaskRow'

const Base = () => {
    return (
        <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-blue-400 via-blue-700 to-violet-700 backdrop-blur-lg bg-opacity-30 text-white shadow-xl border border-white/20">

            <div className="flex justify-between w-full px-7 py-5">
                <div className="text-[50px] font-semibold hover:cursor-default">Your Tasks</div>
                <div className="flex space-x-4 hover:cursor-pointer">
                    <div>Home</div>
                    <div>About</div>
                    <div>Logout</div>
                </div>
            </div>

            <div className="w-full flex-1 overflow-auto bg-white/80 text-black">
                <TaskGrid />
            </div>

        </div>
    )
}

export default Base