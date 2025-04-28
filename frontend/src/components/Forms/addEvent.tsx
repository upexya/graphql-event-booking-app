import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { useForm, SubmitHandler } from "react-hook-form";

import TextField from "@components/Common/FormElements/textfield";
import DatePicker from "@components/Common/FormElements/dayPicker";
import Spinner from "@components/Common/Spinner";
import Toast from "@components/Common/Toast";

import { CREATE_EVENT } from "@queries/event";

import { UserContext } from "@context/user";

interface EventInput {
  title: string;
  description: string;
  location: string;
  date: Date;
  price?: number;
}

export default function AddEventForm(props: { onCreateEvent?: () => void }) {
  const { onCreateEvent } = props;

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<EventInput>({ mode: "all" });

  const { user } = useContext(UserContext);

  const [createEvent, { loading, error, data }] = useMutation(CREATE_EVENT);

  const onSubmit: SubmitHandler<EventInput> = async (data) => {
    if (!isValid) return;

    const { title, description, price, location, date } = data;
    await createEvent({
      variables: {
        input: {
          title,
          description,
          location,
          price: price ? +price : 0.0,
          date,
          created_by: user?.user?._id,
        },
      },
    });
    if (onCreateEvent) onCreateEvent();
  };

  return (
    <div>
      {error ? <Toast type="danger" message={error?.message} /> : null}

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="mb-5">
          <TextField
            id="title"
            register={register}
            label="Title for the event"
            placeholder="Charity for Cats"
            required="Title is required"
            error_message={errors?.title?.message}
          />
        </div>
        <div className="mb-5">
          <TextField
            is_textarea
            id="description"
            register={register}
            label="Event description"
            placeholder="Event for raising money to treat sick cats."
            required="Description is required"
            error_message={errors?.description?.message}
          />
        </div>
        <div className="mb-5">
          <TextField
            id="location"
            register={register}
            label="Location"
            placeholder="Black Swan Pub, Cork"
            required="Location is required"
            error_message={errors?.location?.message}
          />
        </div>
        <div className="mb-5">
          <TextField
            id="price"
            register={register}
            label="Ticket price"
            type="number"
            error_message={errors?.price?.message}
            helper_text="Leave this field empty if it's a free event."
          />
        </div>
        <div className="mb-5">
          <DatePicker
            id="date"
            label="Select Date and Time for event"
            getValues={getValues}
            setValue={setValue}
            trigger={trigger}
            control={control}
            error_message={errors?.date?.message}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? <Spinner /> : <>Submit</>}
        </button>
      </form>
    </div>
  );
}
