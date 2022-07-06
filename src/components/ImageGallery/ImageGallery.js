import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const ImageGallery = ({ response, modal }) => {
  return (
    <ul className={s.gallery}>
      {response.map(({ id, small }) => {
        return <ImageGalleryItem key={id} id={id} img={small} modal={modal} />;
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  response: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      small: PropTypes.string.isRequired,
    })
  ).isRequired,
  modal: PropTypes.func.isRequired,
};

export default ImageGallery;
