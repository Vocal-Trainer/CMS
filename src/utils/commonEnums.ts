export enum RoleTypes {
  moderator,
  admin,
  analytic,
  notificationHandler,
}

export enum Languages {
  english,
  swedish,
}
export enum ContentListType {
  POPULAR,
  CONTENTCOLLECTION,
  RECOMMENDEDCONTENT,
}
export enum CommonContentType {
  ARTICLE = "article",
  BLOG = "blogPost",
  PODCAST = "podcastEpisode",
  FAQ = "faq",
  OFFER = "offer",
  DIETARYADVICE = "dietaryAdvice",
  CONTENTCOLLECTION = "contentCollection",
}

export enum AppNavigationType {
  ARTICLE = "article",
  BLOG = "blogPost",
  PODCAST = "podcastEpisode",
  FAQ = "faq",
  OFFER = "offer",
  EXTERNAL = "external",
  SIGNUP = "signup",
  INVITE = "invite",
  DEEP_LINK = "deepLink",
}

export enum NotificationTopics {
  Pregnancy = "pregnancy",
  Children = "children",
  Partner = "partner",
  Reminder = "reminder",
  Update = "update",
  Offer = "offer",
}

export enum UserSegmantType {
  childrenInMonthsBetween = 1, //   All users with children in month 1-12
  childrenInOddMonths = 2, // All users with children in odd/even month
  childrenInEvenMonths = 3, // All users with pregnancies in week 35 and up.
  pregnanciesInOrAboveWeekNumber = 4, // All users with pregnancies in week 35 and up.
  usersWithPartners = 5, // All users who has a partner
  usersWithSelectedTown = 6, // All users who has set their home town to Stockholm
  usersWithCategorySpecified = 7, // All users who has specified Training as one of their interests
}

export enum PopularType {
  MONTH = "month",
  WEEK = "week",
}

export enum CheckListType {
  pregnancy = "pregnancy",
  children = "children",
  general = "general", // general type is not activated yet
  gettingStarted = "gettingStarted",
}

export enum NotificationComponentTypes {
  Pregnancy = "pregnancy",
  Children = "children",
}

export enum RemoteNotificationRecordType {
  draft = "draft",
  duplicatedDraft = "duplicatedDraft",
  completed = "completed",
  error = "error",
  pending = "pending",
  scheduled = "scheduled",
  schedulePending = "schedulePending",
  scheduleDeletePending = "scheduleDeletePending",
  scheduleDeleted = "scheduleDeleted",
}

export enum ScreenInMobile {
  Discover = "discover",
  Child = "home.child",
  Pregnancy = "home.pregnancy",
}

export enum BlogTypes {
  BlogPost = "blogpost",
  ChildBlogPost = "childblogpost",
  BirthStory = "birthstory",
  GeneralBlogPost = "generalblogpost",
}

export enum ContentType {
  Article = "article",
  FAQ = "faq",
  PodcastEpisode = "podcastEpisode",
  Pregnancy = "blogPregnancy",
  Birth = "blogBirth",
  Child = "blogChild",
  General = "generalblogpost",
  Checklist = "checklist",
  BlogPost = "blogpost",
  BirthStories = "birthstory",
  ChildBlogpost = "childblogpost",
  Offer = "offer",
  Podcast = "podcast",
  Discover = "discover",
  Dietary = "dietaryAdvice",
  ArticleCategories = "articleCategories",
}

export enum DeepLinkType {
  Article = "articles",
  FAQ = "faqs",
  PodcastEpisode = "podcastEpisodes",
  Checklist = "checklists",
  BlogPost = "blogpost",
  ChildBlogPost = "childblogpost",
  GeneralBlogPost = "generalblogpost",
  BirthStories = "birthstory",
  Offer = "offers",
  Podcast = "podcasts",
  Dietary = "dietaryAdvices",
  ArticleCategories = "articleCategories",
  ContentCollection = "contentCollection",
  AppTakeOver = "appTakeOver",
}

export enum AppEnvironments {
  Production = "PRODUCTION",
  Development = "DEVELOPMENT",
  Staging = "STAGING",
}

export enum TipsType {
  Pregnancy = "pregnancy",
  Child = "child",
}

export enum BannerDisplayableSegment {
  pregnanciesWithInWeeksRange = "pregnanciesWithInWeeksRange",
  childrenWithInMonthsRange = "childrenWithInMonthsRange",
  hasPartner = "hasPartner",
  allUsers = "allUsers",
}
