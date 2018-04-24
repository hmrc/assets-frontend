# Header

{{ wip(4) }}

This is the [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer) with a number of additional parts, depending on the needs of your users.

## When to use this pattern

Start with the [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer). All elements that are imported from the GOV.UK header must not be changed.

Only add an HMRC header if there is a user need for people to know they are dealing with HMRC. For example, if they are making a payment and need to be sure that the money is going to the right government department.

If your service is in the personal tax account, use the [personal tax account header](/components/account-header/index.html) instead.

## How it works

Whenever you use the header, include the language selector, if your service is available in Welsh.

### When the user is signed out

Use this version:

- in services people do not have to sign in to
- before a user signs in
- when a user has signed out

{{ example('header.html', true) }}

#### Markup

{{ markup('header.html') }}

### When the user is signed in

This version of the header must also contain a sign out link.

{{ example('header--signed-in.html', true) }}

### Tell users about cookies

The GOV.UK header comes with a cookie banner. Use this, but change the link so it points to a service-specific cookie page. You can [find out more about using cookies](https://www.gov.uk/service-manual/technology/working-with-cookies-and-similar-technologies).

### Use the phase banner

The GOV.UK header also comes with a phase banner. It includes a link to get feedback about your service:
[https://www.tax.service.gov.uk/contact/beta-feedback-unauthenticated?service=service-name](https://www.tax.service.gov.uk/contact/beta-feedback-unauthenticated).

Add your service name to the end of the URL so feedback can be directed back to your team.

{{ example('header--phase-banner.html', true) }}

## Research on this component

We need more research – [add your research on GitHub](https://github.com/hmrc/design-patterns/issues/4).
