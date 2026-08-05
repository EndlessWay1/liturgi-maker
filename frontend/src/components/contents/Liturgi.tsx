import { useMediaQuery } from "react-responsive";
import { formAyat, formHead, formLagu } from "../../constants";
import clsx from "clsx";
import { useForm, type FieldValues } from "react-hook-form";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCsrf } from "../../context/CSRFContext";

function Liturgi() {
  const isMobile = useMediaQuery({ query: "(max-width: 1048px)" });

  const secRef = useRef(null);
  useGSAP(() => {
    gsap.to(".circ", {
      autoAlpha: 0,
      yoyo: true,
      duration: 10,
      repeat: -1,
      stagger: {
        amount: 10,
        from: "center",
        grid: "auto",
        ease: "power2.inOut",
        repeat: -1,
      },
    });
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FieldValues>();

  const [Load, setLoad] = useState(false);

  const { csrf } = useCsrf();

  const onSubmit = async (e: FieldValues) => {
    setLoad(true);
    const urls = "https://liturgi-maker-nbc1.vercel.app";
    const path = "/api/gatcha";
    try {
      const res = await fetch(urls + path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(e),
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
        return;
      }
      console.log(res);

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${e.Tanggal}.txt`; // Target filename
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
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
    <section id='liturgi' ref={secRef}>
      <h1>Liturgi Generator</h1>
      <div id='form-canvas'>
        <form action='#' method='post' onSubmit={handleSubmit(onSubmit)}>
          <input type='hidden' value={csrf} />
          <div id='form-sect'>
            <h2>Heading Section</h2>
            <div
              className={clsx(
                isMobile ? "flex flex-col" : "grid grid-cols-2",
                "form-content",
              )}
            >
              {formHead.map(({ id, field, types, placeholder }) => (
                <div key={id}>
                  <h3>{field}:</h3>
                  {errors[field] && <p>{String(errors[field]?.message)}</p>}
                  <input
                    type={types}
                    placeholder={placeholder}
                    required
                    {...register(field)}
                  />
                </div>
              ))}
            </div>

            <h2>Ayat Section</h2>
            <div
              className={clsx(
                isMobile ? "flex flex-col" : "grid grid-cols-2",
                "form-content",
              )}
            >
              {formAyat.map(({ id, field, types, placeholder }) => (
                <div key={id}>
                  <h3>{field}:</h3>
                  {errors[field] && <p>{String(errors[field]?.message)}</p>}
                  <input
                    type={types}
                    placeholder={placeholder}
                    required
                    {...register(field)}
                  />
                </div>
              ))}
            </div>

            <h2>Lagu Section</h2>
            <div
              className={clsx(
                isMobile ? "flex flex-col" : "grid grid-cols-2",
                "form-content",
              )}
            >
              {formLagu.map(({ id, field, types, placeholder }) => (
                <div key={id}>
                  <h3>{field}:</h3>
                  {errors[field] && <p>{String(errors[field]?.message)}</p>}
                  <input
                    type={types}
                    placeholder={placeholder}
                    required
                    {...register(field)}
                  />
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

      <div id='left-circle1' className='circ'>
        <div className='circ1'>
          <div className='circ2' />
        </div>
      </div>

      <div id='left-circle2' className='circ'>
        <div className='circ1 circ' />
      </div>

      <div id='left-circle3' className='circ'>
        <div className='circ1 circ'>
          <div className='circ2 circ' />
        </div>
      </div>

      <div id='right-circle1' className='circ'>
        <div className='circ1 circ'>
          <div className='circ2 circ' />
        </div>
      </div>

      <div id='right-circle2' className='circ'>
        <div className='circ1 circ' />
      </div>

      <div id='right-circle3' className='circ'>
        <div className='circ1 circ'>
          <div className='circ2 circ' />
        </div>
      </div>
    </section>
  );
}
export default Liturgi;
