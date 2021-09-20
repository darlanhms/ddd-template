import { getNamespace } from 'cls-hooked';
import { PrismaClient } from '.prisma/client';
import BaseRepositoryMethods from '../BaseRepositoryMethods';

export default abstract class BaseRepository extends BaseRepositoryMethods {
    protected get prisma(): PrismaClient {
        const context = getNamespace('prisma');

        if (context && context.active) {
            const prisma = context.get('transactionInstance');

            if (prisma) {
                // At this point here we have successfully found a transactional EntityManager
                // that was previously saved within the current context.

                // We now use this EntityManager to work.
                return prisma;
            }
        }

        // No specific transactional EntityManager has been found : we use the global EntityManager to work.
        return new PrismaClient();
    }
}
