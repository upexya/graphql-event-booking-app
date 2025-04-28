import { Controller } from "react-hook-form";
import { useState, ChangeEventHandler } from "react";
import { DayPicker } from "react-day-picker";

import getReadableDateTime from "@utils/getReadableDateTime";

import "react-day-picker/style.css";

export default function DatePicker(props: {
  id: string;
  label: string;
  required?: string | boolean;
  error_message?: string;
  getValues: any;
  setValue: any;
  trigger: any;
  control: any;
}) {
  const {
    id,
    label,
    required,
    error_message,
    getValues,
    setValue,
    trigger,
    control,
  } = props;

  const [time_value, setTimeValue] = useState<string | undefined>(undefined);

  const [open_date_modal, setOpenDateModal] = useState(false);
  const [has_date_error, setHasDateError] = useState(false);

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTimeValue(e.target.value);
  };

  const handleDateModalClose = (e: any) => {
    e.preventDefault();
    const selected_date = new Date(getValues(id));
    if (!time_value || !selected_date) {
      setHasDateError(true);
      return;
    }

    const [hours, minutes] = time_value
      .split(":")
      .map((str) => parseInt(str, 10));
    let date_with_time = new Date(selected_date);
    date_with_time.setHours(hours);
    date_with_time.setMinutes(minutes);
    setValue(id, date_with_time);
    trigger(id);
    setOpenDateModal(false);
    return;
  };

  return (
    <div>
      <Controller
        control={control}
        name={id}
        rules={{
          validate: {
            required: (value) => {
              if (required || !value)
                return typeof required === "string"
                  ? required
                  : "Please select valid date and time.";
            },
          },
        }}
        render={({ field }) => (
          <div className="relative">
            <div className="flex items-baseline">
              <label
                htmlFor={id}
                onClick={() => setOpenDateModal(true)}
                className="p-2 border border-gray-300 cursor-pointer rounded-lg block mt-2 text-block font-medium text-gray-700 size-fit"
              >
                {label}
              </label>
              {getValues(id) ? (
                <p className="text-md font-medium text-gray-700 ml-3">
                  {getReadableDateTime(new Date(getValues(id)))}
                </p>
              ) : (
                <></>
              )}
            </div>
            {open_date_modal ? (
              <div
                className="bg-white absolute p-3 shadow-xl rounded-lg z-10"
                style={{
                  top: "-340px",
                  right: 0,
                }}
              >
                <DayPicker
                  animate
                  mode="single"
                  selected={field.value}
                  onSelect={(date: any) => field.onChange(date)}
                />
                <div className="my-4">
                  <span className="text-block font-medium text-gray-700">
                    Time:{" "}
                  </span>
                  <input
                    type="time"
                    value={time_value}
                    onChange={handleTimeChange}
                  />
                </div>
                {has_date_error ? (
                  <small className="text-red-600 -mt-2 block">
                    Please select both date and time.
                  </small>
                ) : null}
                <button
                  className="flex items-end mt-3 p-2 border border-gray-300 cursor-pointer rounded-md"
                  onClick={handleDateModalClose}
                >
                  Done
                </button>
              </div>
            ) : null}
          </div>
        )}
      />
      {error_message ? (
        <small className="text-red-600">{error_message}</small>
      ) : null}
    </div>
  );
}
