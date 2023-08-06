import {
  type ForwardedRef,
  type PropsWithChildren,
  forwardRef,
  memo,
} from "react";

import { Footer } from "@/components/Footer";
import { Navbar, type NavbarProps } from "@/components/Navbar";
import { ContentContainer } from "@/components/ui/ContentContainer";
import { Link } from "@/components/ui/Link";
import { PageContainer } from "@/components/ui/PageContainer";

import { GITHUB_ACCOUNT_LINK, SHIKIMORI_API_DOCS } from "@/constants/links";

type PageLayoutProps = NavbarProps &
  PropsWithChildren<{
    hasFooter?: boolean;
  }>;

export const PageLayout = memo(
  forwardRef(function PageLayout(
    {
      children,
      user,
      title,
      isHome,
      onClick,
      hasFooter = true,
    }: PageLayoutProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) {
    return (
      <PageContainer ref={ref}>
        <Navbar user={user} isHome={isHome} title={title} onClick={onClick} />
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
  }),
);
