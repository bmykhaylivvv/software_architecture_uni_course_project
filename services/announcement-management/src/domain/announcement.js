/**
 * Class representing Announcement entity on announcement-management service
 */
export default class Announcement {
  /**
   * Id of the announcement user
   */
  userId = null;

  /**
   * Title of the announcement
   */
  title = null;

  /**
   * Description of the announcement
   */
  description = null;

  constructor(userId, title, description) {
    this.userId = userId;
    this.title = title;
    this.description = description;
  }
}
