import * as React from "react";
import * as ReactDOM from "react-dom";

import { View } from "./View";
import "../model/Store";
export default self;

window.onload = e => ReactDOM.render(React.createElement(View, {}), document.getElementById("app"));



const debounce = (fn) => {
    let frame;
    return (...params) => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => fn(...params) );
    } 
};
  
const storeScroll = () =>
{
    (document as any).documentElement.dataset.scroll = window.scrollY;
}
document.addEventListener('scroll', debounce(storeScroll), { passive: true });
storeScroll();