import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useQuery, useMutation, NetworkStatus } from "@apollo/client";

import Toast from "@components/Common/Toast";
import ModalDialog from "@components/Common/Modal";
import LoadingScreen from "@components/Common/LoadingScreen";
import EventCardList, { IEvent } from "@components/Events/eventCardList";
import EventDetails from "@components/Events/eventDetails";
import Spinner from "@components/Common/Spinner";

import booking_status from "@constants/booking_status";

import { GET_BOOKINGS, UPDATE_BOOKING_STATUS } from "@queries/booking";

export default function Bookings() {
  const [view_event_dialog, setViewEventDialog] = useState(false);
  const [active_event, setActiveEvent] = useState<IEvent>();

  const { data, loading, error, networkStatus } = useQuery(GET_BOOKINGS, {
    notifyOnNetworkStatusChange: true,
  });

  const [
    updateBookingStatus,
    { loading: update_status_loading, error: update_status_error },
  ] = useMutation(UPDATE_BOOKING_STATUS);

  const [search_params, setSearchParams] = useSearchParams();
  const modal_id = search_params?.get("modal");

  useEffect(() => {
    if (modal_id && !loading && user_events?.length) {
      const _active_event = user_events.find((e: IEvent) => e._id === modal_id);
      setActiveEvent(_active_event);
      setViewEventDialog(true);
    } else if (!modal_id && view_event_dialog) {
      setViewEventDialog(false);
      setActiveEvent(undefined);
      resetUrlParam();
    }
  }, [search_params, loading]);

  const user_events = useMemo(() => {
    if (!data?.bookings?.length) return [];
    return data.bookings.map((booking: any) => ({
      ...booking.event,
      status: booking.status,
      booking_id: booking._id,
    }));
  }, [data]);

  const resetUrlParam = () => {
    search_params.delete("modal");
    setSearchParams(search_params);
  };

  const handleUpdateBookings = async () => {
    if (active_event?.status && active_event?._id === modal_id) {
      const updated_status =
        active_event?.status === booking_status.CONFIRMED
          ? booking_status.CANCELLED
          : booking_status.CONFIRMED;
      await updateBookingStatus({
        variables: {
          input: {
            _id: active_event?.booking_id,
            status: updated_status,
          },
        },
      });
      toast("Booking status updated sucessfully!");
      setViewEventDialog(false);
      resetUrlParam();
    }
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

  return (
    <div>
      <h1 className="mb-4 text-lg font-bold tracking-tight leading-none text-gray-600 md:text-2xl lg:text-3xl">
        Your Bookings History
      </h1>
      {networkStatus === NetworkStatus.refetch ? (
        <Spinner />
      ) : (
        <EventCardList events={user_events || []} />
      )}

      {active_event ? (
        <ModalDialog
          is_open={view_event_dialog}
          setIsOpen={() => setViewEventDialog(false)}
          onClose={() => {
            resetUrlParam();
          }}
          title={"Event Details"}
          width="500px"
        >
          <EventDetails
            event={active_event}
            handleBookEvent={handleUpdateBookings}
            loading={update_status_loading}
            error={update_status_error}
            booking_status={active_event?.status}
          />
        </ModalDialog>
      ) : null}

      <ToastContainer />
    </div>
  );
}
