import AnnouncementService from '../services/announcement/announcement.js';
import Announcement from '../domain/announcement.js';

const announcementService = new AnnouncementService();

/**
 * Class representing announcement-management service controller
 */
export default class AnnouncementController {
  /**
   * POST / controller
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async createAnnouncement(req, res) {
    const { userId, title, description } = req.body;
    const announcement = new Announcement(userId, title, description);
    const { result, error } = await announcementService.createAnnouncement(
      announcement
    );

    if (error) return res.status(error.code).send(error.message);

    return res.status(200).send(result);
  }

  /**
   * PUT /announcement/:id controller
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async updateAnnouncement(req, res) {
    const { id } = req.params;
    const { userId, title, description } = req.body;

    if (!id) return res.status(400).send('No announcement id provided');

    const announcement = new Announcement(userId, title, description);
    const { result, error } = await announcementService.updateAnnouncement(
      id,
      announcement
    );

    if (error) return res.status(error.code).send(error.message);

    return res.status(200).send(result);
  }

  /**
   * GET /announcement/:id controller
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async getAnnouncement(req, res) {
    const { id } = req.params;

    if (!id) return res.status(400).send('No announcement id provided');

    const { result, error } = await announcementService.getAnnouncement(id);

    if (error) return res.status(error.code).send(error.message);

    return res.status(200).send(result);
  }

  /**
   * DELETE /announcement/:id controller
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async deleteAnnouncement(req, res) {
    const { id } = req.params;

    if (!id) return res.status(400).send('No announcement id provided');

    const { result, error } = await announcementService.deleteAnnouncement(id);

    if (error) return res.status(error.code).send(error.message);

    return res.status(200).send(result);
  }

  /**
   * GET /?userId=1 controller
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async getAnnouncementsByUserId(req, res) {
    const { userId } = req.query;

    if (!userId) return res.status(400).send('No userId provided');

    const { result, error } =
      await announcementService.getAnnouncementsByUserId(userId);

    if (error) return res.status(error.code).send(error.message);

    return res.status(200).send(result);
  }

  /**
   * GET /search?query=abc controller
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async getAnnouncementsByFullTextSearch(req, res) {
    const { query } = req.query;

    if (!query) return res.status(400).send('No search query parameter provided');

    const { result, error } =
      await announcementService.getAnnouncementsByFullTextSearch(query);

    if (error) return res.status(error.code).send(error.message);

    return res.status(200).send(result);
  }
}
