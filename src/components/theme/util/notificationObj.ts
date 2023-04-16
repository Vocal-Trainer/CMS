export const showMessage = (
  type: NotificationType,
  message: string,
  description: string
) => ({
  type,
  message,
  description: description ?? getDescription(type),
});

export enum NotificationType {
  Warning = "warning",
  Success = "success",
  Error = "error",
  Information = "info",
}

export const defaultValidationErrorMessage = {
  type: NotificationType.Warning,
  message: "Please check validations",
  description: "One of the inputs are entered incorrectly",
};

const getDescription = (type: NotificationType) => {
  switch (type) {
    case NotificationType.Success: {
      return "Successful";
    }
    case NotificationType.Warning: {
      return "The warning message was not generated";
    }
    case NotificationType.Error: {
      return "The error message was not generated";
    }
    case NotificationType.Information: {
      return "No information available at the moment";
    }
    default: {
      return "The devs forgot to set a notification type, that is why your seeing this";
    }
  }
};
