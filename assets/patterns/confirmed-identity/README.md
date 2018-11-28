# Confirmed identity

This pattern lets the user know we have confirmed their identity. This is part of confirming their identity when they sign in with a Government Gateway account for the first time.

## When to use

Use this pattern when we can confirm the user’s identity.

There is also a pattern when we [could not confirm their identity][help users when we cannot confirm their identity](/patterns/could-not-confirm-identity/index.html).

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

Do not use the confirmation page pattern. This is not the end of the user’s journey.

## Research

We need more research. If you have used confirmed identity, get in touch to share your research findings.

[Discuss confirmed identity on GitHub](https://github.com/hmrc/design-patterns/issues/148)
