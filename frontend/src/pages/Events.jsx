import PropTypes from "prop-types";

import List from "../components/List";
import Loading from "../components/Loading";
import { useContext, useMemo } from "react";
import { EventContext } from "../store/Contexts";
import { getEventNames } from "../utils/helpers";

const Events = () => {
  const { isLoading, events } = useContext(EventContext);
  const eventNames = useMemo(() => getEventNames(events), [events]);
  
  return (
    <section className="page">
      <h2 className="page-heading">Events</h2>
      { isLoading ? 
        <Loading /> : 
        <List 
          items={eventNames}  
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