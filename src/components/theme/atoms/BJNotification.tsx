import notification from "antd/lib/notification";

export const BJNotification = ({
  type,
  message,
  description,
}: NotificationTypes) => {
  notification[type]({
    message: message ?? "Hey",
    description: description ?? "Nothing available",
  });
};
