import { Router } from 'express';

import AnnouncementController from '../controllers/announcement.js';
import { verifyUser } from '../middlewares/authentication.js';

const announcementController = new AnnouncementController();
const announcementRouter = Router();
const announcementRouterPrefix = '/announcement';

announcementRouter.post(announcementRouterPrefix, verifyUser, announcementController.createAnnouncement);
announcementRouter.put(announcementRouterPrefix + '/:id', verifyUser, announcementController.updateAnnouncement);
announcementRouter.delete(announcementRouterPrefix + '/:id', verifyUser, announcementController.deleteAnnouncement);

export { announcementRouter };
