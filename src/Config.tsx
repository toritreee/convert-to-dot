import { useId, useState } from "react"
import { MdOutlineAutorenew } from "react-icons/md"

export interface config{
  dotRoughness: number
}

export default function ViewConfig({ config, setConfig }: { config: config, setConfig: React.Dispatch<React.SetStateAction<config>> }) {
  const Id = useId()
  return <div className="block border-y-8 md:border-x-8 md:border-y-0 border-solid border-sky-500">
    <h2 className="text-center font">設定</h2>
    <div className="m-2">
      <div className="flex flex-col border-y-2 border-gray-500 border-dotted">
        <label htmlFor={Id +"-dotRoughness"} className="">
          ドットの粗さ
        </label>
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