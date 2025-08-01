import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TaskGrid from './TaskGrid'
import GroupList from './GroupList'
import AddTask from './AddTask'
import { GroupProvider } from '../../contexts/group'
import { useUser } from '../../contexts/user'
import { AdminModeProvider } from '../../contexts/admin'

const Base = () => {
    const [adminMode, setAdminMode] = useState(false)
    const [groups, setGroups] = useState([])
    const [currGroup, setCurrGroup] = useState('')
    const { currUser } = useUser()
    const [tasks, setTasks] = useState([]);

    const getData = async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };

    const fetchTasks = async () => {
        const data = await getData("http://localhost:3000/task");
        setTasks(data.tasks); // assuming API returns { tasks: [...] }
    };

    const fetchGroups = async () => {
        try {
            const response = await axios.get('http://localhost:3000/group')
            setGroups(response.data.groups)
        } catch (error) {
            console.error('Error fetching groups:', error.message)
        }
    }

    useEffect(() => {
        if (currUser) {
            setAdminMode(true)
            fetchGroups();
        }
    }, [currUser]);

    return (
        <AdminModeProvider>
            <GroupProvider value={{ currGroup, setCurrGroup, groups, setGroups }}>
                <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-blue-400 via-blue-700 to-violet-700 backdrop-blur-lg bg-opacity-30 text-white shadow-xl border border-white/20">
                    <div className="flex justify-between w-full px-7 py-5">
                        <div className="text-[50px] font-semibold hover:cursor-default">
                            {currGroup === ''
                                ? 'Your Groups'
                                : groups.find(g => g._id === currGroup)?.name || 'Your Tasks'}
                        </div>

                        <div>
                            {
                                currGroup !== '' && (<AddTask onTaskAdded={fetchTasks} />)
                            }
                        </div>

                        <div className="flex space-x-4 hover:cursor-pointer">
                            <div onClick={() => setCurrGroup('')}>Home</div>
                            <div>About</div>
                            <div>Logout</div>
                        </div>
                    </div>


                    <div className="w-full flex-1 overflow-auto bg-white/80 text-black">
                        {currGroup === '' ? (
                            <GroupList
                                groups={groups}
                                onSelect={(id) => setCurrGroup(id)}
                                updateGroup={fetchGroups}
                            />
                        ) : (
                            <TaskGrid tasks={tasks} fetchTasks={fetchTasks} groupId={currGroup} />
                        )}
                    </div>
                </div>
            </GroupProvider>
        </AdminModeProvider>
    )
}

export default Base
