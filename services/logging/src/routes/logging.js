import { Router } from 'express';

import LoggingController from '../controllers/logging.js';
import { verifyUser } from '../middlewares/authentication.js';

const loggingController = new LoggingController();
const loggingRouter = Router();

loggingRouter.post('/', verifyUser, loggingController.addLog);

export { loggingRouter };
