const handleErrors = (err, req, res, next) => {
    if (err instanceof AppError) {
      res.status(err.httpStatusCode).json(err.toJson());
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  };
  
  module.exports = { handleErrors };
  