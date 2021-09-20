import { Router } from 'express';

import loginRouter from '@user/infra/http/routes/login';
import businessRouter from './business';

const router = Router();

router.get('/', (req, res) => {
    return res.json(`Server actually online <br> Current time: ${new Date()}`);
});

router.use('/businesses', businessRouter);
router.use('/login', loginRouter);

export default router;
