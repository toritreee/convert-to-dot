import { useCallback, useEffect, useRef, useState } from 'react'

import InputFile from './InputFile'
import fileToImage from './fileToImage'
import Preview from './Preview'
import ViewConfig, { config } from './Config'
import { DotWorker } from './worker/client'

function useApp() {
  const [file,setFile] = useState<File>()
  const [image,setImage] = useState<HTMLImageElement>()
  const [config, setConfig] = useState<config>({ dotRoughness: 10 })
  const [outputImage, setOutputImage] = useState<HTMLImageElement>()
  const remake = useCallback(() => {
    if (image) {
      console.log("k",image)
      new DotWorker(image, config.dotRoughness).convert().then(v => {
        setOutputImage(v.image)
      })
    }
  },[image,config])


  useEffect(() => {
    if(file==null)return
    fileToImage(file).then((v) => {
      setImage(v)
    })
    setOutputImage(undefined)
  }, [file])
  useEffect(() => {
    setOutputImage(undefined)
  },[config])
  return {
    setFile,
    inputImage: image,
    outputImage: outputImage,
    config,
    setConfig,
    remake
  }
}

function App() {
  const { setFile, inputImage, outputImage, config, setConfig, remake } = useApp()
  return <main>
    <InputFile setFile={setFile} />
    {inputImage ? <Preview image={inputImage} /> : undefined}
    {outputImage
      ? <Preview image={outputImage} />
      : undefined
    }
    <ViewConfig config={config} setConfig={setConfig} />
    <button onClick={remake}>変換</button>
  </main>
}

export default App
