# Badge

{{ wip(142) }}

A badge shows a number.

{{ example("badge.html") }}

## When to use a badge

Use a badge to grab attention and show how many things something has and. Only use it with an action someone can do to change the number.

### When not to use a badge

Do not use a badge when:

- the number of things is 0
- there is no action

Unless there is a strong user need, only use one as a part of navigation.

## How a badge works

A badge displays a number on the right-hand side of an action.

If the number is more than 99, display “99+”.

{{ markup("badge.html") }}

If there are 0 things, do not show the badge.

{{ markup("badge-0.html") }}

## Research on badges

Badges are common on many sites and services. It has been tested as part of the [Account header](components/account-header/index.html). Research showed:

- people understand what it is for
- it does not distract people from their task

More work is needed to make it accessible – [add your research on GitHub](https://github.com/hmrc/design-patterns/issues/142).