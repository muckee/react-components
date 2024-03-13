const useObservable = (target: object) => {
    let listeners: ((val: object) => void)[] = []; // initial listeners can be passed an an argument aswell
    let value = target;

    function get() {
        return value;
    }

    function set(newValue: object) {
        if (value === newValue) return;
        value = newValue;
        listeners.forEach((l) => l(value));
    }

    function subscribe(listenerFunc: (val: object) => void) {
        listeners.push(listenerFunc);
        return () => unsubscribe(listenerFunc); // will be used inside React.useEffect
    }

    function unsubscribe(listenerFunc: (val: object) => void) {
        listeners = listeners.filter((l) => l !== listenerFunc);
    }

    return {
        get,
        set,
        subscribe,
    };
};

export default useObservable;