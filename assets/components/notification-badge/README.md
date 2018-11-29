# Notification badge

The notification badge lets the user know that there is new information to view, like unread messages, and how many of them there are. The notification badge is part of the [account header](components/account-header/index.html).

## When to use

Use the notification badge when the user needs to be alerted that they have, for example, unread messages and how many of them there are. Only use it if the number changes when the user performs an action.

### When not to use

Do not use the notification badge when:

- the number of things is 0
- there is no action

Unless there is a strong user need, only use a notification badge as a part of the navigation.

## How it works

The notification badge is a number displayed to the right-hand side of whatever it refers to.

{{ example("notification-badge.html", scaled=false, cy=false, html=true) }}

If the number is more than 99, display “99+”.

If there are 0 things, do not show the badge.

{{ example("notification-badge-zero.html", scaled=false, cy=false, html=true) }}

## Research

Research showed that notification badges are common across online services, smartphones and apps. Usability testing showed:

- users understand what it is for
- it does not distract users from their task

We need more research. If you have used the notification badge, get in touch to share your research findings.

[Discuss the notification badge on GitHub](https://github.com/hmrc/design-patterns/issues/142)
