import { v2 as cloudinary } from 'cloudinary'

// Validate Cloudinary configuration
const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

if (!cloudName || !apiKey || !apiSecret) {
  console.warn('☁️ CLOUDINARY: Missing Cloudinary credentials. Image uploads will not work.')
} else {
  console.log('☁️ CLOUDINARY: ✅ Credentials found, Cloudinary is configured')
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
    console.log('☁️ CLOUDINARY UPLOAD: 🚀 Starting upload process')
    console.log('☁️ CLOUDINARY UPLOAD: 📁 File details:', {
      fileName,
      bufferSize: fileBuffer.length,
      options
    })

    if (!cloudName || !apiKey || !apiSecret) {
      const error = new Error('Cloudinary credentials not configured')
      console.error('☁️ CLOUDINARY UPLOAD: ❌ Credentials error:', error.message)
      reject(error)
      return
    }

    console.log('☁️ CLOUDINARY UPLOAD: 🔧 Configuring upload stream...')
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
          console.error('☁️ CLOUDINARY UPLOAD: ❌ Upload error:', error)
          console.error('☁️ CLOUDINARY UPLOAD: ❌ Error details:', {
            message: error.message,
            http_code: error.http_code,
            name: error.name
          })
          reject(error)
        } else if (result) {
          console.log('☁️ CLOUDINARY UPLOAD: ✅ Upload successful!')
          console.log('☁️ CLOUDINARY UPLOAD: 📊 Result details:', {
            public_id: result.public_id,
            url: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes
          })
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            secure_url: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
          })
        } else {
          const error = new Error('Upload failed - no result returned')
          console.error('☁️ CLOUDINARY UPLOAD: ❌ No result error:', error.message)
          reject(error)
        }
      }
    )

    console.log('☁️ CLOUDINARY UPLOAD: 📤 Writing buffer to upload stream...')
    uploadStream.end(fileBuffer)
    console.log('☁️ CLOUDINARY UPLOAD: ✅ Buffer written to stream')
  })
}

// Helper function to delete image from Cloudinary
export async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log('☁️ CLOUDINARY DELETE: 🗑️ Deleting image:', publicId)
    
    if (!cloudName || !apiKey || !apiSecret) {
      const error = new Error('Cloudinary credentials not configured')
      console.error('☁️ CLOUDINARY DELETE: ❌ Credentials error:', error.message)
      reject(error)
      return
    }

    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error('☁️ CLOUDINARY DELETE: ❌ Delete error:', error)
        reject(error)
      } else {
        console.log('☁️ CLOUDINARY DELETE: ✅ Delete successful:', result)
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
  console.log('☁️ CLOUDINARY URL: 🔗 Generating optimized URL for:', publicId, 'with options:', options)
  
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

  const url = cloudinary.url(publicId, {
    transformation,
    secure: true
  })
  
  console.log('☁️ CLOUDINARY URL: ✅ Generated URL:', url)
  return url
}

export default cloudinary 