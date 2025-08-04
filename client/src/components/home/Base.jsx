import { useState, useEffect } from 'react'
import axios from 'axios'
import TaskGrid from './TaskGrid'
import SignOut from './SignOut'
import GroupList from './GroupList'
import AddTask from './AddTask'
import Members from './Members'
import { GroupProvider } from '../../contexts/group'
import { useUser } from '../../contexts/user'
import { useAdminMode } from '../../contexts/admin'

const Base = () => {
    const { adminMode, setAdminMode } = useAdminMode()
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
        const data = await getData("http://localhost:3000/api/task");
        setTasks(data.tasks); // assuming API returns { tasks: [...] }
    };

    const fetchGroups = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/group')
            // console.log(response.data.groups)
            setGroups(response.data.groups)
        } catch (error) {
            console.error('Error fetching groups:', error.message)
        }
    }

    const fetchCurrUser = async (currUser) => {
        // console.log(currUser)
        if (!currUser) {
            console.error("Invalid user object");
            return null;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/user/${currUser}`);
            return response.data.user;
        } catch (error) {
            console.error("Failed to fetch user details:", error.message);
            return null;
        }
    };

    useEffect(() => {
        const fetchUserAndGroups = async () => {
            if (!currUser) return;

            try {
                // console.log('Curr user in home: ', currUser);
                const currUserDetail = await fetchCurrUser(currUser._id); // ✅ await the result

                // console.log(currUserDetail);

                if (currUserDetail.role === 'admin') {
                    // console.log('user is admin');
                    setAdminMode(true);
                } else {
                    // console.log('user is not admin');
                    setAdminMode(false);
                }

                fetchGroups(); // ✅ now fetch groups after setting adminMode
            } catch (err) {
                console.error("Failed to fetch user or groups:", err);
            }
        };

        fetchUserAndGroups();
    }, [currUser]); // ✅ no need to depend on adminMode


    return (
        <GroupProvider value={{ currGroup, setCurrGroup, groups, setGroups }}>
            <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-blue-400 via-blue-700 to-violet-700 backdrop-blur-lg bg-opacity-30 text-white shadow-xl border border-white/20">
                <div className="flex justify-between w-full px-7 py-5">
                    <div className='flex items-center'>
                        <div className="w-[450px] font-semibold hover:cursor-default">
                            {currGroup === ''
                                ? 'Your Groups'
                                : (<>
                                    <div className='text-[50px] '>
                                        {groups.find(g => g._id === currGroup)?.name}
                                    </div>

                                    <div className='text-[15px] text-white/50'>
                                        Invite Code: {currGroup}
                                    </div>
                                </>) || 'Your Tasks'}
                        </div>

                        <div>
                            {
                                adminMode && currGroup !== '' && (<AddTask onTaskAdded={fetchTasks} />)
                            }
                        </div>

                        <div>
                            { currGroup !== '' && (<Members currGroup={currGroup} />)}
                        </div>
                    </div>

                    <div className="flex h-max space-x-4 hover:cursor-pointer">
                        <button
                            onClick={() => setCurrGroup('')}
                            className="bg-white/40 text-black h-max px-4 py-2 rounded hover:bg-white/70"
                        >
                            <div>Home</div>
                        </button>

                        <button
                            className="bg-white/40 text-black h-max px-4 py-2 rounded hover:bg-white/70"
                        >
                            <div>About</div>
                        </button>

                        <SignOut />
                    </div>
                </div>


                <div className="w-full h-full flex flex-col overflow-auto bg-white/80 text-black">
                    <div className='pt-4 pl-6 opacity-50'>
                        Right Click entries to edit them
                    </div>
                    {currGroup === '' ? (
                        <GroupList
                            onSelect={(id) => setCurrGroup(id)}
                            updateGroup={fetchGroups}
                        />
                    ) : (
                        <TaskGrid tasks={tasks} fetchTasks={fetchTasks} groupId={currGroup} />
                    )}
                </div>
            </div>
        </GroupProvider>
    )
}

export default Base
