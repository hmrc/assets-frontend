# Header

<div class="alert alert--info">
  <p class="alert__message">This component is work in progress.</p>
  <p class="alert__message">You can use it in your service but you should [contribute research](https://github.com/hmrc/design-patterns/issues/4).</p>
</div>
  

The HMRC header is a variant of the [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer) all elements that are imported from the GOV.UK header should be consistent and should not be changed.

{{ example('header.html', true) }}

## When to use the HMRC Header

Start with the [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer).

Only use the HMRC header if there is a user need for people to know they are dealing with HMRC.

If your service is going to be within the Personal tax account you should use the [Account header](/components/accopunt-header/index.html).

## How the HMRC Header works

The HMRC header has two states:

-  [signed out](#signed-out-state)
-  [signed in](#signed-in-state)

### Signed out state

Use this:

- in services that do not require people to sign in
- when a user is signed out
- when it's important to people that they know they are using an HMRC service

{{ example('header.html', true) }}

This version of the header should contain:

- [the HMRC cookie banner](#the-hmrc-cookie-banner)
- [the GOV.UK header](#the-gov.uk-header)
- [a phase banner](#phase-banner) unless the service is live
- [HMRC logo](#hmrc-logo)
- [the language selector](#language-selector) if your service is avalible in Welsh

#### Markup 

{{ markup('header.html') }}

### Signed in state

Use this:

- when it's important to people that they know they are using an HMRC service
- when people are signed in

{{ example('header--signed-in.html', true) }}

This version of the header should contain:

- [the HMRC cookie banner](#the-hmrc-cookie-banner)
- [the GOV.UK header](#the-gov.uk-header)
- [a sign out link](#sign-out-link)
- [a phase banner](#phase-banner) unless the service is live
- [HMRC logo](#hmrc-logo)
- [last logged in status](#last-logged-in-status)
- [the language selector](#language-selector) if your service is avalible in Welsh

#### Markup 

{{ markup('header--signed-in.html') }}

### Header elements

#### The HMRC cookie banner

The link to the cookie policy should go to the [HMRC cookie policy](https://www.tax.service.gov.uk/help/cookies) page. You should add information on service-specific cookie information to that page.

The cookie banner is displayed the first time a person visits GOV.UK. It's not shown on subsequent pages unless the cookies change. When people move to an HMRC service the HMRC cookie banner will be displayed again. 

Most people will access HMRC transactional services via a GOV.UK start page. They will be displayed the cookie banner twice. This is not ideal as people will not understand they are moving from one site to another. 

#### The GOV.UK header

The GOV.UK header should be used without changing anything.

#### Sign out link

Only used if people are signed in.

#### Phase banner

The phase banner comes from GOV.UK.

The feedback link in the phase banner should point to [https://www.tax.service.gov.uk/contact/beta-feedback-unauthenticated?service=service-name](https://www.tax.service.gov.uk/contact/beta-feedback-unauthenticated). Your service name should be appended to the URL so feedback can be directed back to your service team.

#### HMRC logo

The HMRC logo is included for services where there is a user need to reassure people that they are using an HMRC service.

For example, when they are making a payment and need to be sure that the money is going to the right government department.

More user research is needed to prove that the HMRC logo reassures people and meets this need.

#### Last logged in status

The last logged in status tells people the time and date that they signed in.

At the moment it's not possible to present names across all HMRC services in a consistent way which may cause people confusion. We stopped using peoples names in September 2016.

More research is needed to understand if displaying a persons name is important.

#### Language selector

Should be used if the service or page has been translated into another language. 

Welsh is the only language we support at the moment. We call this the Language selector because we don't know if it will be used for other languages in the future. 

The Language selector is sometimes referred to as the Welsh toggle.

## Research on this component 

We need more user research on the header. 

We want to know:

- if people are reassured when they seeing the HMRC logo
- if the last signed in date in the signed in version is necessary
- if showing a persons name reassures them 

Contribute your research via this [GitHub issue](https://github.com/hmrc/design-patterns/issues/4).






