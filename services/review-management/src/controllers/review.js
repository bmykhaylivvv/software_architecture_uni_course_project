import ReviewService from '../services/review/review.js';
import Review from '../domain/review.js';

const reviewService = new ReviewService();

/**
 * Class representing review-management service controller
 */
export default class ReviewController {
  /**
   * POST /
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async createReview(req, res) {
    const { announcementId, userId, text } = req.body;
    const review = new Review(announcementId, userId, text);
    const { result, error } = await reviewService.test()

    return res.status(200).send(result);
  }
}
