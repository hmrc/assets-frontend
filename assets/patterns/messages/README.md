# Messages

This pattern is used to display messages sent to a user from an HMRC service.

## When to use this pattern

Use this pattern when a service needs to send messages to users. The messages are not deleted and can be referred back to at any time.

### When not to use this pattern

Do not use this as the only way of sharing important or time-sensitive information with a user. Only display messages when users are signed in to a service.

## How it works

This patterns has 2 views:

* message list
* message details

### Message list

Display a summary of messages the user has received. The list has:

- subject of the message
- date the message was sent
- a link to the full message
- a read and unread state

#### Unread messages

{{ example("messages-unread.html") }}
{{ markup("messages-unread.html") }}

#### Read messages

{{ example("messages-read.html") }}
{{ markup("messages-read.html") }}

### Message details

Display a complete message. Include:

- subject of the message
- date the message was sent
- message content
- back link that takes you to the message list

## Research on this pattern

{{ research(44) }}
