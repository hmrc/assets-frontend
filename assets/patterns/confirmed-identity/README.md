# Confirmed identity

This pattern lets users know we have confirmed their identity. This is part of confirming their identity when they sign in with a Government Gateway account for the first time.

{{ example('confirmed-identity.html', scaled=false, cy=false, html=false) }}

## When to use this pattern

Use this pattern when we can confirm a user’s identity.

There is also a pattern to [help users when we cannot confirm their identity](/patterns/help-users-when-we-cannot-confirm-who-they-are/index.html).

## How it works

Use the standard page template from your service and have the same:

- header
- phase banner
- footer

The page should have:

- ‘We have confirmed your identity – service name – GOV.UK’ as the page title
- ‘We have confirmed your identity’ as the `<h1>` page heading
- a ‘Continue’ call to action

{{ example('confirmed-identity.html', scaled=false, cy=true, html=false) }}

Do not use the confirmation page pattern. This is not the end of their journey.

## Research on this pattern

{{ research(148) }}
