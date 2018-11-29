# Unique Taxpayer Reference

<p style="margin-bottom:50px;margin-top:-30px">
<strong class="phase-tag">EXPERIMENTAL</strong><br>
This is currently experimental because more research is needed.</p>

This component lets the user enter a Unique Taxpayer Reference (UTR). Do not call it a ‘Unique Taxpayer Reference number’.

## When to use

Use this pattern when the user must enter a UTR to use a service.

If there is a good reason for asking for a UTR but the user does not have to enter one, make it optional.

## When not to use

If there is no good reason for asking for a UTR and the user does not have to enter one to use the service, do not ask for one.

## How it works

You can ask for the UTR as the main heading or `<h1>` of the screen. It may be a question or statement.

{{ example("unique-taxpayer-reference-self-assessment-heading.html", scaled=false, cy=false, html=true) }}

{{ example("unique-taxpayer-reference-corporation-tax-heading.html", scaled=false, cy=false, html=true) }}

Or you can ask for the UTR as a normal form label, separate from the `<h1>`.

{{ example("unique-taxpayer-reference-self-assessment-label.html", scaled=false, cy=false, html=true) }}

Use a single text input and allow the user to enter:

- 10 numbers, with or without spaces
- 13 numbers, with or without spaces
- 10 or 13 numbers that start or end with a k, for example k1234567890123 and 1234567890k

Remove spaces, characters and extra numbers before validating.

### Provide help

Always provide help in the form of a label, normal content or hint text that is as clear as possible. This may include:

- a short explanation of what a UTR is
- where the user can find it
- what it looks like
- an example – if you show an example, always use ‘1234567890’

You can use an image that shows where it is on documents and letters. You could also provide a link to [Find a lost UTR number](https://www.gov.uk/find-lost-utr-number).

Do not use the [details component](https://design-system.service.gov.uk/components/details/) to hide any help. Research shows users may:

- not know what a UTR is
- need help to know what a UTR looks like

Ask the user about the type of business earlier in the journey and use appropriate content. For example, if the business is a sole trader, tell the user they can find their UTR on letters about Self Assessment. If the business if a limited company, tell the user they can find it on letters about Corporation Tax.

### Error messages

Error messages should be styled like this:

{{ example("unique-taxpayer-reference-corporation-tax-label-error.html", scaled=false, cy=false, html=true) }}

Make sure errors follow the <a href="https://design-system.service.gov.uk/components/error-message/">guidance about error messages</a> in the GOV.UK Design System and have specific error messages for specific error states.

#### If the UTR is empty

Say ‘Enter [whatever it is]’.<br>
For example, ‘Enter your Self Assessment Unique Taxpayer Reference’.

#### If the UTR is in the wrong format

Say ‘Enter [whatever it is] in the correct format’.<br>
For example, ‘Enter your partnership’s Self Assessment Unique Taxpayer Reference in the correct format’.

## Research

Research has shown that users often expect this kind of information to be pre-populated, especially when they have signed in. Research has also shown users:

- may not know what a UTR is
- need help to know what their UTR looks like
- need a specific error message so they know what went wrong
- find their UTR more easily when we provide help appropriate to the type of business

We need more research. If you have used Unique Taxpayer Reference, get in touch to share your research findings.

[Discuss Unique Taxpayer Reference on GitHub](https://github.com/hmrc/design-patterns/issues/126)
