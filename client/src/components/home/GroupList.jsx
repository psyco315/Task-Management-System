import React from 'react'
import GroupCard from './GroupCard'

const GroupList = ({ groups, onSelect }) => {
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
