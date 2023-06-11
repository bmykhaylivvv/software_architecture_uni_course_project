import { to } from 'await-to-js';

import { getMysqlConnection } from '../../persistence/mysql/mysql.js';
import { addNewLog } from '../../utils/logging/logging.js';
/**
 * Class with service methods for announcement-management service
 */
export default class AnnouncementService {
  /**
   * Name of the service
   */
  serviceName = 'announcement-management';

  /**
   * Create new announcement
   * @param {} announcement
   * @returns
   */
  async createAnnouncement(announcement) {
    const connection = getMysqlConnection();
    const query = 'INSERT INTO announcement SET ?;';
    const newAnnouncement = {
      user_id: announcement.userId,
      title: announcement.title,
      description: announcement.description,
    };
    const [error] = await to(
      connection.promise().query(query, newAnnouncement)
    );

    if (error) {
      addNewLog(
        this.serviceName,
        `Error while creating Announcement for user ${announcement.userId} was created`
      );

      return { error: { code: 500, message: error } };
    }

    addNewLog(
      this.serviceName,
      `Announcement for user ${announcement.userId} was created`
    );

    return { result: newAnnouncement };
  }

  /**
   * Update existing announcement
   * @param {*} announcementId
   * @param {*} announcement
   * @returns
   */
  async updateAnnouncement(announcementId, announcement) {
    const connection = getMysqlConnection();
    const query = 'UPDATE announcement SET ? WHERE id = ?;';
    const updatedAnnouncement = {};

    if (announcement.userId) updatedAnnouncement.user_id = announcement.userId;

    if (announcement.title) updatedAnnouncement.title = announcement.title;

    if (announcement.description)
      updatedAnnouncement.description = announcement.description;

    const [error] = await to(
      connection.promise().query(query, [updatedAnnouncement, announcementId])
    );

    if (error) {
      addNewLog(
        this.serviceName,
        `Error while updating Announcement ${announcementId} was updated`
      );

      return { error: { code: 500, message: error } };
    }

    addNewLog(this.serviceName, `Announcement ${announcementId} was updated`);

    return { result: updatedAnnouncement };
  }

  /**
   * Delete announcement
   * @param {*} announcementId
   * @param {*} announcement
   * @returns
   */
  async deleteAnnouncement(announcementId) {
    const connection = getMysqlConnection();
    const query = 'DELETE FROM announcement WHERE id = ?';

    const [error] = await to(
      connection.promise().query(query, [announcementId])
    );

    if (error) {
      addNewLog(this.serviceName, `Error while deleting Announcement ${announcementId}`);

      return { error: { code: 500, message: error } };
    }

    addNewLog(this.serviceName, `Announcement ${announcementId} was deleted`);

    const result = { id: announcementId };

    return { result };
  }

  /**
   * Get announcement by id
   * @param {*} announcementId
   * @param {*} announcement
   * @returns
   */
  async getAnnouncement(announcementId) {
    const connection = getMysqlConnection();
    const query = 'SELECT * FROM announcement WHERE id = ?';

    addNewLog(this.serviceName, `Retrieving Announcement ${announcementId}`);

    const [error, [resultRows, _]] = await to(
      connection.promise().query(query, [announcementId])
    );

    if (!resultRows.length)
      return {
        error: {
          code: 404,
          message: `Announcement with id ${announcementId} was not found`,
        },
      };

    if (error) return { error: { code: 500, message: error } };

    // We can take the first element of the  resultRows because there always be only one record as we are specifying in
    // our query id which is unique primary key
    return { result: resultRows[0] };
  }

  /**
   * Get announcements by userId
   * @param {*} announcementId
   * @param {*} announcement
   * @returns
   */
  async getAnnouncementsByUserId(userId) {
    const connection = getMysqlConnection();
    const query = 'SELECT * FROM announcement WHERE user_id = ?';

    addNewLog(this.serviceName, `Retrieving Announcements by userId ${userId}`);

    const [error, [resultRows, _]] = await to(
      connection.promise().query(query, [userId])
    );

    if (error) return { error: { code: 500, message: error } };

    return { result: resultRows };
  }

  /**
   * Get announcements by title and description full text search
   * @param {*} announcementId
   * @param {*} announcement
   * @returns
   */
  async getAnnouncementsByFullTextSearch(searchQuery) {
    const connection = getMysqlConnection();
    const query = `SELECT * FROM announcement WHERE MATCH (title, description) AGAINST (? IN NATURAL LANGUAGE MODE)`;

    addNewLog(this.serviceName, `Running Announcements full text search with query ${searchQuery}`);

    const [error, [resultRows, _]] = await to(
      connection.promise().query(query, [searchQuery])
    );

    if (error) return { error: { code: 500, message: error } };

    return { result: resultRows };
  }
}
