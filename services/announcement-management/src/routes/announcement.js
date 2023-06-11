import { Router } from 'express';

import AnnouncementController from '../controllers/announcement.js';
import { verifyUser } from '../middlewares/authentication.js';

const announcementController = new AnnouncementController();
const announcementRouter = Router();


announcementRouter.post('/', verifyUser, announcementController.createAnnouncement);
announcementRouter.put('/announcement/:id', verifyUser, announcementController.updateAnnouncement);
announcementRouter.delete('/announcement/:id', verifyUser, announcementController.deleteAnnouncement);
announcementRouter.get('/announcement/:id', verifyUser, announcementController.getAnnouncement);
announcementRouter.get('/', verifyUser, announcementController.getAnnouncementsByUserId);
announcementRouter.get('/search', verifyUser, announcementController.getAnnouncementsByFullTextSearch);

export { announcementRouter };
