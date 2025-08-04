const TaskCard = () => {
  return (
    <div className="w-full max-w-sm p-6 rounded-2xl backdrop-blur-md border border-white/20 text-white shadow-lg hover:cursor-pointer hover:scale-102 transition duration-200" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      <h3 className="text-xl font-semibold mb-2">Card Title</h3>
      <p className="text-white/80">This is a sample card description.</p>
    </div>
  )
}

export default TaskCard