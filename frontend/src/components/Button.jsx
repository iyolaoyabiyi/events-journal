import PropTypes from "prop-types"

const Button = ({ type, clickFunc, btnText }) => (
  <button
    type={ type }
    className={`${type === "reset" ? "bg-red-600 hover:bg-red-700 focus:ring-red-500" : "bg-green-600 hover:bg-green-700 focus:ring-green-500"} text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 uppercase`}

    onClick={ clickFunc }
  >
    { btnText }
  </button>
);

Button.propTypes = {
  btnText: PropTypes.string,
  clickFunc: PropTypes.func,
  type: PropTypes.string
}

export default Button;