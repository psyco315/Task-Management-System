import React from 'react'
import GroupCard from './GroupCard'
import { useUser } from '../../contexts/user'
import AddGroup from './AddGroup'

const GroupList = ({ groups, onSelect, updateGroup }) => {
    const { currUser } = useUser()

    return (
        <div className="w-full flex-1 overflow-auto flex flex-wrap">
            <AddGroup updateGroup = {updateGroup} />
            {groups.map((group, idx) => (
                <GroupCard
                    key={group._id || idx}
                    group={group}
                    onSelect={() => onSelect(group._id)}
                />
            ))}
        </div>
    )
}

export default GroupList
