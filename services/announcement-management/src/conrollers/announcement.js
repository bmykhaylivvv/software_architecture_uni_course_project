import AnnouncementService from '../services/announcement/announcement.js'


const announcementService = new AnnouncementService();
/**
 * Class representing Announcement controller
 */
export default class AnnouncementController {
  async testController(req, res) {
    const { result } = await announcementService.testService();

    console.log(result)

    res.status(200).send(result);
  }
}