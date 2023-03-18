// notification example (different from mantine notification)
export function notify(title, body) {
    new Notification(title, { body: body || "", });
}