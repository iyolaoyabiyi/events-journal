import PropTypes from "prop-types";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import List from "../components/List";
import Loading from "../components/Loading";
import { useContext, useMemo } from "react";
import { EventContext } from "../store/Contexts";
import { getCategories } from "../utils/helpers";
import EmptyEvents from "../components/EmptyEvents";

const Categories = () => {
  const { events, isLoading } = useContext(EventContext);
  const categories = useMemo(() => getCategories(events), [events])
  
  return (
    <section className="page">
      <h2 className="page-heading">Categories</h2>
      
        { isLoading ? 
          <Loading /> :
          events.length < 1 ?
          <EmptyEvents text="categories" /> :
          <List 
            items={ categories }
            renderItem={ (category) => (
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                <span>{category}</span>
              </div>
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