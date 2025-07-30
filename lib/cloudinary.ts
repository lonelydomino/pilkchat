import { v2 as cloudinary } from 'cloudinary'

// Validate Cloudinary configuration
const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

if (!cloudName || !apiKey || !apiSecret) {
  console.warn('Missing Cloudinary credentials. Image uploads will not work.')
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
})

// Helper function to upload image to Cloudinary
export async function uploadImageToCloudinary(
  fileBuffer: Buffer,
  fileName: string,
  options: {
    folder?: string
    transformation?: any[]
    public_id?: string
  } = {}
): Promise<{
  url: string
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
}> {
  return new Promise((resolve, reject) => {
    if (!cloudName || !apiKey || !apiSecret) {
      reject(new Error('Cloudinary credentials not configured'))
      return
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'pilkchat',
        transformation: options.transformation || [
          { quality: 'auto:good' },
          { fetch_format: 'auto' }
        ],
        public_id: options.public_id,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error)
          reject(error)
        } else if (result) {
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            secure_url: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
          })
        } else {
          reject(new Error('Upload failed'))
        }
      }
    )

    uploadStream.end(fileBuffer)
  })
}

// Helper function to delete image from Cloudinary
export async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!cloudName || !apiKey || !apiSecret) {
      reject(new Error('Cloudinary credentials not configured'))
      return
    }

    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error('Cloudinary delete error:', error)
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

// Helper function to get optimized image URL
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: string
    format?: string
  } = {}
): string {
  const transformation = []
  
  if (options.width || options.height) {
    transformation.push({
      width: options.width,
      height: options.height,
      crop: 'fill',
      gravity: 'auto'
    })
  }
  
  if (options.quality) {
    transformation.push({ quality: options.quality })
  }
  
  if (options.format) {
    transformation.push({ fetch_format: options.format })
  }

  return cloudinary.url(publicId, {
    transformation,
    secure: true
  })
}

export default cloudinary 