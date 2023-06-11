import { Router } from 'express';

import ReviewController from '../controllers/review.js';
import { verifyUser } from '../middlewares/authentication.js';

const reviewController = new ReviewController();
const reviewRouter = Router();

reviewRouter.get('/', verifyUser, reviewController.test);

export { reviewRouter };
