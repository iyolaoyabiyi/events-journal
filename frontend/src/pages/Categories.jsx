import PropTypes from "prop-types";

import List from "../components/List";
import Loading from "../components/Loading";

const Categories = ({ categories, isLoading }) => {  
  return (
    <section className="page">
      <h2 className="page-heading">Categories</h2>
      
        { isLoading ? 
          <Loading /> :
          <List 
            items={ categories }
            renderItem={ (category, index) => (
              <p key={ index } className="text-lg font-semibold">{ category }</p>
            )}
          />
        }
    </section>
  );
}

Categories.propTypes = {
  categories: PropTypes.array,
  isLoading: PropTypes.bool
}

export default Categories;