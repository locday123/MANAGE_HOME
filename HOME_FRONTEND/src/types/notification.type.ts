type Notification = {
    notification_ID: number;
    user_ID: string;
    message: string;
    status: "UNREAD" | "READ";
    created_at: string;
};
export default Notification;
