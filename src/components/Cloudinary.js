import React, { useEffect } from 'react'

export const Cloudinary = () => {
  const cloudName = process.env.REACT_APP_CLOUDNAME
  const uploadPreset = process.env.REACT_APP_PRESET 

  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info: ', result.info)
        document
          .getElementById('uploadedimage')
          .setAttribute('src', result.info.secure_url)
      }
    }
  )

  const handleOpen = () => myWidget.open()

  useEffect(() => {
    document
      .getElementById('upload_widget')
      .addEventListener('click', handleOpen, false)
    return () => {
      document.removeEventListener('click', handleOpen)
    }
  }, [])

  return (
    <button id="upload_widget" className="cloudinary-button">
      Upload
    </button>
  )
}

