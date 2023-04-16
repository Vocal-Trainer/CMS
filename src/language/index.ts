import {
  dayValidationMaxValue,
  dayValidationMinValue,
  UPLODABLE_IMAGE_SIZE as MAX_UPLODABLE_IMAGE_SIZE,
} from "../utils";

export const commonErrors = {
  urlValidationError: "Must be a url",
  requiredError: "Required field",
  contentLimitError: "Content has reached the limit",
  numberTypeError: "You must specify a valid number",
  onRemoveContentError:
    "Do you really want to delete this content? This action cannot be undone.",
  notInRangeError: "Please add a value in range",
  recordAvailableError: "This record is alreay available",
  selectAtleastOneItem: "Must select at least one item",
  emailError: "Must be a valid email",
  deleteRecordError: "Error deleting record",
  searchRecordError: "Error on searching record",
  passwordError: "Password must be at least 6 characters long",
  numberError: "This must be a number",
  urlShouldHttps: "This url must be a HTTPS",
  positiveNumberError: "Number must be greater than 0!",
};

export const commonSuccessMessages = {
  deleteSuccessMessage: "Record Deleted successfully",
  deleteSuccessMessageHeader: "Record deleted",
  updateSuccessMessageHeader: "Record updated",
  updateSuccessMessage: "Record updated successfully",
};

export const commonErrorMessages = {
  deleteErrorMessageHeader: "Error occured",
};

export const episodeModalMessages = {
  urlValidationText: commonErrors.urlValidationError,
  podcastExistsError: "This podcast episode already exists",
  podcastRequired: "Podcast is requred",
  podcastEpisodeRequired: "Podcast episode required",
};

export const PodcastMessages = {
  urlValidationText: commonErrors.urlValidationError,
  requiredValidationText: commonErrors.requiredError,
};

export const PodcastEpisodeMessages = {
  urlValidationText: commonErrors.urlValidationError,
  requiredValidationText: commonErrors.requiredError,
};

export const dayModalMessages = {
  urlValidationText: commonErrors.urlValidationError,
  requiredValidationText: commonErrors.requiredError,
  numberTypeErrorMessage: commonErrors.numberTypeError,
  dateRangeValidationText: "Date should be within 1 and 287",
  existingDayError: "Date already existing",
};

export const milestonePageMessages = {
  urlValidationText: commonErrors.urlValidationError,
  requiredValidationText: commonErrors.requiredError,
  dateRangeValidationText: "Week should be within 1 and 40",
  existingWeekError: "Week already existing",
  numberTypeErrorMessage: commonErrors.numberTypeError,
  mustBeNumber: "Must ba a number",
};

export const contentCollectionPageMessages = {
  contentRquiredText: "You need to add at least one content to collection",
};
export const RemoteNotificationMessages = {
  titleLengthError: "Title should be less than 65 characters",
  bodyLengthError: "Text should be less than 240 characters",
  cantSelectSegmentsAndGroups:
    "You can either select a user segment or a topic",
};

export const articleMessages = {
  onRemoveText:
    "Do you really want to delete this article? This action cannot be undone.",
};

export const imageUploadMessages = {
  imageUploadError: "Wrong input format, please check file name and type",
  fileSizeError: `File size should be less than ${MAX_UPLODABLE_IMAGE_SIZE} MB `,
};

export const popularPageMessages = {
  contentLimitErrorMessage: commonErrors.contentLimitError,
  requiredValidationText: commonErrors.requiredError,
  numberTypeErrorMessage: commonErrors.numberTypeError,
  numberNotInRangeErrorMessage: commonErrors.notInRangeError,
  recordAvailableError: commonErrors.recordAvailableError,
};

export const influencerModalMessage = {
  requiredValidationText: commonErrors.requiredError,
  categoryError: "Please select at least one blog category to add influencer",
};

export const roleSearchMessages = {
  searchUserPlaceHolder: "Enter mobile or admin user id or email here",
  roleUpdatePlaceHolder: "select role(s) for the searched user",
  rolePageTitle: "Manage admin users",
};

export const tipsErrorMessages = {
  recordMaxMin: `tip day must be in between ${dayValidationMinValue} and ${dayValidationMaxValue} `,
};

export const highlightsErrorMessages = {
  recordMax: (max: number) => `Character length must be less than ${max}  `,
};
