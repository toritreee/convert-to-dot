type color = number[]
/**
 * 画像を一定の大きさの領域で区切り、その中の平均を出す
 */
export default class Dot {
  private ctx: OffscreenCanvasRenderingContext2D;
  private width: number
  private height: number
  constructor(
    private canvas: OffscreenCanvas,
    private dotSize: number,
    private img: HTMLImageElement
  ) {
    this.ctx = this.createCtx(canvas);
    this.width = canvas.width
    this.height = canvas.height
  }
  async convert(load:(pars:number)=>void): Promise<Blob> {
    return new Promise((res) => {
      for (let x = 0; x < this.width; x += this.dotSize) {
        for (let y = 0; y < this.height; y += this.dotSize) {
          this.mixColor(x, y, this.dotSize);
        }
        load(x/this.width)
      }
      this.canvas.convertToBlob({"type":"image/jpeg","quality":0.7}).then(v => {
        res(v)
      })
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

  private createCtx(canvas: OffscreenCanvas):OffscreenCanvasRenderingContext2D {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (ctx == null) throw new Error("???");
    ctx.drawImage(this.img,0,0)
    return ctx;
  }
}
