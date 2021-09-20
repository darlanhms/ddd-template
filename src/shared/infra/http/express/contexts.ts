import { createNamespace } from 'cls-hooked';

const typeormCtx = createNamespace('prisma');
const authCtx = createNamespace('auth');

export default function contexts(callback: () => void): void {
    typeormCtx.run(() => {
        authCtx.run(() => {
            callback();
        });
    });
}
