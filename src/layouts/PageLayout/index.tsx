import { forwardRef, type PropsWithChildren } from "react";

import { Footer } from "@/components/Footer";
import { Navbar, type NavbarProps } from "@/components/Navbar";

import { GITHUB_ACCOUNT_LINK, SHIKIMORI_API_DOCS } from "@/constants/links";

import { ContentContainer } from "@/ui/ContentContainer";
import { Link } from "@/ui/Link";
import { PageContainer } from "@/ui/PageContainer";

type PageLayoutProps = NavbarProps &
  PropsWithChildren<{
    hasFooter?: boolean;
  }>;

export const PageLayout = forwardRef<HTMLDivElement, PageLayoutProps>(function PageLayout(
  { children, hasFooter = true, ...navbarProps },
  ref,
) {
  return (
    <PageContainer ref={ref}>
      <Navbar {...navbarProps} />
      <ContentContainer>{children}</ContentContainer>
      {hasFooter && (
        <Footer>
          <Footer.Text>
            Создано на основе{" "}
            <Link style="primary" href={SHIKIMORI_API_DOCS} target="_blank">
              Shikimori API
            </Link>
          </Footer.Text>
          <Footer.Separator />
          <Footer.Text>
            Создал{" "}
            <Link style="primary" href={GITHUB_ACCOUNT_LINK} target="_blank">
              SecondThundeR
            </Link>
          </Footer.Text>
        </Footer>
      )}
    </PageContainer>
  );
});
