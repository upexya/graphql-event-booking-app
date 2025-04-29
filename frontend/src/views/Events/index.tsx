import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useQuery, useMutation, NetworkStatus } from "@apollo/client";

import Toast from "@components/Common/Toast";
import ModalDialog from "@components/Common/Modal";
import AddEventForm from "@components/Forms/addEvent";
import LoadingScreen from "@components/Common/LoadingScreen";
import EventCardList, { IEvent } from "@components/Events/eventCardList";
import EventDetails from "@components/Events/eventDetails";
import Spinner from "@components/Common/Spinner";

import booking_status from "@constants/booking_status";

import { UserContext } from "@context/user";

import { GET_EVENTS } from "@queries/event";
import { CREATE_BOOKING } from "@queries/booking";

export default function Events() {
  const [create_event_dialog, setCreateEventDialog] = useState(false);
  const [view_event_dialog, setViewEventDialog] = useState(false);
  const [active_event, setActiveEvent] = useState<IEvent>();

  const { user } = useContext(UserContext);

  const { data, loading, error, refetch, networkStatus } = useQuery(
    GET_EVENTS,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  const [
    createBooking,
    {
      loading: create_booking_loading,
      error: create_booking_error,
      reset: resetCreateBooking,
    },
  ] = useMutation(CREATE_BOOKING);

  const [search_params, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (search_params.get("modal") && !loading && data?.events?.length) {
      const _active_event = data.events.find(
        (e: IEvent) => e._id === search_params.get("modal")
      );
      setActiveEvent(_active_event);
      setViewEventDialog(true);
    } else if (!search_params.get("modal") && view_event_dialog) {
      setViewEventDialog(false);
      setActiveEvent(undefined);
      resetUrlParam();
    }
  }, [search_params, loading]);

  const onCreateEvent = (new_event: IEvent) => {
    refetch();
    setCreateEventDialog(false);
  };

  const resetUrlParam = () => {
    search_params.delete("modal");
    setSearchParams(search_params);
  };

  const handleBookEvent = async () => {
    await createBooking({
      variables: {
        input: {
          event_id: search_params.get("modal"),
          user_id: user?.user?._id,
          status: booking_status.CONFIRMED,
        },
      },
    });
    toast("Booking made sucessfully!");
    setViewEventDialog(false);
    resetUrlParam();
    resetCreateBooking();
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div>
        <Toast
          type="danger"
          message={
            error?.message || "Something went wrong, please try again later."
          }
        />
      </div>
    );
  }

  const jumbotron_content = (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-4 text-md font-bold tracking-tight leading-none text-gray-600 md:text-xl lg:text-2xl">
          Start Your Event in Minutes
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          Click below, add your event name, location, and price — and start
          bringing people together!
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <button
            onClick={() => setCreateEventDialog(!create_event_dialog)}
            className="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Get started
          </button>
        </div>
      </div>
    </section>
  );

  return (
    <div>
      {jumbotron_content}
      <h1 className="mb-4 text-lg font-bold tracking-tight leading-none text-gray-600 md:text-2xl lg:text-3xl">
        Explore events
      </h1>
      {networkStatus === NetworkStatus.refetch ? (
        <Spinner />
      ) : (
        <EventCardList events={data?.events || []} />
      )}
      <ModalDialog
        is_open={create_event_dialog}
        setIsOpen={() => setCreateEventDialog(false)}
        title={"Add your event"}
        width="500px"
      >
        <AddEventForm onCreateEvent={onCreateEvent} />
      </ModalDialog>

      {active_event ? (
        <ModalDialog
          is_open={view_event_dialog}
          setIsOpen={() => setViewEventDialog(false)}
          onClose={() => {
            resetUrlParam();
            resetCreateBooking();
          }}
          title={"Event Details"}
          width="500px"
        >
          <EventDetails
            event={active_event}
            handleBookEvent={handleBookEvent}
            loading={create_booking_loading}
            error={create_booking_error}
          />
        </ModalDialog>
      ) : null}

      <ToastContainer />
    </div>
  );
}
