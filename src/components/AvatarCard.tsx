import Image from "next/image";

export default function AvatarCard() {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-start overflow-hidden">
      <div className="flex flex-col pr-8">
        <h1
          className="font-bold text-3xl md:text-5xl tracking-tight mb-3 text-black dark:text-gray-50"
        >
          Christian Krogh Nielsen
        </h1>
        <h2
          className="text-gray-700 dark:text-gray-200 mb-4"
        >
          Student Software Engineer at{" "}
          <span
            className="font-semibold"
          >
            Copenhagen{" "}
            <span className="text-work">Optimization</span>
          </span>
          <br />
          Creator and maintainer of the{" "}
          <span className="text-Discord">Discord</span> bot{" "}
          <a
            className="dark:text-yellow-300 text-yellow-600 hover:underline underline-offset-2"
            href="https://bentobot.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bento
          </a>
        </h2>
        <p
          
          
          className="text-gray-600 dark:text-gray-400 mb-10 w-fit"
        >
          Software interested lad from Copenhagen,{" "}
          <span className="text-red-500">Denmark</span>.
          <br />
          Currently studying a Master{"'"}s Degree in Business Administration
          and Information Systems at{" "}
          <a
            className="text-cbs hover:underline underline-offset-2"
            href="https://www.cbs.dk/en/study/graduate/msc-in-business-administration-and-information-systems"
            target="_blank"
            rel="noopener noreferrer"
          >
            Copenhagen Business School
          </a>
          .
          <br />
          Got a Bachelor{"'"}s Degree in Business Administration and Information
          Systems from{" "}
          <a
            className="text-cbs hover:underline underline-offset-2"
            href="https://www.cbs.dk/uddannelse/bachelor/hait-erhvervsoekonomi-informationsteknologi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Copenhagen Business School
          </a>{" "}
          as well.
          <br />
          Experienced with <span className="text-TypeScript">
            TypeScript
          </span>, <span className="text-csharp">C#</span>,{" "}
          <span className="text-React">React</span> and a little bit of{" "}
          <span className="text-React">React Native</span> as well. Currently
          becoming acquainted with <span className="text-Python">Python</span>{" "}
          and Machine Learning.
          <br />I like music of all kinds, cooking, good coffee,
          beer, design in all forms and mediums, going to festivals, and playing
          video games once in a while {":-))"}.
        </p>
      </div>
      <div
        className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto"
      >
        <Image
          alt="Christian Nielsen"
          height={176}
          width={176}
          src="/avatar.jpg"
          sizes="30vw"
          className="rounded-full filter grayscale"
        />
      </div>
    </div>
  );
}
