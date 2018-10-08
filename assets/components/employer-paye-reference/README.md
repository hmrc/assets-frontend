# Employer PAYE reference

<p style="margin-bottom:50px;margin-top:-30px">
<strong class="phase-tag">EXPERIMENTAL</strong><br>
This is currently experimental because more research is needed.</p>

This pattern lets users enter an employer PAYE reference. Do not call it ‘PAYE employer reference number’, ‘employer PAYE reference number’ or ‘PAYE reference’.

## When to use

Use this pattern when users need to enter an employer PAYE reference to use a service.

If there is a good reason for asking for an employer PAYE reference, but the user does not have to enter one, make it optional.

## When not to use

If there is no good reason for asking for an employer PAYE reference and the user does not have to enter one to use the service, do not ask for one.

## How it works

Use a single text input when you ask users for an employer PAYE reference. It must be formatted as:

- 3 numbers
- a forward slash (/)
- between 1 and 10 characters, which can be letters and numbers

If you show an example, always use ‘123/AB456’.

### Provide help

Always provide help in the form label, normal content or hint text. This may include:

- a short explanation of what an employer PAYE reference is
- where they can find it
- what it looks like
- an example

You can use an image that shows where it is on documents and letters.

Do not use the [details component](https://design-system.service.gov.uk/components/details/) to hide any help. Research shows people may:

- not know what an employer PAYE reference is
- struggle with how it is formatted
- need help to know what an employer PAYE reference looks like

The form label and help should be as clear as possible and will be different in personal tax and business tax services.

In a personal tax service, use the company’s name, like ‘Anycompany’s employer PAYE reference’. Try to avoid ‘your employer’s employer PAYE reference’ because it could be confusing.

In a business tax service, if it is not the company the user works for, use the company’s name. If it is the company the user works for, use ‘your employer PAYE reference’.

You can ask for the employer PAYE reference as the main heading or `<h1>` of the screen. It can be a question or statement.

{{ example("employer-paye-reference-heading.html", scaled=false, cy=false, html=true) }}

Or you can ask for the employer PAYE reference as a normal form label, separate from the `<h1>`.

{{ example("employer-paye-reference-label.html", scaled=false, cy=false, html=true) }}

### Error messages

Error messages should be styled like this:

{{ example("employer-paye-reference-label-error.html", scaled=false, cy=false, html=true) }}

Make sure errors follow the <a href="https://design-system.service.gov.uk/components/error-message/">guidance about error messages</a> in the GOV.UK Design System and have specific error messages for specific error states.

#### If the employer PAYE reference is empty

Say ‘Enter [whatever it is]’.<br>
For example, ‘Enter Anycompany’s employer PAYE reference’.

#### If the employer PAYE reference is in the wrong format and there is an example

Say ‘Enter [whatever it is] in the right format’.<br>
For example, ‘Enter Anycompany’s employer PAYE reference in the right format’.

## Research

We need more research. If you have used employer PAYE reference, get in touch to share your research findings.

[Discuss employer PAYE reference on GitHub](https://github.com/hmrc/design-patterns/issues/138)
