export type Shows = {
  id: number;
  url: string;
  title: string;
  imageUrl: string;
  description?: string;
};

export type Episode = {
  id: number;
  url: string;
  title: string;
  imageUrl: string;
  description?: string;
};

export interface IShow {
  showName: string;
  getAllShows: () => Promise<Shows[]>;
  getAllEpisodes: (url: string) => Promise<Episode[]>;
  getEpisodeUrl: (url: string) => Promise<string>;
}

export interface NovaPlayAPI {
  pageProps: {
    screen: {
      id: number;
      title: string;
      slug: string;
      layouts: {
        type: string;
        title: string;
        topics: {
          id: string;
          total_items: number;
          ttl: number;
          links: {
            self: { href: string };
            preview: { href: string; templated: boolean };
            screen: { href: string };
          };
        }[];
        total_layouts: number;
        filters: {
          filter_id: number;
          name: string;
          slug: string;
          selected?: boolean;
        }[];
        links: {
          self: { href: string };
        };
      }[];
      total_layouts: number;
      filters: {
        filter_id: number;
        name: string;
        slug: string;
        selected?: boolean;
      }[];
      links: {
        self: { href: string };
      };
    };
    // error: any;
    notFound: boolean;
    // activeFilters: any;
    // playbacks: any[];
    programsToDisplay: {
      char: string;
      shows: {
        id: number;
        type: string;
        title: string;
        slug: string;
        description?: string;
        published_at: string;
        brands: {
          id: number;
          title: string;
          links: { self: { href: string } };
        }[];
        genres: {
          id: number;
          name: string;
          links: { self: { href: string } };
        }[];
        labels: { title: string }[];
        tags: string[];
        content_details: {
          type: string;
          has_seasons: boolean;
        };
        links: {
          self: { href: string };
          image: { href: string; templated: boolean };
          videos: { href: string };
          screen: { href: string };
          related_videos: { href: string };
        };
      }[];
    }[];
    deviceType: string;
    // profileInit: any;
    _sentryTraceData: string;
    _sentryBaggage: string;
    __N_SSP: boolean;
  };
}

export type NovaEpisodesAPI = {
  id: number;
  type: string;
  title: string;
  slug: string;
  description: string;
  published_at: string;
  available_from: string;
  available_to?: string;
  brands: { id: number; title: string }[];
  genres: { id: number; name: string }[];
  labels: { title: string }[];
  tags: string[];
  links: {
    self: { href: string };
    image: { href: string; templated: boolean };
    streams: { href: string };
    related_videos: { href: string };
  };
  duration: string;
  view_count: number;
  tv_show_id: number;
  tv_show_name: string;
  season_id?: number;
  season_name?: string;
  season_number?: number;
  episode_number?: number;
  billing: { is_chargeable: boolean; is_purchased: boolean };
}[];

export interface NovaTokenAPI {
  accessToken: string;
  validTo: number;
  clientId: string;
}
