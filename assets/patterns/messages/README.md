# Messages

{{ wip(44) }}

This pattern is used to display messages sent to a user from HMRC.

## When to use this pattern

Use this pattern when your service sends messages to users.

## How it works 

This pattern includes a message list and message details.

### Message list

Display a summary of messages the user has received. The list has:

- subject of the message
- date the message was sent
- a link to the full message
- a read and unread state

### Message details

Display a complete message. Include:

- subject of the message
- date the message was sent
- message content
- back link that takes you to the message list

### Unread messages

{{ example("messages-unread.html") }}
{{ markup("messages-unread.html") }}

### Read messages

{{ example("messages-read.html") }}
{{ markup("messages-read.html") }}

## Research on this pattern

{{ research(44) }}
