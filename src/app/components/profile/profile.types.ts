export type Profile = {
  name: string;
  avatar_url: string;
  email: string;
  bio: string;
  html_url: string;
  public_repos: number;
  location: string;
  followers: number;
  following: number;
  created_at: Date;
};

export type Error = {
  name: string;
  status: number;
  message: string;
} | null;
