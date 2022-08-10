export interface NewsInterface {
    highlights_news?:        HighlightsNews[];
    shirsha_bichar?:         ShirshaBichar;
    featured_post?:          FeaturedPost;
    featured_news?:          FeaturedPost[];
    stock_analysis?:         HighlightsNews[];
    indicator_menu?:         AlphaScreenMenu[];
    trading_signal_menu?:    AlphaScreenMenu[];
    alpha_screen_menu?:      AlphaScreenMenu[];
    mutual_funds?:           MutualFund[];
    weekly_market_analysis?: HighlightsNews[];
    articles?:               FeaturedPost[];
    investing_ideas?:        FeaturedPost[];
}

export interface AlphaScreenMenu {
    name?:        string;
    url?:         string;
    subitem?:     AlphaScreenMenu[];
    title?:       string;
    append_name?: string;
}

export interface FeaturedPost {
    id?:         number;
    slug?:       string;
    title?:      string;
    image?:      string;
    created_at?: Date;
    excerpt?:    null;
}

export interface HighlightsNews {
    id?:         number;
    slug?:       string;
    title?:      string;
    image?:      string;
    created_at?: Date;
}

export interface MutualFund {
    symbol?:            string;
    weekly_nav?:        null | string;
    latest_todayprice?: LatestTodayprice | null;
}

export interface LatestTodayprice {
    symbol?:      string;
    today_price?: string;
}

export interface ShirshaBichar {
    shirsa?: HighlightsNews;
    bichar?: HighlightsNews;
}
