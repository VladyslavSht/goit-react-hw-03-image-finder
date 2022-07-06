import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, img, modal }) => {
  return (
    <>
      <li className={s.galleryCard} key={id} onClick={() => modal(id)}>
        <img className={s.galleryImg} src={img} alt={id} />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  modal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
