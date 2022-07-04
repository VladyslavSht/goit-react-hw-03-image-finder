function ImageGalleryItem({ previewURL }) {
  return (
    <li>
      <img src={previewURL} alt="page" width="60" />
    </li>
  );
}

export default ImageGalleryItem;
