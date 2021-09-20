import { Router } from 'express';

import paymentRouter from '@payment/infra/http/routes';
import userRouter from '@user/infra/http/routes';
import entityRouter from '@entity/infra/http/routes';
import locationRouter from '@location/infra/http/routes';
import deliveryRouter from '@delivery/infra/http/routes';
import printerRouter from '@printer/infra/http/routes';

const businessRouter = Router({ mergeParams: true });
const businessSubRouter = Router({ mergeParams: true });

// sub routes under :businessId path
businessSubRouter.use('/payments', paymentRouter);
businessSubRouter.use('/users', userRouter);
businessSubRouter.use('/entities', entityRouter);
businessSubRouter.use('/locations', locationRouter);
businessSubRouter.use('/deliveries', deliveryRouter);
businessSubRouter.use('/printers', printerRouter);

businessRouter.use('/:businessId', businessSubRouter);

export default businessRouter;
