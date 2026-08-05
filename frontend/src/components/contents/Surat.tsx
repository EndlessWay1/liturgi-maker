import clsx from "clsx";
import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { formSurat } from "../../constants";
import { useCsrf } from "../../context/CSRFContext";

export function Surat() {
  const isMobile = useMediaQuery({ query: "(max-width: 1048px)" });

  const [isSelected, setSelected] = useState(true);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FieldValues>();

  const [Load, setLoad] = useState(false);
  const { csrf } = useCsrf();

  const onSubmit = async () => {
    setLoad(true);
    const urls = import.meta.env.VITE_BACKEND_URL;
    const path = "/api/songs/";
    try {
      const res = await fetch(urls + path, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrf,
        },
        credentials: "include",
        // body: JSON.stringify(e),
      });
      // Handle HTTP error statuses (like 400 or 500)
      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);

        if (errorBody && typeof errorBody === "object") {
          // Case 1: generic API/framework error (e.g. 404 route not found, 500, etc.)
          if ("statusCode" in errorBody || "error" in errorBody) {
            setError("root", {
              type: "server",
              message:
                errorBody.message ||
                errorBody.description ||
                `Server error (${res.status})`,
            });
          } else {
            // Case 2: field-specific validation errors, e.g. { Ayat: "Invalid Credential" }
            Object.entries(errorBody).forEach(([field, message]) => {
              setError(field, {
                type: "server",
                message: String(message),
              });
            });
          }
        } else {
          setError("root", {
            type: "server",
            message: `Server responded with status ${res.status}`,
          });
        }
        setLoad(false);
        // console.log(await res.json());
        return;
      }
      console.log(await res.json());
      // const blob = await res.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // a.href = url;
      // a.download = `${e.Tanggal}.txt`; // Target filename
      // document.body.appendChild(a);
      // a.click();
      // a.remove();
      // window.URL.revokeObjectURL(url);
      setLoad(false);
    } catch (err) {
      // Catch network failures OR errors thrown in the 'if (!response.ok)' block
      setError("root", {
        type: "network",
        message: err instanceof Error ? err.message : "Network error",
      });
      setLoad(false);
    }
  };
  return (
    <div id='surat'>
      <img src='rays-smoke.png' alt='rays' />

      <h1>Surat Generator</h1>
      <div id='form-canvas'>
        <form action='#' method='post' onSubmit={handleSubmit(onSubmit)}>
          <div id='form-sect'>
            <h2>Surat Heading</h2>
            <div
              className={clsx(
                isMobile ? "flex flex-col" : "grid grid-cols-2",
                "form-content",
              )}
            >
              {formSurat.map(({ id, field, types, placeholder, month }) => (
                <div key={id}>
                  <h3>{field}:</h3>
                  {errors[field] && <p>{String(errors[field]?.message)}</p>}
                  {month ? (
                    <select
                      required
                      {...register(field)}
                      onChange={() => setSelected(false)}
                      className={
                        isSelected
                          ? "text-dark-300/50 dark:text-white-200/50"
                          : "text-colors"
                      }
                    >
                      <option
                        value={"blank"}
                        key={"init"}
                        className='text-black'
                        disabled={!isSelected}
                      >
                        Month
                      </option>
                      {month?.map((mon, idx) => (
                        <option
                          value={mon.toLowerCase()}
                          key={`${idx}-month`}
                          className='text-black'
                        >
                          {mon}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={types}
                      placeholder={placeholder}
                      required
                      min={1}
                      {...register(field)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          {errors.root && (
            <p className='text-center'>{String(errors.root.message)}</p>
          )}
          <div className='flex justify-center m-5'>
            <button
              type='submit'
              disabled={Load}
              className={Load ? "text-gray-600" : ""}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
