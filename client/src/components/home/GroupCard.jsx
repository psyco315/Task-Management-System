import { useEffect, useState } from "react";
import axios from "axios";

const GroupCard = ({ group, onSelect, onContextMenu }) => {
  const [creatorEmail, setCreatorEmail] = useState('');

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const res = await axios.get(`/api/user/${group.createdBy}`);
        // console.log(res.data.user.email)
        setCreatorEmail(res.data.user.email);
      } catch (err) {
        console.error('Error fetching creator email:', err);
        setCreatorEmail(group.createdBy); // fallback to ID if error
      }
    };

    fetchCreator();
  }, [group.createdBy]);

  return (
    <div
      className="m-4 p-6 h-max rounded-xl bg-white/30 hover:bg-white/50 cursor-pointer transition"
      onClick={onSelect}
      onContextMenu={onContextMenu}
    >
      <div className="text-xl font-semibold">{group.name}</div>
      <div className="text-sm">Created by: {creatorEmail}</div>
      <div className="text-xs text-gray-700">
        Created on: {new Date(group.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default GroupCard;
