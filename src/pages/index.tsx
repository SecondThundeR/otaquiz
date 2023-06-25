import { type ReactElement } from "react";
import Head from "next/head";

import Navbar from "@/components/Navbar";
import Subtitle from "@/components/Subtitle";
import Title from "@/components/Title";
import {
  Footer,
  FooterText,
  FooterLink,
  FooterSeparator,
} from "@/components/Footer";
import useAmount from "@/hooks/useAmount";

import { type NextPageWithLayout } from "./_app";
import PageContainer from "@/components/PageContainer";
import ContentContainer from "@/components/ContentContainer";
import AmountStepper from "@/components/AmountStepper";
import Link from "next/link";
import MainLayout from "@/layouts/main";

const Home: NextPageWithLayout = () => {
  const { amount, increment, decrement } = useAmount({
    min: 5,
    max: 50,
    step: 5,
  });

  return (
    <>
      <ContentContainer>
        <Title>Привет!</Title>
        <Subtitle>Выберите количество аниме для игры:</Subtitle>
        <AmountStepper
          amount={amount}
          increment={increment}
          decrement={decrement}
        />
        <Link role="button" className="btn-primary btn-lg btn" href="/game">
          Начать игру
        </Link>
      </ContentContainer>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>AniGuessr</title>
        <meta name="description" content="Anime Quiz Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout page={page} />
    </>
  );
};

export default Home;
