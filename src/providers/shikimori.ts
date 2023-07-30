import { type OAuthConfig, type OAuthUserConfig } from "next-auth/providers";

export interface ShikimoriUserInfo {
  id: number;
  nickname: string;
  avatar: string;
  image: {
    x160: string;
    x148: string;
    x80: string;
    x64: string;
    x48: string;
    x32: string;
    x16: string;
  };
  last_online_at: Date;
  url: string;
  name: string | null;
  sex: string | null;
  website: string;
  full_years: number | null;
  birth_on: Date | null;
  locale: string | null;
}

export interface ShikimoriUser
  extends ShikimoriUserInfo,
    Record<string, unknown> {
  last_online: string;
  location: string | null;
  banned: boolean;
  about: string;
  about_html: string;
  common_info: string[] | null;
  show_comments: boolean;
  in_friends: boolean | null;
  is_ignored: boolean;
  style_id: number;
}

export default function Shikimori<P extends ShikimoriUser>(
  options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: "shikimori",
    name: "Shikimori",
    type: "oauth",
    token: "https://shikimori.me/oauth/token",
    authorization: "https://shikimori.me/oauth/authorize?scope=",
    userinfo: "https://shikimori.me/api/users/whoami",
    profile(profile) {
      return {
        id: String(profile.id),
        email: null,
        name: profile.nickname,
        image: profile.image.x160,
      };
    },
    options,
  };
}
