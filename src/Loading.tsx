import { useState, useEffect } from "react";
import { MdOutlineAutorenew, MdOutlineShuffle } from "react-icons/md";

function useCounter(interval: number) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => setCounter(v=>v+1), interval);
    return () => clearTimeout(timeoutId)
  }, [counter]);

  return counter;
}

function selectText() {
  const texts = [":D", ";(", "画像を生成中です", "そのうち書き直したい...", <a href="https://github.com/toritreee/convert-to-dot">https://github.com/toritreee/convert-to-dot</a>]
  return texts[Math.floor(Math.random()*texts.length)]
}

function useText(interval: number) {
  const [text, setText] = useState<string|JSX.Element>("")
  useEffect(() => {
    if (interval % 6 != 0) return
    setText(selectText())
  }, [interval])
  return text
}

export function Loading({ pars }: { pars: number }) {
  const count = useCounter(500)
  const text = useText(count)
  return <div>
    <div className="flex flex-col h-full justify-center gap-1">
      <div className="inline-block w-full overflow-hidden">
        <p className="inline-block text-gray-400 w-full text-center font-sm animate-popup">{text}</p>
      </div>
      <div className="w-full h-8 flex flex-col justify-center items-center">
        <MdOutlineAutorenew className="block w-8 h-8 animate-spin"  />
      </div>
      <span className="inline-block text-center">
        <span className="inline opacity-0 select-none">{Array(Number(count % 5)).join(".")}</span>
        {pars}% finish{Array(Number(count % 5)).join(".")}
      </span>
    </div>
  </div>
}
