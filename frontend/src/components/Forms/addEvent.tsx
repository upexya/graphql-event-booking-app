import { useForm, SubmitHandler } from "react-hook-form";

import TextField from "@components/Common/FormElements/textfield";

interface EventInput {
  title: string;
  description: string;
  location: string;
  date: string;
  price?: number;
}

export default function AddEventForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EventInput>({ mode: "all" });

  const onSubmit: SubmitHandler<EventInput> = (data) => {
    console.log(data);
    if (!isValid) return;
  };

  return (
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

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}
