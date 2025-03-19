import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
    interface Window {
        Echo: Echo;
        Pusher: any;
    }
}
