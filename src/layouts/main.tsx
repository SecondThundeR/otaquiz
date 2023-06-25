import { type ReactElement } from "react";
import {
  Footer,
  FooterLink,
  FooterSeparator,
  FooterText,
} from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageContainer from "@/components/PageContainer";
import { useSession } from "next-auth/react";

export default function MainLayout({ page }: { page: ReactElement }) {
  const { data: sessionData } = useSession();

  return (
    <PageContainer>
      <Navbar user={sessionData?.user} />
      {page}
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
  );
}
