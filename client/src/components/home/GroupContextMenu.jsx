const GroupContextMenu = ({ position, onEdit, onDelete }) => {
    return (
        <div
            className="absolute bg-white text-black shadow-md rounded z-50 w-32"
            style={{ top: position.y - 150, left: position.x }}
        >
            <button
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={onEdit}
            >
                Edit
            </button>
            <button
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={onDelete}
            >
                Delete
            </button>
        </div>
    );
};

export default GroupContextMenu
