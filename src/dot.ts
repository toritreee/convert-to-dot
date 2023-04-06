type color = number[]
/**
 * 画像を一定の大きさの領域で区切り、その中の平均を出す
 */
export default class Dot {
  private ctx: CanvasRenderingContext2D;
  constructor(
    image: CanvasImageSource,
    private dotSize: number,
    private width: number,
    private height: number
  ) {
    this.ctx = this.createCtx();
    this.ctx.drawImage(image, 0, 0);
  }
  async convert():Promise<HTMLImageElement> {
    return new Promise((res) => {
      for (let x = 0; x < this.width; x += this.dotSize) {
        for (let y = 0; y < this.height; y += this.dotSize) {
          this.mixColor(x, y, this.dotSize);
          console.log(x, y);
        }
      }
      const img = new Image();
      img.src = this.ctx.canvas.toDataURL("image/jpeg", 0.75);
      img.width = this.ctx.canvas.width;
      img.height = this.ctx.canvas.height;
      res(img);
    });
  }

  private mixColor(x: number, y: number, size: number) {
    const image = this.ctx.getImageData(x, y, size, size);
    this.ctx.putImageData(
      this.paintColor(this.dotSize, this.getAverageOf(image.data)),
      x,
      y
    );
  }

  private getAverageOf(arr: Uint8ClampedArray): color {
    //return [arr[0], arr[1], arr[2]];
    const sum = [0, 0, 0];
    for (let i = 0; i < arr.length; i += 4) {
      sum[0] = arr[i + 0];
      sum[1] = arr[i + 1];
      sum[2] = arr[i + 2];
    }
    sum[0] /= arr.length;
    sum[1] /= arr.length;
    sum[2] /= arr.length;
    return [arr[0], arr[1], arr[2]];
  }

  private paintColor(size: number, color: color) {
    const image = this.ctx.createImageData(size, size);
    for (let index = 0; index < image.data.length; index += 4) {
      image.data[index + 0] = color[0];
      image.data[index + 1] = color[1];
      image.data[index + 2] = color[2];
      image.data[index + 3] = 255;
    }
    return image;
  }

  private createCtx() {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext("2d");
    if (ctx == null) throw new Error("???");
    return ctx;
  }
}
