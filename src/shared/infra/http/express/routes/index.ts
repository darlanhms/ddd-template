import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    return res.json(`Server actually online <br> Current time: ${new Date()}`);
});

export default router;
