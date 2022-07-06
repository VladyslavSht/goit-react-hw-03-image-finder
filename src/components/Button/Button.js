import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ handleLoadMore }) => {
  return (
    <>
      <button type="button" className={s.loadMore} onClick={handleLoadMore}>
        Load more
      </button>
    </>
  );
};

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};

export default Button;
