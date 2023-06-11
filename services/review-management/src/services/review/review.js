import { ObjectId } from 'mongodb';

import { getMongoDbConnection } from '../../persistence/mongodb/mongodb.js';
import { addNewLog } from '../../utils/logging/logging.js';

/**
 * Class with service methods for review-management service
 */
export default class ReviewService {
  /**
   * Name of the service
   */
  serviceName = 'review-management';

  /**
   * Create new review
   * @param {*} review
   * @returns
   */
  async createReview(review) {
    const mongoDbClient = getMongoDbConnection();
    const newReview = {
      announcement_id: review.announcementId,
      user_id: review.userId,
      text: review.text,
      date: review.date,
    };

    try {
      const createdReview = await mongoDbClient
        .db('project')
        .collection('review')
        .insertOne(newReview);

      addNewLog(
        this.serviceName,
        `Review ${createdReview.insertedId} was created`
      );
    } catch (error) {
      addNewLog(this.serviceName, `Error while creating review`);

      return { error: { code: 500, message: error } };
    }

    return { result: newReview };
  }

  /**
   * Delete review
   * @param {*} review
   * @returns
   */
  async deleteReview(reviewId) {
    const mongoDbClient = getMongoDbConnection();
    let reviewObjectId;

    try {
      reviewObjectId = new ObjectId(reviewId);
    } catch {
      return { error: { code: 500, message: 'Invalid review id' } };
    }

    try {
      await mongoDbClient
        .db('project')
        .collection('review')
        .deleteOne({ _id: reviewObjectId });

      addNewLog(
        this.serviceName,
        `Review ${reviewId} was deleted`
      );
    } catch (error) {
      addNewLog(this.serviceName, `Error while deleting review`);

      return { error: { code: 500, message: error } };
    }

    const result = { id: reviewId };

    return { result };
  }

  /**
   * Get reviews by announcementId
   * @param {*} review
   * @returns
   */
  async getReviewsByAnnouncementId(announcementId) {
    const mongoDbClient = getMongoDbConnection();
    let reviews;

    addNewLog(
      this.serviceName,
      `Retrieving reviews for announcementId ${announcementId}`
    );

    try {
      const rawReviewsResponse = await mongoDbClient
        .db('project')
        .collection('review')
        .find({ announcement_id: announcementId });

      reviews = await rawReviewsResponse.toArray();
    } catch (error) {
      if (error) return { error: { code: 500, message: error } };
    }

    return { result: reviews };
  }
}
