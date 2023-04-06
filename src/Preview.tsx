import { useEffect, useRef } from "react"
function usePreview(image: CanvasImageSource) {
  const canvas = useRef<HTMLCanvasElement>(null)
  console.log(canvas)
  useEffect(() => {
    const ctx = canvas.current?.getContext("2d")
    console.log("Preview", image, canvas, typeof ctx != "object" || ctx == null)
    if (typeof ctx != "object" || ctx == null)
      return
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
    ctx.drawImage(image, 0, 0)
  }, [image, canvas])
  return canvas
}
export default function Preview({ image }: { image: HTMLImageElement }) {
  //const canvas = usePreview(image)//<canvas ref={canvas} width={Number(image.width)} height={Number(image.height)}></canvas>
  return <div>
    <img src={image.src} alt="" style={{ width: "100vmin" }} />
  </div>
}