import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TaskGrid from './TaskGrid'
import GroupList from './GroupList'
import { GroupProvider } from '../../contexts/group'

const Base = () => {
    const [groups, setGroups] = useState([])
    const [currGroup, setCurrGroup] = useState('')
    const [currUser, setCurrUser] = useState('')

    const fetchGroups = async () => {
        try {
            const response = await axios.get('http://localhost:3000/group')
            setGroups(response.data.groups)
        } catch (error) {
            console.error('Error fetching groups:', error.message)
        }
    }

    useEffect(() => {
        fetchGroups()
    }, [])

    return (
        <GroupProvider>
            <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-blue-400 via-blue-700 to-violet-700 backdrop-blur-lg bg-opacity-30 text-white shadow-xl border border-white/20">
                <div className="flex justify-between w-full px-7 py-5">
                    <div className="text-[50px] font-semibold hover:cursor-default">
                        {currGroup === '' ? 'Your Groups' : 'Your Tasks'}
                    </div>
                    <div className="flex space-x-4 hover:cursor-pointer">
                        <div onClick={() => setCurrGroup('')}>Home</div>
                        <div>About</div>
                        <div>Logout</div>
                    </div>
                </div>


                <div className="w-full flex-1 overflow-auto bg-white/80 text-black">
                    {currGroup === '' ? (
                        <GroupList groups={groups} onSelect={(id) => setCurrGroup(id)} />
                    ) : (
                        <TaskGrid groupId={currGroup} />
                    )}
                </div>
            </div>
        </GroupProvider>
    )
}

export default Base
