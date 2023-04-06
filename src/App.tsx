import { useCallback, useEffect, useRef, useState } from 'react'

import Dot from './dot'
import InputFile from './InputFile'
import fileToImage from './fileToImage'
import Preview from './Preview'
import ViewConfig, { config } from './Config'

function useApp() {
  const [file,setFile] = useState<File>()
  const [image,setImage] = useState<HTMLImageElement>()
  const [config, setConfig] = useState<config>({ dotRoughness: 10 })
  const [outputImage, setOutputImage] = useState<HTMLImageElement>()
  const remake = useCallback(() => {
    if (image) {
      console.log("k",image)
      new Dot(image, config.dotRoughness, image.width, image.height).convert()
        .then((v) => {
          console.log("o",v)
          setOutputImage(v)
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

  console.log("render",outputImage)
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
