# Messages

{{ wip(44) }}

This pattern is used to display messages sent to a user from an HMRC service.

## When to use this pattern

Use this pattern when your service needs to send multiple messages to users.


## How it works 

This patterns has two views:

- message list
- message details

### Message list

This should display a list summarising messages received. Each summary should link to the full message and should have a read and unread state.

The summary information should include:

- subject
- date

### Message details

The message details should show the complete message. It should include:

- subject
- date
- message content
- back link to messages list

### Unread messages

{{ example("messages-unread.html") }}
{{ markup("messages-unread.html") }}

### Read messages

{{ example("messages-read.html") }}
{{ markup("messages-read.html") }}

## Research on this pattern

{{ research(44) }}
