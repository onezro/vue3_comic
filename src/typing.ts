// export interface HomeRemond {
//     banners: Array<Banner>,
//     categories: Array<Categories>,
//     daily_topics: DailyTopics,
//     discovery_modules: Array<discoveryModules[]>,
//     popularity_topics: Array<Topic>,
//     rec_topics: Array<Topic>,
//     ugc_topics: Array<Topic>,
//     ranks: Array<{
//         rank_id: number,
//         title:string,
//         next_update_date:string,
//         rank_desc:string,
//         topics:Array<Topic>
//     }>

// }
export interface Banner {
    action_type: number,
    image_url: string,
    target_id: string
}
export interface Categories {
    tagId: number,
    title: string,
    icon: null
}
export interface DailyTopics {
    pos: number,
    topics: Array<Topic>,
    week_days: Array<string>
}
export interface Topic {
    id: number,
    tags: Array<string>,
    title: string,
    description: string,
    cover_image_url: string,
    vertical_image_url: string,
    square_image_url: string,
    likes_count: string,
    signing_status: string,
    update_remind: string,
    user: {
        avatar: string,
        nickname: string,
        user_id: number
    },
    view_count_info: string
}
export interface discoveryModules {
    title: string,
    topics: Array<Topic[]>
}

export interface List {
    rank_id: number,
    title: string
}
export interface Topic_info {
    comic_body_count: number,
    comics_count: number,
    comics: Array<Comics>,
    comments_count: string,
    cover_image_url: string,
    description: string,
    fav_count: string,
    first_comic_id: number,
    id: number,
    is_favourite: boolean,
    is_free: boolean,
    likes_count: string,
    origin_comments_count: number,
    origin_likes_count: number,
    popularity_info: string,
    signing_status: string,
    tags: Array<string>,
    title: string,
    update_status: string,
    user: {
        avatar: string,
        nickname: string,
        user_id: number
    },
    vertical_image_url: string
}
export interface Comics {
    cover_image_url: string,
    created_at: string,
    id: number,
    is_free: boolean
    is_pay_comic: boolean,
    is_vip_exclusive: boolean,
    likes_count: string,
    likes_count_number: number,
    locked: boolean,
    locked_code: number,
    need_vip: boolean,
    title: string
}

export interface Recommend_topics {
    comments_count: string,
    cover_image_url: string,
    description: string,
    id: number,
    likes_count: string,
    origin_comments_count: number,
    origin_likes_count: number,
    title: string,
    vertical_image_url: string
}
export interface Bottom_recommend {
    title: string,
    topic_list: Topic
}
export interface Bookself {
    id: string,
    image: string,
    title: string,
    latest: string,
    lookTitle: string,
    comic_id: number,
    timeId: number
}

export interface Comic_info {
    comic_images: Array<Poto>,
    cover_image_url: string,
    created_at: string,
    id: number,
    is_free: boolean,
    is_pay_comic: boolean,
    is_vip_exclusive: boolean,
    likes_count: string,
    likes_count_number: number,
    locked: boolean,
    locked_code: number,
    need_vip: false,
    title: string
}
export interface ufo {
    id: number,
    likes_count_number: number,
    locked_code: number
}
export interface Poto {
    height: number,
    key: null,
    url: string,
    width: number
}

export interface HistoryType {
    id: number,
    comic_id: number | string,
    timeId: number,
    title: string,
    lookTitle: string,
    cover_image_url: string,
    latest: string,
    author: string,
}

export interface Text_info {
    title: string
}

export interface Hit_info {
    action_type: {
        type: number,
        target_id: number
    },
    category: Array<string>,
    comic_count: number,
    comics_count: number,
    comment_count: number,
    comments_count: number,
    continueReadComic: { id: number, title: string },
    cover_image_url: string,
    created_at: string,
    description: string,
    favourite_count: number,
    first_comic_publish_time: string,
    id: number,
    is_favourite: boolean,
    is_free: boolean,
    is_outer: boolean,
    latest_comic_title: string,
    likes_count: number,
    popularity: number,
    recommend_text: string,
    related_topic_id: number,
    sentence_desc: string,
    strategy_recommendation: string,
    text_mask: string,
    title: string,
    update_status: number,
    user: { id: number, nickname: string }
    user_id: number,
    user_topic_read_chapter: number,
    vertical_image_url: string,
    view_count: number,
}

export interface Search_title{
    text:string,
    id:number
}
export interface Login{
    username:string,
    password:string
}

