"use client";
import Head from "next/head";
import SocialMediaButton, {
  socialMediaButtonsData,
} from "../components/SocialMediaButton";
import { Fragment } from "react";
import { AvatarCard } from "../components/AvatarCard";

export default function Home() {
  return (
      <Fragment>
        <Head>
          <title>Christian Krogh Nielsen</title>
        </Head>
        <Fragment>
          <div className="flex flex-col justify-center items-start max-w-2xl mx-auto">
            <AvatarCard />
            <div
              className="mx-auto md:flex-row flex flex-wrap text-center justify-center gap-4 md:gap-x-16 pb-4"
            >
              {socialMediaButtonsData.map((x) => (
                <SocialMediaButton key={x.colour} colour={x.colour} link={x.link} />
              ))} 
            </div>
          </div>
        </Fragment>
      </Fragment>
  );
};
