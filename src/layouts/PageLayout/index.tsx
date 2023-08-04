import { type Session } from "next-auth";
import { type PropsWithChildren, memo } from "react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ContentContainer } from "@/components/ui/ContentContainer";
import { Link } from "@/components/ui/Link";
import { PageContainer } from "@/components/ui/PageContainer";

import { GITHUB_ACCOUNT_LINK, SHIKIMORI_API_DOCS } from "@/constants/links";

type PageLayoutProps = PropsWithChildren<{
  user: Session["user"] | null;
  title?: string;
  onTitle?: () => void;
  hasFooter?: boolean;
}>;

export const PageLayout = memo(function PageLayout({
  children,
  user,
  title,
  onTitle,
  hasFooter = true,
}: PageLayoutProps) {
  return (
    <PageContainer>
      <Navbar user={user} title={title} onTitle={onTitle} />
      <ContentContainer>{children}</ContentContainer>
      {hasFooter && (
        <Footer>
          <Footer.Text>
            Powered by{" "}
            <Link style="primary" href={SHIKIMORI_API_DOCS} target="_blank">
              Shikimori API
            </Link>
          </Footer.Text>
          <Footer.Separator />
          <Footer.Text>
            Made by{" "}
            <Link style="primary" href={GITHUB_ACCOUNT_LINK} target="_blank">
              SecondThundeR
            </Link>
          </Footer.Text>
        </Footer>
      )}
    </PageContainer>
  );
});
