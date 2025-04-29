import { useContext } from "react";
import { ApolloError } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEuroSign,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

import { IEvent } from "./eventCardList";
import getReadableDateTime from "@utils/getReadableDateTime";

import { UserContext } from "@context/user";

import Toast from "@components/Common/Toast";
import Spinner from "@components/Common/Spinner";

import default_user from "@assets/default-user.jpg";

export default function EventDetails(props: {
  event: IEvent;
  handleBookEvent: () => void;
  loading?: boolean;
  error?: ApolloError;
}) {
  const { loading, handleBookEvent, error } = props;
  const { _id, title, description, date, created_by, location, price } =
    props.event;

  const { user } = useContext(UserContext);
  const is_own_event = user?.user?._id === created_by?._id;

  const organizer_content = (
    <div className="flex items-center mt-2">
      <img
        src={created_by?.avatar || default_user}
        className="w-5 h-5 rounded-full object-cover"
      />
      <span className="text-xs/5 text-gray-500 ml-2">
        {is_own_event
          ? "This event was by created by you"
          : `${created_by?.name}'s event`}
      </span>
    </div>
  );

  const event_details_content = (
    <div className="mb-3">
      <p className="text-lg font-bold text-primary">{title}</p>
      <p className="my-1 truncate text-xs/5 text-gray-500">
        <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
        {location} |
        {price ? <FontAwesomeIcon icon={faEuroSign} className="ml-2" /> : null}
        {!price ? " Free Event " : price} |
        <FontAwesomeIcon icon={faCalendarDay} className="mx-2" />
        {getReadableDateTime(date)}
      </p>
      {organizer_content}
    </div>
  );

  return (
    <div className="px-3 overflow-hidden">
      {error ? (
        <Toast
          type="danger"
          message={
            error?.message || "Something went wrong, please try again later."
          }
        />
      ) : null}
      <div className="min-w-0 flex-auto">
        {event_details_content}
        <p className="text-sm/6 text-gray-900 text-justify">{description}</p>
        <button
          onClick={() => {
            if (!loading) handleBookEvent();
          }}
          disabled={loading}
          className="mt-3 font-semibold cursor-pointer rounded-md bg-primary px-3 py-2 text-white"
        >
          {loading ? <Spinner /> : "Book Now"}
        </button>
      </div>
    </div>
  );
}
