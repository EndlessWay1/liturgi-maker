import Button from "../General/Button";
import HTitle from "../General/HTitle";

export function Home() {
  return <section id='home'>
    <div className="relative bg-granite shrink-0">
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="flex flex-col max-w-[90dvw] sm:max-w-prose gap-1">
            <HTitle className="text-white">Home</HTitle>
            <hr className="h-px mt-3 mb-6 bg-white  border-0" />

            <p className="limit-overflow text-justify font-tangerine font-bold text-xl sm:text-3xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              tempus tristique sollicitudin. Aliquam ut mi quis arcu volutpat
              finibus. Aliquam erat volutpat. Donec in scelerisque diam. Quisque
              vitae quam lacus. Etiam viverra feugiat urna, ac luctus mauris
              fermentum id. Quisque condimentum scelerisque dapibus. In hac
              habitasse platea dictumst. Sed interdum vestibulum neque semper
              congue. Donec ac est gravida, tincidunt dui id, pulvinar justo.
              Nullam vestibulum nisi tristique tincidunt tristique.
            </p>
          </div>
        </div>
        <img
          src="home_page.JPG"
          alt="Home"
          className="h-45 sm:h-70 min-w-full object-cover blur-[2px] inset-shadow-base-500 opacity-75"
        />
      </div>
      <div className="flex flex-col gap-2 py-5 px-5 sm:px-10 bg-frosted-blue/80 ">
        <div className="mx-3 sm:mx-6 my-4 bg-sky-reflection/50 rounded-md px-3 py-3 border border-dark-slate-grey/70">
          <HTitle>History</HTitle>
          <hr className="h-px mt-3 mb-6 bg-black border-0" />

          <p className="text-justify font-felipa text-xl sm:text-2xl">
            This website was made in 2024 by Hansen, and now in 2026 is being
            rebranded with new frontend as a fun project.
          </p>
        </div>
        <div className="mx-3 sm:mx-6 my-4 bg-sky-reflection/50 rounded-md px-3 py-3 border border-dark-slate-grey/70">
          <HTitle>Old Webiste</HTitle>
          <hr className="h-px mt-3 mb-6 bg-black border-0" />

          <div className="m-2 flex flex-col justify-center items-center">
            <img
              src="logo_with_title.png"
              alt="Liturgi Generator"
              className="w-55 sm:w-70 h-auto object-cover"
            />
            <Button
              variant="secondary"
              onClick={() =>
                (window.location.href = 'https://liturgi-generator.vercel.app/')
              }
            >
              Liturgi Generator
            </Button>
          </div>
        </div>
      </div></section>;
}
