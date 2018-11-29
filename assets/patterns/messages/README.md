# Messages

This pattern displays messages sent to the user from an HMRC service.

## When to use

Use this pattern when a service needs to send messages to users.

### When not to use

Do not use this as the only way of sharing important or time-sensitive information with the user. Only display messages when the user signs in to a service.

## How it works

Messages has 2 views. A message list and message details.

### Message list

This should display a summary of the messages the user has received.

The messages are not deleted and the user can read them at any time.

Include:

- the subject of the message
- the date the message was sent
- a link to the full message
- a read and unread state

{{ example("message-list.html", scaled=false, cy=false, html=true) }}

### Message details

This should display a complete message.

Include:

- the subject of the message
- the date the message was sent
- the message content
- a back link to the message list

{{ example("message-details.html", scaled=false, cy=false, html=true) }}

## Research

We need more research. If you have used messages, get in touch to share your research findings.

[Discuss messages on GitHub](https://github.com/hmrc/design-patterns/issues/44)
