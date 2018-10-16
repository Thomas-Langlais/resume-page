export function createOneTimeEvent(elem, eventType, exitCond, onCond, thisArg = window, ...params) {

    var event = function event(e) {

        if (exitCond.apply(thisArg, [e, params].flat())) {
            if (onCond) onCond.apply(thisArg, [e, params].flat());
            elem.removeEventListener(eventType, event);
        }
    }

    elem.addEventListener(eventType, event)

    return;
}

export function getTextWidth(text, font) {
    // if given, use cached canvas for better performance
    // else, create new canvas
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}