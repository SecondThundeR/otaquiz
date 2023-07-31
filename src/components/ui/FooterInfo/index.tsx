import {
  Footer,
  FooterLink,
  FooterSeparator,
  FooterText,
} from "@/components/Footer";

export function FooterInfo() {
  return (
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
  );
}
