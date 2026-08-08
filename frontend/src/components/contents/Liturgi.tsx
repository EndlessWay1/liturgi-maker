import { useMediaQuery } from "react-responsive";
import {
  formAutofill,
  formAyat,
  formHead,
  formLagu,
  PassageList,
  namaBulan,
} from "../../constants";
import clsx from "clsx";
import { useForm, type FieldValues } from "react-hook-form";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCsrf } from "../../context/CSRFContext";

function Liturgi() {
  const isMobile = useMediaQuery({ query: "(max-width: 1048px)" });

  const [autofill, setAutofill] = useState(false);

  const [formHeader, setformHeader] = useState(formHead);
  const [formAyats, setformAyats] = useState(formAyat);
  const [formLagus, setformLagus] = useState(formLagu);

  const [Load, setLoad] = useState(false);


  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FieldValues>();

  const { csrf } = useCsrf();

  const passageMap: { [key: string]: string } = {};
  for (const i of PassageList) {
    const abbrs = i.abbr.toLowerCase();
    passageMap[i.name.toLowerCase()] = abbrs;
  }
  // console.log(passageMap);

  const passageRegex = /^(\d+)?(?:\s+|%20)?([^0-9:]+)*/;
  const tanggalRegex = /^(\d+)-(\d+)-(\d+)$/;

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

  // convert ayat into abbr type if not already
  const nameToAbbr = (ayat: string) => {
    const lowAyat = ayat.toLowerCase();
    const matches = lowAyat.match(passageRegex);
    if (matches) {
      console.log(matches);
      // console.log(
      //   lowAyat.replace(matches[1], passageMap[matches[1]] ?? matches[1]),
      // );

      const ayats =
        (matches[1] ? matches[1] + " " : "") + matches[2].toLowerCase().trim();
      const ress = passageMap[ayats];
      const ayatToBeReplace = matches[1] ? ress.substring(2) : ress;
      return lowAyat.replace(matches[2], ayatToBeReplace);
    }
    return lowAyat;
  };

  // only fetch from backend API,not other API
  const tryFetch = async (link: string, method: string, bodys?: object) => {
    setLoad(true);
    try {
      const res = await fetch(link, {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrf,
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
    const res = await tryFetch(
      import.meta.env.VITE_BACKEND_URL + "/api/docs/liturgi",
      "POST",
      e,
    );

    console.log(res);

    const blob = await res?.blob();
    if (blob) {
      const date = e.Tanggal.match(tanggalRegex);

      const year = date[1];
      const mon = namaBulan[Number(date[2]) - 1];
      const day = Number(date[3]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Liturgi Remaja - ${year} ${mon} ${day}.docs`; // Target filename
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

    console.log(liturgi[mon]);
    console.log(day);

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
      "Ayat Firman": nameToAbbr(litObj["Ayat Firman"] ?? ""),
      "Ayat Kata Pembuka": nameToAbbr(litObj["Ayat KP"] ?? ""),
      "Ayat Berita Anugerah": nameToAbbr(litObj["Ayat BA"] ?? ""),
      "Ayat Persembahan": nameToAbbr(litObj["Ayat Persembahan"] ?? ""),
      "Lagu Votum": litObj.Lagu[1] ?? "",
      "Lagu Kata Pembuka": litObj.Lagu[2] ?? "",
      "Lagu Pengakuan Dosa": litObj.Lagu[3] ?? "",
      "Lagu Berita Anugerah": litObj.Lagu[4] ?? "",
      "Lagu Persembahan": litObj.Lagu[5] ?? "",
      "Lagu Pengutusan": litObj.Lagu[6] ?? "",
    };

    setformHeader(
      formHeader.map((obj) => {
        obj.value = filledValue[obj.field];
        return obj;
      }),
    );
    setformLagus(
      formLagus.map((obj) => {
        obj.value = filledValue[obj.field];
        return obj;
      }),
    );
    setformAyats(
      formAyats.map((obj) => {
        obj.value = filledValue[obj.field];
        return obj;
      }),
    );

    setAutofill(false);
  };

  return (
    <section id='liturgi' className={clsx(autofill ? "h-dvh" : "h-fit")}>
      <h1>Liturgi Generator</h1>
      <div id='form-canvas'>
        <form action='#' method='post' onSubmit={handleSubmit(onSubmit)}>
          <input type='hidden' value={csrf} />
          <div id='form-sect'>
            <h2 hidden={autofill}>Heading Section</h2>
            <div
              className={clsx(
                isMobile ? "flex flex-col" : "grid grid-cols-2",
                "form-content",
              )}
              hidden={autofill}
            >
              {formHeader.map(({ id, field, types, placeholder, value }) => (
                <div key={id}>
                  <h3>{field}:</h3>
                  {errors[field] && <p>{String(errors[field]?.message)}</p>}
                  <input
                    type={types}
                    placeholder={placeholder}
                    value={value}
                    required
                    {...register(field)}
                  />
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
              {formAyats.map(({ id, field, types, placeholder, value }) => (
                <div key={id}>
                  <h3>{field}:</h3>
                  {errors[field] && <p>{String(errors[field]?.message)}</p>}
                  <input
                    type={types}
                    placeholder={placeholder}
                    value={value}
                    required
                    {...register(field)}
                  />
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
              {formLagus.map(({ id, field, types, placeholder, value }) => (
                <div key={id}>
                  <h3>{field}:</h3>
                  {errors[field] && <p>{String(errors[field]?.message)}</p>}
                  <input
                    type={types}
                    placeholder={placeholder}
                    value={value}
                    required
                    {...register(field)}
                  />
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
                {...register("Pelayanan Pujian")}
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
                  {errors[field] && <p>{String(errors[field]?.message)}</p>}
                  <input
                    type={types}
                    placeholder={placeholder}
                    {...register(field)}
                  />
                </div>
              ))}
            </div>
          </div>
          {errors.root && (
            <p className='text-center'>{String(errors.root.message)}</p>
          )}
          {csrf === "" && (
            <p className='text-center'>Please refresh the page.</p>
          )}
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
