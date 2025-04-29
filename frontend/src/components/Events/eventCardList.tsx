import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

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
  }[];
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
  const { _id, title, description, location, price, created_by } = props.event;
  return (
    <li className="flex justify-between py-5 px-3 border-b-1 border-gray-200 hover:shadow-lg">
      <Link to="#">
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-semibold text-primary">{title}</p>
          <p className="mt-1 truncate text-xs/5 text-gray-500">
            <FontAwesomeIcon icon={faLocationDot} /> {location}
          </p>
          <p className="text-sm/6 text-gray-900">{description}</p>
        </div>
      </Link>
    </li>
  );
};
