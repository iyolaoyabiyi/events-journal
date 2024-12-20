import PropTypes from "prop-types"
import { getButtonClasses } from "../utils/helpers";

const Button = ({ type, classType, clickFunc, btnText, disabled }) => (
  <button
    type={ type }
    className={ getButtonClasses(classType) }
    onClick={ clickFunc }
    disabled={ disabled }>
    { btnText }
  </button>
);

Button.propTypes = {
  btnText: PropTypes.string,
  clickFunc: PropTypes.func,
  classType: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool
}

export default Button;