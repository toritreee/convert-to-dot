import { useEffect, useRef } from "react"
function usePreview(image: CanvasImageSource) {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const ctx = canvas.current?.getContext("2d")
    if (typeof ctx != "object" || ctx == null)
      return
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
    ctx.drawImage(image,0,0)
  }, [image])
  return canvas
}
export default function Preview({ image }: { image: CanvasImageSource }) {
  const canvas = usePreview(image)//<canvas ref={canvas} width={Number(image.width)} height={Number(image.height)}></canvas>
  return <div>
    <canvas ref={canvas} width={Number(image.width)} height={Number(image.height)} style={{width:"100vmin"}}></canvas>
  </div>
}