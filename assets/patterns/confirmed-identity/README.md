# Confirmed identity

This pattern lets users know we have confirmed their identity. It is part of the journey when users sign in with a Government Gateway account for the first time.

{{ example('confirmed-identity.html', scaled=false, cy=false, html=false) }}

## When to use this pattern

Use this pattern when we can confirm a user’s identity.</p>

There is also a pattern when we [could not confirm their identity][help users when we cannot confirm their identity](/patterns/could-not-confirm-identity/index.html).

## How it works

Use the standard page template from your service and have the same:

- header
- phase banner
- footer

{{ example('confirmed-identity.html', scaled=false, cy=true, html=false) }}

The page should have:

- ‘We have confirmed your identity – service name – GOV.UK’ as the page title
- ‘We have confirmed your identity’ as the `<h1>` page heading
- a ‘Continue’ call to action

Do not use the confirmation page pattern. This is not the end of their journey.

## Research

We need more research. If you have used confirmed identity, get in touch to share your research findings.

[Discuss confirmed identity on GitHub](https://github.com/hmrc/design-patterns/issues/148)
