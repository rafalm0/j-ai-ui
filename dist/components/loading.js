import { writable } from 'svelte/store';
const newLoading = () => {
    const { subscribe, update, set } = writable({
        status: 'IDLE', // IDLE, LOADING, NAVIGATING
        message: ''
    });
    function setNavigate(isNavigating) {
        update(() => {
            return {
                status: isNavigating ? 'NAVIGATING' : 'IDLE',
                message: ''
            };
        });
    }
    function setLoading(isLoading, message = '') {
        update(() => {
            return {
                status: isLoading ? 'LOADING' : 'IDLE',
                message: isLoading ? message : ''
            };
        });
    }
    return { subscribe, update, set, setNavigate, setLoading };
};
export const loading = newLoading();
