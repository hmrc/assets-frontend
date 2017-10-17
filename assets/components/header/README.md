# HMRC Header

<div class="alert alert--info">
  <p class="alert__message">This patterns is work in progress.</p>
  <p class="alert__message">View the to do list for this pattern on <a href="https://github.com/hmrc/design-language-documentation/issues/4">GitHub</a>.</p>
</div>
  

The HMRC header is a variant of the [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer) all elements that are imported from the GOV.UK header should be consistent and should not be changed in any way.

<div class="example">
  <div class="scale-wrapper">
    <div class="scale">{% include "header.html" %}</div>
  </div>
</div>

## When to use the HMRC Header

Only use the HMRC header if there is a user need for people to know they are dealing with HMRC.

There are 3 different headers that you can use in your service:

1. the [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer)
2. the HMRC header
3. the [Personal tax account header](/components/accopunt-header/index.html)

Start with the GOV.UK header.

## How the HMRC Header works

The HMRC header has two states:

-  [signed out](#signed-out-state)
-  [signed in](#signed-in-state)

### Signed out state

Use this:

- in services that do not require users to sign in
- when a user is signed out from a service
- when it's important to users that they know they are using an HMRC service

<div class="example">
  <div class="scale-wrapper">
    <div class="scale">{% include "header.html" %}</div>
  </div>
</div>

[View in a new window](blank/header.html)

This version of the header should contain:

- [the HMRC cookie banner](#the-hmrc-cookie-banner)
- [the GOV.UK header](#the-gov.uk-header)
- [a phase banner](#phase-banner) unless the service is live
- [HMRC logo](#hmrc-logo)
- [the language selector](#language-selector) if your service is avalible in Welsh

### Signed in state

Use this:

- when it's important to users that they know they are using an HMRC service
- when people are signed in to the service

<div class="example">
  <div class="scale-wrapper">
    <div class="scale">{% include "header--signed-in.html" %}</div>
  </div>
</div>

[View in a new window](header--signed-in.html)

This version of the header should contain:

- [the HMRC cookie banner](#the-hmrc-cookie-banner)
- [the GOV.UK header](#the-gov.uk-header)
- [a sign out link](#sign-out-link)
- [a phase banner](#phase-banner) unless the service is live
- [HMRC logo](#hmrc-logo)
- [last logged in status](#last-logged-in-status)
- [the language selector](#language-selector)

## Personal tax account header

If you are working on a service that is planned to be part of the personal tax account you should use the header used in the [Personal tax account](#)

## Header elements

### The HMRC cookie banner

The link to the cookie policy should go to the [HMRC cookie policy](https://www.tax.service.gov.uk/help/cookies) page. You should add information on service specific cookie information to that page.

The cookie banner is displayed the first time a person visits GOV.UK on the page they land on first. It's not displayed on subsequent pages unless the cookies change. When users move to an HMRC service they will be displayed the HMRC cookie banner. 

Because most users will access HMRC transactional service via a GOV.UK start page they may be displayed the cookie banner twice. This is not ideal as users will not understand they are moving from one site to another. 

### The GOV.UK header

The GOV.UK header should be used without changing anything.

### Sign out link

Only used if users are signed in.

### Phase banner

The phase banner comes from GOV.UK and should be used without changing anything.

### HMRC logo

The HMRC logo is included for services where there is a user need to reassure people that they are using an HMRC service.

For example, when they are making a payment and need to be sure that the money is going to the right government department.

More user research is needed to prove that the HMRC logo reassures users and meets this need.

### Last logged in status

The last logged in status tells users the time and date that they signed in.

At the moment it's not possible to present names across all HMRC services in a consistent way which may cause people confusion. We stopped using peoples names in September 2016.

More research is needed to understand if displaying a persons name is important.

### Language selector

Should be used if the service or page has been translated into another language. 

Welsh is the only language we support at the moment. We call this the Language selector because we don't know if it will be used for other languages in the future. 

The Language selector is sometimes referred to as the Welsh toggle.