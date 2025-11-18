import { Router } from 'express';
import { analyzeLead, saveLead, getLeadHistory } from '../controllers/leadController';
import validate from '../middleware/validate';
import { analyzeLeadSchema, saveLeadSchema } from '../schemas/leadSchemas';

const router = Router();

router.post('/analyze', validate(analyzeLeadSchema), analyzeLead);
router.post('/leads', validate(saveLeadSchema), saveLead);
router.get('/leads', getLeadHistory);

export default router;
