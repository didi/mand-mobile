export interface ImageProcessorOptions {
  dataUrl: string
  width?: number
  height?: number
  quality: number
}

export interface ImageProcessorData {
  dataUrl: string
  blob: Blob
}

export default function ImageProcessor(
  options: ImageProcessorOptions,
  callback?: (data: ImageProcessorData) => any): Promise<ImageProcessorData>
