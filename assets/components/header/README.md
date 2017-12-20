# Header

{{ wip(4) }}

The HMRC header is the same as the [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer) but includes the HMRC logo. All elements that are imported from the GOV.UK header must not be changed.

{{ example('header.html', true) }}

## When to use the HMRC header

Start with the [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer).

Only use the HMRC header if there is a user need for people to know they are dealing with HMRC.

If your service is in the personal tax account, use the [Account header](/components/account-header/index.html).

## How the HMRC header works

There are 2 versions of the header. Both versions must contain:

- [the HMRC cookie banner](#the-hmrc-cookie-banner)
- [the GOV.UK header](#the-gov.uk-header)
- [a phase banner](#phase-banner) unless the service is live
- [HMRC logo](#hmrc-logo)
- [the language selector](#language-selector) if your service is avalible in Welsh

### Version 1: When someone is signed out

Use this version:

- in services people do not have to sign in to
- before a user signs in
- when a user has signed out

{{ example('header.html', true) }}

#### Markup

{{ markup('header.html') }}

### Version 2: When someone is signed in

Use this version when people are signed in to a service.

{{ example('header--signed-in.html', true) }}

This version of the header must also contain:

- [a sign out link](#sign-out-link)
- [last signed in status](#last-signed-in-status)

#### Markup

{{ markup('header--signed-in.html') }}

### Header elements

#### The HMRC cookie banner

Link to [HMRC cookie policy](https://www.tax.service.gov.uk/help/cookies). Add service-specific cookie information to the cookie policy page.

Because most people get to HMRC services through GOV.UK, they may see GOV.UK’s cookie banner and HMRC’s. Both banners look the same but link to different policies. Both banners are shown once a month or if the cookies change.

#### The GOV.UK header

The GOV.UK header must used without changing anything.

#### Sign out link

Only use if people are signed in.

#### Phase banner

The phase banner comes from GOV.UK.

The feedback link in the phase banner is [https://www.tax.service.gov.uk/contact/beta-feedback-unauthenticated?service=service-name](https://www.tax.service.gov.uk/contact/beta-feedback-unauthenticated). Append your service name to the URL so feedback can be directed back to your team.

#### HMRC logo

The HMRC logo is only where there is a user need to reassure people that they are dealing with HMRC.

For example, if they are making a payment and need to be sure that the money is going to the right government department.

More user research is needed to prove that the HMRC logo reassures people and meets this need.

#### Last signed in status

The last signed in status tells people the time and date they last signed in.

At the moment, it is not possible to present people’s names consistently across services. We stopped using names in September 2016.

More research is needed to understand if displaying a person’s name is important.

#### Language selector

Use if the service or page is available in another language. 

Welsh is the only language we currently support. We do not know if it will be used for other languages. 

The language selector is sometimes called the Welsh toggle.

## Research on this component 

We need more user research on the header. 

We want to know if:

- people are reassured by the HMRC logo
- the last signed in time and date is needed
- displaying a person’s name reassures them 

Contribute your research via this [GitHub issue](https://github.com/hmrc/design-patterns/issues/4).
