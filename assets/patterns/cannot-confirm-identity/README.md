# Cannot confirm identity

This pattern tells users we cannot confirm their identity and what they can do next. This is part of confirming their identity when they sign in with a Government Gateway account for the first time.

{{ example('cannot-confirm-identity.html', scaled=false, cy=false, html=false) }}

## When to use this pattern

Use this pattern when we cannot confirm a user’s identity. This may include when a user:

- provides details that do not match those we have on file
- does not complete the process
- does not provide enough information
- makes too many attempts

Doing this helps users complete the task they are trying to do. It also helps reduce time and money spent dealing with queries received by phone and post.

There is also a pattern to [tell users we have confirmed their identity](/patterns/tell-users-we-have-confirmed-who-they-are/index.html).

## How it works

The page should have:

- ‘We cannot confirm your identity – service name – GOV.UK’ as the page title
- ‘We cannot confirm your identity’ as the `<h1>` page heading
- content that explains what went wrong and what they can do
- a call to action

{{ example('cannot-confirm-identity.html', scaled=false, cy=true, html=false) }}

### Avoid ending a journey

Offer the user a way of continuing to use the service where possible.

If this is not possible, provide another way for the user to do what they need to do. This could be another service where they do not need to confirm their identity.

{{ example('cannot-confirm-identity-avoid.html', scaled=false, cy=true, html=false) }}

### Understand the user’s journey

Work with the team responsible for the microservice that confirms a user’s identity to understand how the process works. This will help you decide what is the best thing to tell a user to help them complete the process.

### Tell users what they will need to confirm their identity when they start to use the service

List what they need in the ‘before you start’ information where the service starts.

### Give users extra help when they have a deadline

Help users confirm their identity as quickly as possible if they must do something by a specific time and the deadline is close. For example, a Self Assessment tax return or tax credit renewal.

### Provide help specific to your service

Avoid generic content. Display content that is relevant to the user’s journey.

{{ example('cannot-confirm-identity-specific.html', scaled=false, cy=true, html=false) }}

## Research on this pattern

{{ research(117) }}
