function createOneTimeEvent(elem, eventType, exitCond, onCond, thisArg = window, ...params) {

    function event(e) {

        if (exitCond.apply(thisArg, [e, params].flat())) {
            if (onCond) onCond.apply(thisArg, [e, params].flat());
            elem.removeEventListener(eventType, event);
        }
    }

    elem.addEventListener(eventType, event)

    return;
}

export default createOneTimeEvent;