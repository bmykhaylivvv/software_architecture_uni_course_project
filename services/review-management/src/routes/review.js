import { Router } from 'express';

import ReviewController from '../controllers/review.js';
import { verifyUser } from '../middlewares/authentication.js';

const reviewController = new ReviewController();
const reviewRouter = Router();

reviewRouter.post('/', verifyUser, reviewController.createReview);
reviewRouter.delete('/review/:id', verifyUser, reviewController.deleteReview);
reviewRouter.get('/', verifyUser, reviewController.getReviewsByAnnouncementId);


export { reviewRouter };
