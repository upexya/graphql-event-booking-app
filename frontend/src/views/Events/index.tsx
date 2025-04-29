import { useState } from "react";
import { useQuery, NetworkStatus } from "@apollo/client";

import Toast from "@components/Common/Toast";
import ModalDialog from "@components/Common/Modal";
import AddEventForm from "@components/Forms/addEvent";
import LoadingScreen from "@components/Common/LoadingScreen";
import EventCardList, { IEvent } from "@components/Events/eventCardList";

import { GET_EVENTS } from "@queries/event";
import Spinner from "@components/Common/Spinner";

export default function Events() {
  const [open_dialog, setOpenDialog] = useState(false);

  const { data, loading, error, refetch, networkStatus } = useQuery(
    GET_EVENTS,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  const onCreateEvent = (new_event: IEvent) => {
    refetch();
    setOpenDialog(false);
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
            onClick={() => setOpenDialog(!open_dialog)}
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
        is_open={open_dialog}
        setIsOpen={() => setOpenDialog(false)}
        title={"Add your event"}
        width="500px"
      >
        <AddEventForm onCreateEvent={onCreateEvent} />
      </ModalDialog>
    </div>
  );
}
