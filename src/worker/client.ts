export class DotWorker {
  constructor(private image: HTMLImageElement, private dotSize: number) {}
  async convert(
    load: (pars: number) => void
  ): Promise<{ image: HTMLImageElement; blobUrl: string }> {
    return new Promise((res) => {
      const offscreen = this.getOffscreen();
      const worker = this.getWorker();
      worker.addEventListener(
        "message",
        (
          v: MessageEvent<
            { type: "pars"; data: number } | { type: "ans"; data: Blob }
          >
        ) => {
          switch (v.data.type) {
            case "pars":
              load(v.data.data)
              break
            case "ans":
              const img = new Image();
              const blobUrl = URL.createObjectURL(v.data.data);
              img.src = blobUrl;
              img.width = this.image.width;
              img.height = this.image.height;
              res({ image: img, blobUrl });
              break
          }
        }
      );
      load(0.01)
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
