import useSign from "../../contexts/sign.jsx"
import { IoArrowBack } from 'react-icons/io5';

const BackBtn = () => {
    const { changeCurrComp } = useSign();

    return (
        <div
            onClick={() => changeCurrComp("menu")}
            className="absolute top-[60px] left-[50px] self-start mb-6 text-white bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20 border border-white/20 transition duration-150 ease-in-out hover:scale-[1.02] hover:shadow-xl cursor-pointer"
        >
            <IoArrowBack size={24} color="white" />
        </div>
    )
}

export default BackBtn