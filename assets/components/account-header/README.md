# Account header

{{ wip(128) }}

The account header is used in, and was designed for, the [personal tax account](https://www.tax.service.gov.uk/personal-account).

{{ example('account-header-example.html', scaled=true, cy=false, html=false) }}

## When to use this component

If your service is part of the personal tax account. 

### When not to use this component

If your service is not part of the personal tax account. Use the [header](/patterns/header/index.html) instead.

## How it works

The account header contains:

- the HMRC cookie banner
- [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer)
- the Account menu
- the language selector if your service is available in Welsh

{{ example('account-header-example.html', scaled=true, cy=true, html=true) }}

## Research on this component 

{{ research(128) }}