import PropTypes from "prop-types";

import List from "../components/List";
import Loading from "../components/Loading";
import { useContext } from "react";
import { EventContext } from "../store/Contexts";
import { getEventNames } from "../utils/helpers";

const Events = () => {
  const { isLoading, events } = useContext(EventContext);

  return (
    <section className="page">
      <h2 className="page-heading">Events</h2>
      { isLoading ? 
        <Loading /> : 
        <List 
          items={getEventNames(events)}  
          renderItem={(event) => (
            <div>
              <p className="text-lg font-semibold">{event.name}</p>
              <p className="text-sm text-gray-600">{event.category}</p>
            </div>
          ) }
        />
      }
    </section>
  );
}

Events.propTypes = {
  isLoading: PropTypes.bool,
  events: PropTypes.array
}

export default Events;