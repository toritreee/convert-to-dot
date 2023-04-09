import Dot from "../dot";

addEventListener(
  "message",
  (ev: MessageEvent<{ ctx: OffscreenCanvasRenderingContext2D, dotSize: number }>) => {
    const {ctx,dotSize} = ev.data
    new Dot(ctx, dotSize).convert().then(v => {
      self.postMessage(v)
    })
  }
);