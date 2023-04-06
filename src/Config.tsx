import { useId, useState } from "react"

export interface config{
  dotRoughness: number
}

export default function ViewConfig({ config, setConfig }: { config: config, setConfig: React.Dispatch<React.SetStateAction<config>> }) {
  return <div>
    <div>
      <div>
        <span>
          ドットの粗さ
        </span>
        <input type="number" min={1} max={1000} value={config.dotRoughness} onChange={(e) =>
          setConfig({ ...config, dotRoughness: Number(e.target.value) })
        } />
        <input type="range" min={1} max={1000} value={config.dotRoughness} onChange={(e) =>
          setConfig({ ...config, dotRoughness: Number(e.target.value) })
        } />
      </div>
    </div>
  </div>
}