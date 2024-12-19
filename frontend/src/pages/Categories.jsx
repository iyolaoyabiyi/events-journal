import PropTypes from "prop-types";

import List from "../components/List";
import Loading from "../components/Loading";
import { useContext, useMemo } from "react";
import { EventContext } from "../store/Contexts";
import { getCategories } from "../utils/helpers";

const Categories = () => {
  const { events, isLoading } = useContext(EventContext);
  const categories = useMemo(() => getCategories(events), [events])
  
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