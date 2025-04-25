import { HTMLInputTypeAttribute } from "react";

export default function TextField(props: {
  id: string;
  label: string;
  register: any;
  placeholder?: string;
  required?: boolean | string;
  error_message?: string;
  is_textarea?: boolean;
  type?: HTMLInputTypeAttribute;
  helper_text?: string;
}) {
  const {
    id,
    label,
    placeholder,
    required,
    error_message,
    register,
    is_textarea,
    type,
    helper_text,
  } = props;

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      {helper_text ? (
        <small className="text-gray-500 block -mt-2 mb-2">{helper_text}</small>
      ) : null}
      {is_textarea ? (
        <textarea
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          {...register(id, { required: required })}
          rows={4}
        />
      ) : (
        <input
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          type={type}
          {...register(id, { required: required })}
        />
      )}
      {error_message ? (
        <small className="text-red-600">{error_message}</small>
      ) : null}
    </div>
  );
}
