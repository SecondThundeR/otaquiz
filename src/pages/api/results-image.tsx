/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { type NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

// const getFont = async (url: URL) => {
//   const res = await fetch(url);
//   return await res.arrayBuffer();
// };

export default function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const profileID = searchParams.get("id");
    const profileName = searchParams.get("name");
    const correctAnswers = searchParams.get("correct");
    const totalAmount = searchParams.get("amount");

    console.log(import.meta.url);

    // const JetbrainsRegular = await getFont(
    //   new URL("../../assets/fonts/JetbrainsMono-Regular.ttf", import.meta.url),
    // );
    // const JetbrainsBold = await getFont(
    //   new URL("../../assets/fonts/JetbrainsMono-Bold.ttf", import.meta.url),
    // );

    // console.log(JetbrainsRegular);
    // console.log(JetbrainsBold);

    if (!profileID || !profileName || !correctAnswers || !totalAmount)
      return new Response(`Failed to generate the image`, {
        status: 400,
      });

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "16px",
            fontFamily: "Jetbrains Mono",
            backgroundColor: "#1a103d",
            color: "#f9f7fd",
            gap: "16px",
          }}
        >
          <h1
            style={{
              fontSize: "132px",
              fontWeight: "bold",
              opacity: 0.2,
              marginTop: 0,
            }}
          >
            Результат игры
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <img
              width="144"
              height="144"
              src={`https://desu.shikimori.me/system/users/x160/${profileID}.png`}
              style={{
                borderRadius: 128,
              }}
              alt=""
            />
            <h1
              style={{
                color: "#e779c1",
                fontWeight: "bold",
                fontSize: "52px",
                marginBottom: 0,
              }}
            >
              {profileName}
            </h1>
            <h1
              style={{
                fontSize: "42px",
              }}
            >
              отгадал(а) правильно {`${correctAnswers} из ${totalAmount}`}{" "}
              вопросов
            </h1>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // fonts: [
        //   {
        //     name: "Jetbrains Mono",
        //     data: JetbrainsRegular,
        //     style: "normal",
        //     weight: 400,
        //   },
        //   {
        //     name: "Jetbrains Mono",
        //     data: JetbrainsBold,
        //     style: "normal",
        //     weight: 700,
        //   },
        // ],
      },
    );
  } catch (error: unknown) {
    console.error(error);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
