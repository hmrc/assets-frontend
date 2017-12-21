# Badge

{{ wip(142) }}

Badges are numerical indicators of how many items are associated with a link.

{{ example("badge.html") }}

## When to use this
Use this component to notify users when there is a specific number of related items that may require their attention. The component should only be used with an associated link whereby the user can take an action to reduce the number of items requiring their attention.

> The accessibility requirements, markup and css for this component requires additional work and investigation.

### When not to use this
The component is designed to draw the users attention so it should only be used with careful consideration. Unless a strong user need can be demonstrated, badges should not be implemented outside of primary navigation. 

Do not use this component where the user cannot take any action to reduce the badge counter.

## How it works 
```html
<a href="#">Messages<span class="badge" aria-label="You have 103 unread messages">99+</span></a>
```

This component should be used alongside a link, it will appear to the top right of the link.

A counter value should be passed into the span as well as the aria-label. When the counter value is 0 the badge should not be visible and the aria-label should also reflect this.

Although the badge will expand to display large numbers, it is recommended that a reasonable cap is agreed and implemented.

For example, if an unread message count exceeds 99, display "99+".

## Research on this
This is a widely recognised component that is ubiquitous on both mobile and desktop interfaces.

Whilst this component has not undergone specific internal usability testing a two key hypotheses have been tested as part of the wider [Account header](components/account-header/index.html) pattern:
* What the badge represents is correctly understood by users
* The badge does not interfere or distract users that are attempting to complete a task
