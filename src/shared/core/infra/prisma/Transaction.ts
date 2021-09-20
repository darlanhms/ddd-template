import { getNamespace } from 'cls-hooked';
import { isTest } from '@utils/testHelpers';
import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

export default function Transaction(): MethodDecorator {
    return (target: unknown, methodName: string | symbol, descriptor: PropertyDescriptor) => {
        // save original method - we gonna need it
        const originalMethod = descriptor.value;

        // override method descriptor with proxy method
        // eslint-disable-next-line func-names
        descriptor.value = async function (...args: any[]) {
            if (isTest()) {
                const result = await originalMethod.apply(this, [...args]);
                return result;
            }

            const context = getNamespace('prisma');

            if (!context) {
                // This will happen if no CLS namespace has been initialied in your app.
                // At application startup, you need to create a CLS namespace using createNamespace(...) function.
                throw new Error(
                    'No CLS namespace defined in your app ... Cannot use CLS transaction management.',
                );
            }

            if (!context.active) {
                // This will happen if your code has not been executed using the run(...) function of your CLS
                // namespace.
                // Example: the code triggered in your app by an entry HTTP request (or whatever other entry event,
                // like one triggered by a message dropped in a queue your app is listening at), should be wrapped
                // using the run(...) function of your CLS namespace.
                // Using run(...) ensures that an active context is set, where you can safely store and retrieve
                // things.
                throw new Error('No CLS active context detected ... Cannot use CLS transaction management.');
            }

            // From here everything is OK to use CLS to manage our transaction.
            // If transction was used previously, we already have it in the context so we shouldn't start it again
            if (context.get('transactionInstance')) {
                const result = await originalMethod.apply(this, [...args]);

                return result;
            }

            return prisma.$transaction(async prisma1 => {
                // We store the EntityManager managing our current transaction.
                context.set('transactionInstance', prisma1);

                // We can now call the function that had been decorated with the Transaction decorator.
                const result = await originalMethod.apply(this, [...args]);

                // We just finished working with the EntityManager managing our transaction: we remove it
                // from the current context.
                context.set('transactionInstance', null);

                return result;
            }, {});
        };
    };
}
