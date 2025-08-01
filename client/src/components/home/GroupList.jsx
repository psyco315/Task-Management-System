import React from 'react'
import GroupCard from './GroupCard'
import { useUser } from '../../contexts/user'

const GroupList = ({ groups, onSelect }) => {
    const { currUser } = useUser()

    return (
        <div className="w-full flex-1 overflow-auto flex flex-wrap">
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
