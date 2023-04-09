import Dot from "../dot";

addEventListener(
  "message",
  (ev: MessageEvent<{ canvas: OffscreenCanvas, dotSize: number, image: HTMLImageElement }>) => {
    const {canvas,dotSize,image} = ev.data
    new Dot(canvas, dotSize,image).convert().then(v => {
      self.postMessage(v)
    })
  }
);