import {StatusCodes} from 'http-status-codes';
import { AsyncHandler } from "../middlewares/asyncHandler.js";
import { ErrorHandler } from "../utils/error.js";
import {CourseProgress} from '../models/courseProgress.model.js';

// @DESC: Register the new user
// @METHOD: [POST]   /api/v1/users/signup
// @ACCESS: public
const getCourseProcess = AsyncHandler(async(req,res,next)=>{

})

export { getCourseProcess };