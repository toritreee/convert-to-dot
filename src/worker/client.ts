export class DotWorker {
  constructor(private image: HTMLImageElement, private dotSize: number) {}
  async convert():Promise<{image: HTMLImageElement, blobUrl: string}> {
    return new Promise((res) => {
      const canvas = document.createElement("canvas");
      canvas.width = this.image.width;
      canvas.height = this.image.height;
      const offscreenCtx = canvas.transferControlToOffscreen().getContext("2d");
      if(offscreenCtx==null){throw Error("???")}
      offscreenCtx.drawImage(this.image, 0, 0);

      const worker = new Worker(new URL("./worker", import.meta.url), {
        type: "module",
      });
      worker.addEventListener("message", (v: MessageEvent<Blob>) => {
        const img = new Image();
        const blobUrl = URL.createObjectURL(v.data);
        img.src = blobUrl;
        img.width = this.image.width;
        img.height = this.image.height;
        res({ image: img, blobUrl });
      });
      worker.postMessage({
        ctx: offscreenCtx,
        dotSize: this.dotSize,
      });
    });
  }
}
