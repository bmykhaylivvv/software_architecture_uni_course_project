/**
 * Class representing Review entity on review-management service
 */
export default class Review {
  /**
   * Id of the announcement review is assigned to
   */
  announcementId = null;

  /**
   * Id of the review's user
   */
  userId = null;

  /**
   * Text of the review
   */
  text = null;

  /**
   * Date of the review
   */
  date = null;

  constructor(announcementId, userId, text) {
    this.announcementId = announcementId;
    this.userId = userId;
    this.text = text;
    this.date = new Date();
  }
}
