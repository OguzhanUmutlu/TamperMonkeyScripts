// ==UserScript==
// @name          Skribbl.IO Rainbow Chat
// @description   Makes chat rainbow in skribbl.io!
// @version       1.0.0
// @author        OguzhanUmutlu
// @match         *://*.skribbl.io/*
// @run-at        document-start
// @grant         none
// @noframes
// ==/UserScript==

(function() {
    'use strict';
    let last = "";
    let workers = [];
    function rainbow(a) {
        return a.split("").map(j=> `<span style="color: rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)});">${j}</span>`).join("");
    }
    setInterval(() => {
        workers.forEach(l => {
            const {first, worker} = l;
            let sender = first.split("</b>")[0].replace("<b>","").replace(": ", "");
            if(sender) {
                let message = first.split("</b>")[1].replace("<span>","").split("");
                message = message.slice(0, message.length-7).join("");
                worker.innerHTML = "<b>" + rainbow(sender) + "</b> > " + rainbow(message);
            }
        }, workers.length*10);
        if(document.getElementById("boxMessages").innerHTML == last) return;
        last = document.getElementById("boxMessages").innerHTML;
        [].slice.call(document.getElementById("boxMessages").children).filter(i=> !i.style["font-weight"]).forEach(i=> {
            i.style = null;
            if(i.innerHTML.includes("<b>") && !workers.some(j => j.worker === i)) workers.push({worker: i, first: i.innerHTML});
        })
    });
})();
