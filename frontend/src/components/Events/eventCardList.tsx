import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEuroSign,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

import getReadableDateTime from "@utils/getReadableDateTime";

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  price?: number;
  created_by: {
    _id: string;
    name: string;
    avatar?: string;
  };
}

export default function EventCardList(props: { events: IEvent[] }) {
  const { events } = props;

  if (!events.length) return null;

  return (
    <ul role="list">
      {events.map((event) => (
        <EventCard event={event} key={`event-list-${event._id}`} />
      ))}
    </ul>
  );
}

const EventCard = (props: { event: IEvent }) => {
  const { _id, title, description, location, price, date, created_by } =
    props.event;

  const [searchParams, setSearchParams] = useSearchParams();

  const handleViewDetails = () => {
    searchParams.set("modal", _id);
    setSearchParams(searchParams);
  };

  const event_details_content = (
    <div>
      <p className="text-lg font-bold text-primary">{title}</p>
      <p className="mt-1 mb-3 truncate text-xs/5 text-gray-500">
        <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
        {location} |
        {price ? <FontAwesomeIcon icon={faEuroSign} className="ml-2" /> : null}
        {!price ? " Free Event " : price} |
        <FontAwesomeIcon icon={faCalendarDay} className="mx-2" />
        {getReadableDateTime(date)}
      </p>
    </div>
  );

  return (
    <li className="py-5 px-3 border-b-1 border-gray-200 overflow-hidden">
      <div className="min-w-0 flex-auto">
        <div className="flex justify-between mb-2 flex-col md:flex-row ">
          {event_details_content}
          <button
            onClick={handleViewDetails}
            className="hover:border-b-2 h-fit cursor-pointer text-white font-semibold md:text-primary bg-primary md:bg-white md:mx-3 p-2 md:p-0 rounded-md md:rounded-none"
          >
            View Details
          </button>
        </div>

        <p className="text-sm/6 text-gray-900 text-justify">{description}</p>
      </div>
    </li>
  );
};
