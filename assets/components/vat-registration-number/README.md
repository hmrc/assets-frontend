# VAT registration number

<p style="margin-bottom:50px;margin-top:-30px">
<strong class="phase-tag">EXPERIMENTAL</strong><br>
This is currently experimental because more research is needed.</p>

This pattern lets users enter a VAT registration number. Do not call it ‘VAT number’ or ‘VAT identification number’.

## When to use

Use this pattern when users need to enter a VAT registration number to use a service.

If there is a good reason for asking for a VAT registration number, but the user does not have to enter one, make it optional.

## When not to use

If there is no good reason for asking for a VAT registration number and the user does not have to enter one to use the service, do not ask for one.

## How it works

Use a single text input when you ask users for a VAT registration number. Allow users to enter it as 9 numbers with or without ‘GB’ at the start and remove this before validating.

If you show an example, always use ‘123456789’.

### Provide help

Always provide help in the form label, normal content or hint text. This may include:

- a short explanation of what a VAT registration number is
- where they can find it
- what it looks like
- an example

You can use an image that shows where it is on documents and letters.

Do not use the [details component](https://design-system.service.gov.uk/components/details/) to hide any help. Research shows people may:

- not know what a VAT registration number is
- struggle with how it is formatted
- need help to know what a VAT registration number looks like

The form label and help should be as clear as possible.

If it is the company the user works for, use ‘your VAT registration number’. If it is not the company the user works for, use the company's name, for example ‘Anycompany’s VAT registration number’.

You can ask for the VAT registration number as the main heading or `<h1>` of the screen. It may be a question or statement.

{{ example("vat-registration-number-heading.html", scaled=false, cy=false, html=true) }}

Or you can ask for the VAT registration number as a normal form label, separate from the `<h1>`.

{{ example("vat-registration-number-label.html", scaled=false, cy=false, html=true) }}

### Error messages

Error messages should be styled like this:

{{ example("vat-registration-number-label-error.html", scaled=false, cy=false, html=true) }}

Make sure errors follow the <a href="https://design-system.service.gov.uk/components/error-message/">guidance about error messages</a> in the GOV.UK Design System and have specific error messages for specific error states.

#### If the VAT registration number is empty

Say ‘Enter [whatever it is]’.<br>
For example, ‘Enter your VAT registration number’.

#### If the VAT registration number is in the wrong format

Say ‘Enter [whatever it is] in the right format’.<br>
For example, ‘Enter your VAT registration number in the right format’.

## Research

We need more research. If you have used VAT registration number, get in touch to share your research findings.

[Discuss VAT registration number on GitHub](https://github.com/hmrc/design-patterns/issues/129)
