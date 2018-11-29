# Could not confirm identity

This pattern lets the user know we could not confirm their identity and what they can do next. This is part of confirming their identity when they sign in with a Government Gateway account for the first time.

## When to use

Use this pattern when we could not confirm the user’s identity. This may include when the user:

- provides details that do not match those we have on file
- does not complete the process
- does not provide enough information
- makes too many attempts

Doing this helps the user complete the task they are trying to do. It also helps reduce time and money spent dealing with queries received by phone and post.</p>

There is also a pattern when we have [confirmed their identity](/patterns/tell-users-we-have-confirmed-who-they-are/index.html).

## How it works

Use the standard page template from your service and have the same:

- header
- phase banner
- footer

The page should have:

- ‘We could not confirm your identity – service name – GOV.UK’ as the page title
- ‘We could not confirm your identity’ as the `<h1>` page heading
- content that explains what went wrong and what they can do
- a call to action

{{ example('could-not-confirm-identity.html', scaled=false, cy=true, html=false) }}

{{ example('could-not-confirm-identity-specific.html', scaled=false, cy=true, html=false) }}

### Avoid ending a journey

Offer the user a way of continuing to use the service where possible.

If this is not possible, provide another way for the user to do what they need to do. This could be another service where they do not need to confirm their identity.

{{ example('could-not-confirm-identity-avoid.html', scaled=false, cy=true, html=false) }}

### Understand the user’s journey

Work with the team responsible for the microservice that confirms a user’s identity to understand how the process works. This will help you decide what is the best thing to tell the user to help them complete the process.

### Tell users what they will need to confirm their identity when they start to use the service

List what the user needs in the ‘before you start’ information where the service starts.

### Give the user extra help when they have a deadline

Help the user confirm their identity as quickly as possible if they must do something by a specific time and the deadline is close. For example, a Self Assessment tax return or tax credit renewal.

## Research

We need more research. If you have used could not confirm identity, get in touch to share your research findings.

[Discuss could not confirm identity on GitHub](https://github.com/hmrc/design-patterns/issues/117)
