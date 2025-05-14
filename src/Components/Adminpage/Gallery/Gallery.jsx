import React from 'react'

const Gallery = () => {
  return (
    <>
    <h1>Gallery</h1>
    <form >
    <input type="file" id="imageUpload" multiple accept="image/*" />
    <button>submit</button>
    </form>
    </>
  )
}

export default Gallery
