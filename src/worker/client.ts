export class DotWorker {
  constructor(private image: HTMLImageElement, private dotSize: number) {}
  async convert(): Promise<{ image: HTMLImageElement; blobUrl: string }> {
    return new Promise((res) => {
      const offscreen = this.getOffscreen()
      const worker = this.getWorker();
      worker.addEventListener("message", (v: MessageEvent<Blob>) => {
        const img = new Image();
        const blobUrl = URL.createObjectURL(v.data);
        img.src = blobUrl;
        img.width = this.image.width;
        img.height = this.image.height;
        res({ image: img, blobUrl });
      });
      createImageBitmap(this.image).then((v) => {
        worker.postMessage(
          {
            canvas: offscreen,
            dotSize: this.dotSize,
            image: v,
          },
          [offscreen]
        );
      });
    });
  }

  private getWorker() {
    return new Worker(new URL("./worker", import.meta.url), {
      type: "module",
    });
  }

  private getOffscreen() {
    const canvas = document.createElement("canvas");
    canvas.width = this.image.width;
    canvas.height = this.image.height;
    return canvas.transferControlToOffscreen();
  }
}
