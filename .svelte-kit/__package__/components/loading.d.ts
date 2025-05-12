export declare const loading: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<{
        status: string;
        message: string;
    }>, invalidate?: () => void) => import("svelte/store").Unsubscriber;
    update: (this: void, updater: import("svelte/store").Updater<{
        status: string;
        message: string;
    }>) => void;
    set: (this: void, value: {
        status: string;
        message: string;
    }) => void;
    setNavigate: (isNavigating: boolean) => void;
    setLoading: (isLoading: boolean, message?: string) => void;
};
