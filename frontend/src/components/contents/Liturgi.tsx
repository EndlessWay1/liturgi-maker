import { useMediaQuery } from "react-responsive";
import {
  formAutofill,
  formAyat,
  formHead,
  formLagu,
  namaBulan,
} from "../../constants";
import clsx from "clsx";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import { useCsrf } from "../../context/CSRFContext";

function Liturgi() {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const [autofill, setAutofill] = useState(false);

  const [Load, setLoad] = useState(false);

  const [errorStatus, setErrorStatus] = useState<Record<string, boolean>>({});
  // set this to true/false when the verse fetch resolves/fails, e.g. in onAutoFillSubmit or an onBlur handler

  const tanggalRegex = /^(\d+)-(\d+)-(\d+)$/;

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<FieldValues>();

  // const { csrf } = useCsrf();

  // for clean resizing window feat
  useEffect(() => {
    if (!autofill) {
      return;
    }
    const url = "#liturgi";
    const a = document.createElement("a");
    a.href = url;
    a.click();
    a.remove();
  }, [autofill]);

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

  // only fetch from backend API,not other API
  const tryFetch = async (
    link: string,
    method: string,
    bodys?: object,
    type?: string,
  ) => {
    setLoad(true);
    try {
      const res = await fetch(link, {
        method,
        headers: {
          "Content-Type": `application/${type ?? "json"}`,
          // "X-CSRF-Token": csrf,
        },
        credentials: "include",
        body: JSON.stringify(bodys ?? null),
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
            setErrorStatus({});
            Object.entries(errorBody).forEach(([field, message]) => {
              setError(field, {
                type: "server",
                message: String(message),
              });

              setErrorStatus({ ...errorStatus, [field]: true });
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
      setLoad(false);
      return res;
    } catch (err) {
      // Catch network failures OR errors thrown in the 'if (!response.ok)' block
      console.log(err);
      setError("root", {
        type: "network",
        message: err instanceof Error ? err.message : "Network error",
      });
      setLoad(false);
    }
  };

  // func for submit
  const onSubmit = async (e: FieldValues) => {
    // console.log(errorStatus);
    const load = {
      Tema: e.Tema,
      Tanggal: e.Tanggal,
      Pendeta: e.Pendeta,
      Penatua: e.Penatua,
      Verse_Firman: e.Verse_Firman,
      Verse_Kata_Pembuka: e.Verse_Kata_Pembuka,
      Verse_Berita_Anugerah: e.Verse_Berita_Anugerah,
      Verse_Persembahan: e.Verse_Persembahan,
      Verse_Kata_Pembuka_Text: errorStatus.Verse_Kata_Pembuka
        ? e.Verse_Kata_Pembuka_Text
        : "",
      Verse_Berita_Anugerah_Text: errorStatus.Verse_Berita_Anugerah
        ? e.Verse_Berita_Anugerah_Text
        : "",
      Verse_Persembahan_Text: errorStatus.Verse_Persembahan
        ? e.Verse_Persembahan_Text
        : "",
      Song1: e.Song1,
      Song1_Lyrics: errorStatus.Song1 ? e.Song1_Lyrics : "",
      Song2: e.Song2,
      Song2_Lyrics: errorStatus.Song2 ? e.Song2_Lyrics : "",
      Song3: e.Song3,
      Song3_Lyrics: errorStatus.Song3 ? e.Song3_Lyrics : "",
      Song4: e.Song4,
      Song4_Lyrics: errorStatus.Song4 ? e.Song4_Lyrics : "",
      Song5: e.Song5,
      Song5_Lyrics: errorStatus.Song5 ? e.Song5_Lyrics : "",
      Song6: e.Song6,
      Song6_Lyrics: errorStatus.Song6 ? e.Song6_Lyrics : "",
      Pelayanan_Pujian: e.Pelayanan_Pujian,
    };
    const res = await tryFetch(
      import.meta.env.VITE_BACKEND_URL + "/api/docs/liturgi",
      "POST",
      load,
      "json",
    );

    setLoad(false);
    // console.log(res);
    // return;

    const blob = await res?.blob();
    if (blob) {
      const date = e.Tanggal.match(tanggalRegex);

      const year = date[1];
      const mon = namaBulan[Number(date[2]) - 1];
      const day = Number(date[3]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Liturgi Remaja - ${day} ${mon} ${year}.docx`; // Target filename
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } else {
      setError("root", {
        type: "failed docs",
        message: "Failed to download docs",
      });
    }
    setLoad(false);
  };

  // autoFill func for onClick
  const onAutoFillSubmit = async () => {
    // regex

    const target = ["Tanggal", "Link Liturgi", "Link Jadwal Pendeta"];

    // clear all errors
    clearErrors([...target, "root"]);

    // check if all params are filled, else error

    let thereIsError = false;
    target.map((str) => {
      if (!getValues(str)) {
        setError(str, { type: "user", message: `${str} is blank` });
        thereIsError = true;
      }
    });

    if (thereIsError) return;

    const tanggal = getValues("Tanggal");
    const Liturgi = getValues("Link Liturgi");
    const Pendeta = getValues("Link Jadwal Pendeta");

    const tglGroup = tanggal.match(tanggalRegex);
    if (!tglGroup) {
      setError("Tanggal", { type: "user", message: `Tanggal is Invalid` });
    }

    const mon = Number(tglGroup[2]);
    const day = Number(tglGroup[3]);

    // fetching liturgi
    const fLiturgi = await tryFetch(
      import.meta.env.VITE_BACKEND_URL + "/api/liturgi",
      "POST",
      {
        link: Liturgi,
      },
    );

    const fJadwal = await tryFetch(
      import.meta.env.VITE_BACKEND_URL + "/api/jadwal",
      "POST",
      {
        link: Pendeta,
      },
    );
    if (!fJadwal || !fLiturgi) return;
    const liturgi = await fLiturgi.json();
    const jadwal = await fJadwal.json();

    // console.log(liturgi[mon]);
    // console.log(day);

    if (!Object.prototype.hasOwnProperty.call(liturgi, mon)) {
      setError("Tanggal", { type: "user", message: "Month isn't in liturgi" });
      return;
    }

    if (!Object.prototype.hasOwnProperty.call(jadwal, mon)) {
      setError("Tanggal", { type: "user", message: "Month isn't in jadwal" });
      return;
    }

    const monLit = liturgi[mon];
    const monJad = jadwal[mon];

    if (!Object.prototype.hasOwnProperty.call(monLit, day)) {
      setError("Tanggal", { type: "user", message: "Day isn't in liturgi" });
      return;
    }

    if (!Object.prototype.hasOwnProperty.call(monJad, day)) {
      setError("Tanggal", { type: "user", message: "Day isn't in jadwal" });
      return;
    }

    const litObj = monLit[day];
    const jadObj = monJad[day];

    const filledValue: { [key: string]: string } = {
      Tema: litObj.Tema ?? "",
      Pendeta: jadObj ?? "",
      Verse_Firman: litObj["Ayat Firman"] ?? "",
      Verse_Kata_Pembuka: litObj["Ayat KP"] ?? "",
      Verse_Berita_Anugerah: litObj["Ayat BA"] ?? "",
      Verse_Persembahan: litObj["Ayat Persembahan"] ?? "",
      Song1: litObj.Lagu[1] ?? "",
      Song2: litObj.Lagu[2] ?? "",
      Song3: litObj.Lagu[3] ?? "",
      Song4: litObj.Lagu[4] ?? "",
      Song5: litObj.Lagu[5] ?? "",
      Song6: litObj.Lagu[6] ?? "",
    };

    Object.entries(filledValue).forEach(([field, value]) => {
      setValue(field, value, { shouldValidate: true, shouldDirty: true });
    });

    setAutofill(false);
  };

  return (
    <section id='liturgi' className={clsx(autofill ? "h-dvh" : "h-fit")}>
      <h1>Liturgi Generator</h1>
      <div id='form-canvas'>
        <form action='#' method='post' onSubmit={handleSubmit(onSubmit)}>
          {/* <input type='hidden' value={csrf} /> */}
          <div id='form-sect'>
            <h2 hidden={autofill}>Heading Section</h2>
            <div
              className={clsx(
                isMobile ? "flex flex-col" : "grid grid-cols-2",
                "form-content",
              )}
              hidden={autofill}
            >
              {formHead.map(({ id, field, types, placeholder }) => (
                <div key={id}>
                  <h3>{field}:</h3>
                  <Controller
                    name={field}
                    control={control}
                    render={({ field: rhfField }) => (
                      <input
                        type={types}
                        placeholder={placeholder}
                        required
                        {...rhfField}
                      />
                    )}
                  />
                  {errors[field] && <p>{String(errors[field]?.message)}</p>}
                </div>
              ))}
            </div>

            <h2 hidden={autofill}>Ayat Section</h2>
            <div
              className={clsx(
                isMobile ? "flex flex-col" : "grid grid-cols-2",
                "form-content",
              )}
              hidden={autofill}
            >
              {formAyat.map(({ id, field, types, placeholder }, idx) => (
                <div key={id}>
                  <h3>{field}:</h3>
                  <Controller
                    name={"Verse_" + field.substring(5).replaceAll(" ", "_")}
                    control={control}
                    render={({ field: rhfField }) => (
                      <input
                        type={types}
                        placeholder={placeholder}
                        required
                        {...rhfField}
                      />
                    )}
                  />
                  {errors[
                    "Verse_" + field.substring(5).replaceAll(" ", "_")
                  ] && (
                    <p>
                      {String(
                        errors[
                          "Verse_" + field.substring(5).replaceAll(" ", "_")
                        ]?.message,
                      )}
                    </p>
                  )}
                  {(errors[
                    "Verse_" + field.substring(5).replaceAll(" ", "_")
                  ] ||
                    getValues(
                      "Verse_" +
                        field.substring(5).replaceAll(" ", "_") +
                        "_Text",
                    ) !== "") &&
                    idx > 0 && (
                      <textarea
                        placeholder='Tulis ayat disini'
                        {...register(
                          "Verse_" +
                            field.substring(5).replaceAll(" ", "_") +
                            "_Text",
                        )}
                        rows={4}
                      />
                    )}
                </div>
              ))}
            </div>

            <h2 hidden={autofill}>Lagu Section</h2>
            <div
              className={clsx(
                isMobile ? "flex flex-col" : "grid grid-cols-2",
                "form-content",
              )}
              hidden={autofill}
            >
              {formLagu.map(({ id, field, types, placeholder }) => (
                <div key={id}>
                  <h3>{field}:</h3>
                  <Controller
                    name={`Song${id}`}
                    control={control}
                    render={({ field: rhfField }) => (
                      <input
                        type={types}
                        placeholder={placeholder}
                        required
                        {...rhfField}
                      />
                    )}
                  />
                  {errors[`Song${id}`] && (
                    <p>{String(errors[`Song${id}`]?.message)}</p>
                  )}
                  {(errors[`Song${id}`] || getValues(`Song${id}_Lyrics`)) !==
                    "" && (
                    <textarea
                      placeholder='Tulis lagu disini'
                      {...register(`Song${id}_Lyrics`)}
                      rows={4}
                    />
                  )}
                </div>
              ))}
            </div>

            <div
              className='flex items-center mb-4 gap-4 mx-auto mt-5'
              hidden={autofill}
              id='checkbox'
            >
              <input
                id='default-checkbox'
                type='checkbox'
                value=''
                {...register("Pelayanan_Pujian")}
              />
              <label htmlFor='default-checkbox'>Pelayanan Pujian</label>
            </div>

            <h2 hidden={!autofill}>Autofill</h2>
            <div
              className={clsx(
                isMobile ? "flex flex-col" : "grid grid-cols-2",
                "form-content",
              )}
              hidden={!autofill}
            >
              {formAutofill.map(({ id, field, types, placeholder }) => (
                <div key={id}>
                  <h3>{field}:</h3>
                  <input
                    type={types}
                    placeholder={placeholder}
                    {...register(field)}
                  />
                  {errors[field] && <p>{String(errors[field]?.message)}</p>}
                </div>
              ))}
            </div>
          </div>
          {errors.root && (
            <p className='text-center'>{String(errors.root.message)}</p>
          )}
          {/* {csrf === "" && (
            <p className='text-center'>Please refresh the page.</p>
          )} */}
          <div className='flex not-sm:grid justify-center m-5 gap-10 not-sm:gap-5'>
            <button
              type='button'
              disabled={Load}
              className={Load ? "text-gray-600" : ""}
              onClick={() => setAutofill(!autofill)}
            >
              {autofill ? "Back" : "Autofill"}
            </button>
            <button
              type='submit'
              disabled={Load}
              className={Load ? "text-gray-600" : ""}
              hidden={autofill}
            >
              Submit
            </button>
            <button
              type='button'
              disabled={Load}
              className={Load ? "text-gray-600" : ""}
              onClick={() => onAutoFillSubmit()}
              hidden={!autofill}
            >
              Autofill
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
