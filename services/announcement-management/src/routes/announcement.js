import { Router } from 'express';

import AnnouncementController from '../controllers/announcement.js';

const announcementController = new AnnouncementController();
const announcementRouter = Router();
const announcementRouterPrefix = '/announcement';

announcementRouter.get(announcementRouterPrefix, announcementController.testController);

export { announcementRouter };
