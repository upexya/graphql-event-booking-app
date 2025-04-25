import { useState } from "react";

import ModalDialog from "@components/Common/Modal";
import AddEventForm from "@components/Forms/addEvent";

export default function Events() {
  const [open_dialog, setOpenDialog] = useState(false);

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
        <AddEventForm />
      </ModalDialog>
    </div>
  );
}
