import { useState } from "react";
import { useQuery } from "@apollo/client";

import Toast from "@components/Common/Toast";
import ModalDialog from "@components/Common/Modal";
import AddEventForm from "@components/Forms/addEvent";
import LoadingScreen from "@components/Common/LoadingScreen";

import { GET_EVENTS } from "@queries/event";

export default function Events() {
  const [open_dialog, setOpenDialog] = useState(false);

  const { data, loading, error } = useQuery(GET_EVENTS);

  const onCreateEvent = () => {
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

  return (
    <div>
      <h1>Events</h1>
      <p>List of events</p>
      <button onClick={() => setOpenDialog(!open_dialog)}>toggle</button>
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
