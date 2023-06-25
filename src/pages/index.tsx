import { type Session } from "next-auth";
import Link from "next/link";
import Head from "next/head";

import AmountStepper from "@/components/AmountStepper";
import ContentContainer from "@/components/ContentContainer";
import {
  Footer,
  FooterLink,
  FooterSeparator,
  FooterText,
} from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageContainer from "@/components/PageContainer";
import Subtitle from "@/components/Subtitle";
import Title from "@/components/Title";
import useAmount from "@/hooks/useAmount";
import { getServerAuthSession } from "@/server/auth";
import { type GetServerSidePropsContext } from "next";

export default function Home({
  user,
}: {
  user: Pick<Session, "user">["user"] | null;
}) {
  const { amount, increment, decrement } = useAmount({
    min: 5,
    max: 50,
    step: 5,
  });

  return (
    <>
      <Head>
        <title>AniGuessr</title>
        <meta name="description" content="Anime Quiz Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <Navbar user={user} />
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
        <Footer>
          <FooterText>
            Powered by{" "}
            <FooterLink link="https://shikimori.me/api/doc/">
              Shikimori API
            </FooterLink>
          </FooterText>
          <FooterSeparator />
          <FooterText>
            Made by{" "}
            <FooterLink link="https://github.com/SecondThundeR/">
              SecondThundeR
            </FooterLink>
          </FooterText>
        </Footer>
      </PageContainer>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      props: {
        user: null,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}
