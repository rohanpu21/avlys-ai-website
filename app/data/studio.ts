export type StudioReel = {
  // Instagram's public reel shortcode, not a full URL.
  id: string;
  title: string;
  description: string;
  cover: string;
};

// User-selected order; covers are from the public Instagram embeds.
// Keep labels neutral until captions are verified.
export const studioReels: StudioReel[] = [
  "DXtY5KHIH-x", "DbqglsHoDCn", "DbvcOzxvw2q", "Db1bt9ayoZB",
  "Db5GgxAvHPl", "Db8CVcvzIEb", "Db-bheeosCB",
].map((id, index) => ({
  id,
  title: `Studio reel ${String(index + 1).padStart(2, "0")}`,
  description: "From our Instagram.",
  cover: `/studio/reels/${id}.jpg`,
}));
