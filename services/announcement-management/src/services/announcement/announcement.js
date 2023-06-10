import { to } from 'await-to-js';

import { getMysqlConnection } from '../../persistence/mysql/mysql.js';

/**
 * Class with service methods for announcement-management service
 */
export default class AnnouncementService {
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

    if (error) return { error: { code: 500, message: error } };

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

    if (error) return { error: { code: 500, message: error } };

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
    // const [error, [resultRows, _]] = await to(
    //   connection.promise().query(query, newAnnouncement)
    // );

    if (error) return { error: { code: 500, message: error } };

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
   * Get announcement by id
   * @param {*} announcementId
   * @param {*} announcement
   * @returns
   */
  async getAnnouncement(announcementId) {
    const connection = getMysqlConnection();
    const query = 'SELECT * FROM announcement WHERE id = ?';

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

    const [error, [resultRows, _]] = await to(
      connection.promise().query(query, [userId])
    );

    if (error) return { error: { code: 500, message: error } };

    return { result: resultRows };
  }
}
