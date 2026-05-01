const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    //set the default values
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again later",
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }

  if (err.name === "ValidationError") {
    console.log(Object.values(err.errors));
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.errorResponse && err.errorResponse.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "CastError") {
    customError.msg = `No item found with the id ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  //return res
  //   .status(StatusCodes.INTERNAL_SERVER_ERROR)
  //   .json({ msg: err.message || "Something went wrong, please try again" });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;

// "err": {
//         "errorLabelSet": {},
//         "errorResponse": {
//             "index": 0,
//             "code": 11000,
//             "errmsg": "E11000 duplicate key error collection: GET-A-JOB.users index: email_1 dup key: { email: \"emiiii@gmail.com\" }",
//             "keyPattern": {
//                 "email": 1
//             },
//             "keyValue": {
//                 "email": "emiiii@gmail.com"
//             }
//         },
//         "index": 0,
//         "code": 11000,
//         "keyPattern": {
//             "email": 1
//         },
//         "keyValue": {
//             "email": "emiiii@gmail.com"
//         }

//Validation error message
// {
//     "err": {
//         "errors": {
//             "password": {
//                 "name": "ValidatorError",
//                 "message": "Please provide a valid password",
//                 "properties": {
//                     "message": "Please provide a valid password",
//                     "type": "required",
//                     "path": "password"
//                 },
//                 "kind": "required",
//                 "path": "password"
//             },
//             "email": {
//                 "name": "ValidatorError",
//                 "message": "Please provide your email",
//                 "properties": {
//                     "message": "Please provide your email",
//                     "type": "required",
//                     "path": "email"
//                 },
//                 "kind": "required",
//                 "path": "email"
//             }
//         },
//         "_message": "user validation failed",
//         "name": "ValidationError",
//         "message": "user validation failed: password: Please provide a valid password, email: Please provide your email"
//     }
// }
