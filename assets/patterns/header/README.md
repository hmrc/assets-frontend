# Header

This is the [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer) with extra parts to meet user needs.

## When to use this pattern

Start with the [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer). Do not change any element you import from this header.

Only add an HMRC header if there is a user need to know you are dealing with HMRC. For example, if they are making a payment and need to be sure that the money is going to the right government department.

{{ example('header--hmrc-logo.html', scaled=true, cy=false, html=false) }}

If your service is in the personal tax account, use the [Account header](/components/account-header/index.html).

## How it works

If your service is available in Welsh, include the language selector.

### When the user is signed out

Use this header:

- in services people do not have to sign in to
- before a user signs in
- when a user has signed out

{{ example('header.html', scaled=true, cy=false, html=true) }}

### When the user is signed in

This header must contain a sign out link.

{{ example('header--signed-in.html', scaled=true, cy=false, html=false) }}

### Tell users about cookies

The GOV.UK header comes with a cookie banner. Use this but change the link to [https://www.tax.service.gov.uk/help/cookies](https://www.tax.service.gov.uk/help/cookies)

[Find out more about cookies](https://www.gov.uk/service-manual/technology/working-with-cookies-and-similar-technologies)

### Use the phase banner

The GOV.UK header also has the phase banner. It includes a feedback link – [https://www.tax.service.gov.uk/contact/beta-feedback-unauthenticated?service=service-name](https://www.tax.service.gov.uk/contact/beta-feedback-unauthenticated?service=service-name)

In the URL, replace ‘service-name’ with your service’s name so feedback goes to your team.

{{ example('header--phase-banner.html', scaled=true, cy=false, html=false) }}

## Research on this component

We need more research – [add your research on GitHub](https://github.com/hmrc/design-patterns/issues/4).