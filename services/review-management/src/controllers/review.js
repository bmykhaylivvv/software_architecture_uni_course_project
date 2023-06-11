import ReviewService from '../services/review/review.js';
import Review from '../domain/review.js';

const reviewService = new ReviewService();

/**
 * Class representing review-management service controller
 */
export default class ReviewController {
  /**
   * POST / controller
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async createReview(req, res) {
    const { announcementId, userId, text } = req.body;

    if (!(announcementId && userId && text))
      return res.status(400).send('Invalid payload');

    const review = new Review(announcementId, userId, text);
    const { result, error } = await reviewService.createReview(review);

    if (error) return res.status(error.code).send(error.message);

    return res.status(200).send(result);
  }

  /**
   * DELETE /review/:id controller
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async deleteReview(req, res) {
    const { id } = req.params;

    console.log(req.query);

    if (!id) return res.status(400).send('No review id provided');

    const { result, error } = await reviewService.deleteReview(id);

    if (error) return res.status(error.code).send(error.message);

    return res.status(200).send(result);
  }

  /**
   * GET /?announcementId=10 controller
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async getReviewsByAnnouncementId(req, res) {
    const { announcementId: rawAnnouncementId } = req.query;
    const announcementId = parseInt(rawAnnouncementId);

    if (isNaN(announcementId))
      return res
        .status(400)
        .send('Invalid announcementId query parameter provided');

    if (!announcementId)
      return res.status(400).send('No announcementId query parameter provided');

    const { result, error } = await reviewService.getReviewsByAnnouncementId(
      announcementId
    );

    if (error) return res.status(error.code).send(error.message);

    return res.status(200).send(result);
  }
}
