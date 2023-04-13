import Dot from "../dot";

addEventListener(
  "message",
  (ev: MessageEvent<{ canvas: OffscreenCanvas, dotSize: number, image: HTMLImageElement }>) => {
    const { canvas, dotSize, image } = ev.data
    new Dot(canvas, dotSize, image).convert((pars) => {
      self.postMessage({ type: "pars", data: pars })
    }).then(v => {
      self.postMessage({type:"ans",data:v})
    })
  }
);