const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err)
  return res.status(500).json({ msg: '<h2>Something went wrong, please try again</h2>' })
}

export default errorHandlerMiddleware
