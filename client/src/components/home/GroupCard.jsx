const GroupCard = ({ group, onSelect }) => {
  return (
    <div
      className="m-4 p-6 rounded-xl bg-white/30 hover:bg-white/50 cursor-pointer transition"
      onClick={onSelect}
    >
      <div className="text-xl font-semibold">{group.name}</div>
      <div className="text-sm">Created by: {group.createdBy.username || group.createdBy}</div>
      <div className="text-xs text-gray-700">Created on: {new Date(group.createdAt).toLocaleDateString()}</div>
    </div>
  )
}

export default GroupCard
