import type { Tagged } from 'type-fest'

type UserId = Tagged<number, 'UserId'> // 用户id，是个数字。比如: 1247347556
type CommentId = Tagged<number, 'CommentId'> // 评论id，是个数字。比如: 348647527
type RetweetStatusId = Tagged<number, 'RetweetStatusId'> // 转发id，是个数字。比如: 317018614
type StatusId = Tagged<number, 'StatusId'> // 动态id，是个数字。比如: 317025145
type Url = Tagged<string, 'Url'>
type Timestamp = Tagged<number, 'Timestamp'> // 单位为ms，比如: 1274765666299
type QueryId = Tagged<number, 'QueryId'> // 比如: 1869203725102043100. 已经超出安全整数范围

type VerifiedInfo = {
  data: {
    desc: '雪球十年知己'
    icon: Url
    link: Url
  }
  verified_desc: '雪球十年知己'
  verified_type: '10'
}

type VerifiedFields = {
  verified: boolean // 认证用户
  verified_description: string
  verified_infos: VerifiedInfo[]
}

type MetaKeywords = {
  post_symbol: 'AAPL'
  post_position: 'stock_post'
  ip_location: '美国'
  stockCorrelation: 'AAPL'
  stockList: 'AAPL_0'
}
type MetaKeywordsJsonString = Tagged<string, 'MetaKeywordsJsonString'>

export type SearchUserRes = {
  count: number
  list: ({
    allow_all_stock: boolean
    block_status: 0 | 1
    blocking: boolean
    city: '其他' | string
    common_count: number
    description: string // 个人简介
    domain: Url // 个性网址，比如：https://xueqiu.com/slowisquick
    donate_count: number
    follow_me: boolean
    followers_count: number // 粉丝数
    following: boolean
    fortuneUser: boolean
    friends_count: number // 关注数
    gender: 'm' | 'f'
    id: UserId // 用户id，是个数字
    last_comment_id: CommentId
    last_status_id: StatusId
    photo_domain: Url // 相册域名，http://xavatar.imedao.com/
    profile: string // 个性网址，类似自定义id
    profile_image_url: string // 各种分辨率的图片，搭配相册域名使用。比如：community/20131/1361472037836-1361472054102.png,community/20131/1361472037836-1361472054102.png!180x180.png,community/20131/1361472037836-1361472054102.png!50x50.png,community/20131/1361472037836-1361472054102.png!30x30.png
    province: '其他' | string
    screen_name: string // 昵称
    st_color: '0'
    status: 0
    status_count: number
    step: 'three'
    subscribeable: boolean
    type: '1' | '3' // 3可能是置顶
    url: ''
    user: {
      allow_all_stock: boolean
      anonymous: boolean
      areaCode: '1' | '86' // 国家区码
      blocking: boolean
      city: '其他' | string
      created_at: Timestamp // 注册时间
      description: string // 个人简介
      domain: string // 个性网址，比如：https://xueqiu.com/slowisquick
      donate_count: number
      donate_snowcoin: number
      follow_me: boolean
      followers_count: number // 粉丝数
      following: boolean
      fortuneUser: boolean
      friends_count: number // 关注数
      gender: 'm' | 'f'
      id: number // 用户id，是个数字
      last_comment_id: number
      last_status_id: number
      photo_domain: string
      profile: string // 个性网址，类似自定义id
      profile_image_url: string
      province: '其他' | string
      screen_name: string // 昵称
      st_color: '0'
      status: 0
      status_count: number
      step: 'three'
      truncated: boolean
      type: '1'
      url: ''
      verified: boolean // 认证用户
      verified_description: string
      verified_infos: VerifiedInfo[]
    }
  } & VerifiedFields)[]
  maxPage: number
  page: number
  query_id: QueryId
  recommend_cards: unknown[]
  size: number
}

type TimelineAuthor = unknown

type RetweetedStatus = unknown

export type UserTimelineStatus = {
  id: StatusId
  user_id: UserId
  source: 'iPad'
  title: string
  created_at: Timestamp
  retweet_count: number // 转发数
  fav_count: number // 点赞数
  truncated: boolean
  commentId: CommentId
  retweet_status_id: RetweetStatusId
  symbol_id: null
  description: string
  type: null
  source_link: Url
  edited_at: null
  user: TimelineAuthor
  retweeted_status: RetweetedStatus
  answers: null
  rqtype: null
  rqid: 0
  target: string // 比如: /1247347556/317025145
  fragment: null
  blocked: boolean
  blocking: boolean
  text: string // 动态内容
  stockCorrelation: string[] // 提及的股票代码，比如: ['AAPL']
  meta_keywords: MetaKeywordsJsonString // 元关键字
}

export type UserTimelineRes = {
  count: number // 最大20条
  statuses: UserTimelineStatus[]
  banner: null
  total: number
  page: number
  maxPage: number
}
