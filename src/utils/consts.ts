export const validationError = "validationError";
export const cloudFunctionRegion = "europe-west2";
export const cloudDomainUrl = `https://${cloudFunctionRegion}-${process.env.REACT_APP_PROJECT_ID}.cloudfunctions.net/`;
export const deeplinkBaseUrl = process.env.REACT_APP_DEEPLINK_BASE_URL;
export const dynamicLinkBaseUrl = process.env.REACT_APP_DYNAMICLINK_BASE_URL;
export const offerPriorityUptoCount = 5;
export const recommendedContentTitle = "Recommended content";
export const cloudFunctionNames = {
  getUser: "getUser",
  deleteUser: "deleteUser",
  scrapeMeta: "scrapeMeta",
  getUserForClaims: "getUserForClaims",
  grantUserPermissions: "grantUserPermissions",
  createAuthUserWithClaims: "createAuthUserWithClaims",
  sendRemoteNotification: "sendRemoteNotification",
  tags: {
    addTag: "addTag",
    deleteTag: "deleteTag",
    updateTag: "updateTag",
  },
  faqs: {
    updateFaqSortOrder: "updateFaqSortOrder",
  },
};

export const onboarding = "onboarding";

export const siteConsts = {
  sentryDsn:
    "https://4e1718c46d18441ebf4850c8ac534db7@o520608.ingest.sentry.io/4504099450191872",
  scrapUrl: `${cloudDomainUrl}${cloudFunctionNames.scrapeMeta}?url=`,
  getUserUrl: (userId: string) =>
    `${cloudDomainUrl}/${cloudFunctionNames.getUser}?uid=${userId}`,
  deleteUserUrl: (userId: string) =>
    `${cloudDomainUrl}/${cloudFunctionNames.deleteUser}?uid=${userId}`,
  youtubeApiV3: (youtubeUrlId: string) =>
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeUrlId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
};

export const firebaseBucketConsts = {
  articleFileStoragePath: "articles",
  highlightFileStoragePath: "highlight",
  tips: "tips",
  articleVideoFileStoragePath: "Article video h265/",
  videoExtention: "mp4",
  remoteNotifications: "remote notifications",
};

export const firebaseCollectionNames = {
  admins: "admins",
  articleCategories: "articleCategories",
  articles: "articles",
  birthStories: "birthStories",
  blogposts: "blogposts",
  categories: "categories",
  checklistTemplates: "checklistTemplates",
  checklists: "checklists",
  childBlogPosts: "childBlogPosts",
  childInformation: "childInformation",
  contentMenu: "contentMenu",
  tipsCollection: {
    tips: "tips",
    pregnancyTipsSub: "pregnancyTips",
    childTipsSub: "childTips",
  },
  content: {
    content: "content",
    editorContent: "editorContent",
    pregnancyTipsSub: "pregnancyTips",
  },
  dietaryAdviceCategories: "dietaryAdviceCategories",
  dietaryAdviceContent: "dietaryAdviceContent",
  dietaryAdvices: "dietaryAdvices",
  faq: "faq",
  faqCategories: "faqCategories",
  forceUpdate: "forceUpdate",
  influencers: "influencers",
  milestones: "milestones",
  monthlyInformation: "monthlyInformation",
  offerSignups: "offerSignups",
  offers: "offers",
  podcasts: "podcasts",
  popular: "popular",
  popularArticles: "popularArticles",
  search: "search",
  shareCodes: "shareCodes",
  Sponsors: "Sponsors",
  support: "support",
  users: "users",
  verifiers: "verifiers",
  weeklyInformation: "weeklyInformation",
  highlights: "highlights",
  generalBlogPosts: "generalBlogPosts",
  categoryItems: {
    categoryItems: "categoryItems",
    faq: "faq",
    content: "content",
  },
  notifications: {
    collectionName: "notifications",
    content: {
      pregnancy: "pregnancy",
      children: "children",
    },
  },
  remoteNotifications: {
    collectionName: "remoteNotifications",
  },
  tagsCollection: {
    tags: "tags",
    commonSub: "common",
  },
};

export const NUM_OF_WEEKS = 42;
export const NUM_OF_MONTHS = 24;

export const TAGS_MAX_LENGTH = 5;
export const UPLODABLE_IMAGE_SIZE = 2; //in MB

const dataStudioUrl = "https://datastudio.google.com/embed/reporting/";

const appendUrl = (url: string) => `${dataStudioUrl}${url}`;

export const dashboardLinks = {
  mainDashboard: appendUrl("efe9f95e-4782-4602-9acf-3d306e2eba24/page/BxkiC"),
  partnersDashboard: appendUrl(
    "32c38b8c-7f65-458d-a2d6-215b7f4cfba7/page/p_sy1hveb8qc"
  ),
  offersDashboard: appendUrl(
    "2efc2cb7-7736-4632-8990-c5ab672e7c9e/page/p_a3jukbcf4c"
  ),
  onboardingDashboard: appendUrl(
    "b89ba6df-bd4a-4cc7-9734-3055d60e0f69/page/D8mjC"
  ),
  checklistDashboard: appendUrl(
    "024897a8-69c9-462d-b5c2-76fc9022f36e/page/29JkC"
  ),
  popularUsageChecklist: appendUrl(
    "21d8bb59-5028-45da-9d8f-2b620181a002/page/ONAmC"
  ),
  geoAnalyticsReport: appendUrl(
    "e8db3c14-76ed-4a71-9bcc-6bfba5e77cba/page/Z3GlC"
  ),
  geoFirestoreReport: appendUrl(
    "efe7da58-ea7c-4b36-915d-7ccaf3669139/page/9cHlC"
  ),
  articleDashboard: appendUrl(
    "02e05681-de82-4f92-a9bc-a25018c8aa49/page/ONAmC"
  ),
  screenDiscoverDashboard: appendUrl(
    "10f34aba-acfa-4b13-a5a0-67983d3f9415/page/p_fihsvnrf4c"
  ),
  faqReport: appendUrl(
    "9f2baf7c-cd0a-4335-9354-522dd0c91dcd/page/p_chdcsgje4c"
  ),
  influencerDashboard: appendUrl(
    "0ad3c064-bbfe-4b35-ba1c-ebda2f5564aa/page/D8mjC"
  ),
  interestsDashboard: appendUrl(
    "ccc3dc02-e747-45b6-8b24-bef1e2284fc8/page/dbJmC"
  ),
  contentUsageDashboard: appendUrl(
    "eea8571e-bda3-482b-97ab-3722b4d16178/page/D8mjC"
  ),
  discoverSearchDashboard: appendUrl(
    "0d931de5-1b7c-43ea-b9ed-6b739cfedf6e/page/1R9jC"
  ),
  funnelAnalyticsDashboard: appendUrl(
    "03410d7a-dd68-4277-8b0b-a97985072ddd/page/bkcR"
  ),
  notificationsDashboard: appendUrl(
    "b326b5b6-0e5f-4ef9-a242-596c643044cc/page/tEnnC"
  ),
};

export const scraperMessages = {
  limitOver: "Limit exceeded for scraper",
  privateAccount: "Cannot access private accounts",
};

export const deepLinkPrefix = {
  PRODUCTION: {
    env: "Production",
    domain: "https://babyjourney.se",
  },
  DEVELOPMENT: {
    env: "Development",
    domain: "https://dev.babyjourney.se",
  },
  STAGING: {
    env: "Staging",
    domain: "https://staging.babyjourney.se",
  },
};

export const APP_STORE_ID = "1515225502";

export const SKIP_APP_PREVIEW_PAGE = 1;

export const IOS_BUNDLE_ID = "se.babyjourney";

export const ANDROID_PACKAGE_NAME = "se.babyjourney";
