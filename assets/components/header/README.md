# HMRC Header

<!-- <div class="alert alert--info">
  <p class="alert__message">This patterns is work in progress.</p>
  <p class="alert__message">View the to do list for this pattern on <a href="https://github.com/hmrc/design-language-documentation/issues/4">GitHub</a>.</p>
</div> -->
  

## Header design

The HMRC header is a variant of the [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer) all elements that are imported from the GOV.UK header should be consistent and should not be changed in any way.

<div class="example">
  <div class="scale-wrapper">
    <div class="scale">{% include "header.html" %}</div>
  </div>
</div>

## Choosing the right header.

There are 2 different headers that you can use in your service:

1. the [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer)
2. the HMRC header

Start with the GOV.UK header.

## GOV.UK Header

You can see the [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer) in the service manual.

## HMRC Header

Only use the HMRC header if there is a user need for people to know they are dealing with HMRC.

The HMRC header has two states:

-  signed out
-  signed in

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

- [the cookie banner](#the-cookie-banner)
- [the GOV.UK header](#the-gov.uk-header)
- [a phase banner](#phase-banner) unless the service is live
- [HMRC logo](#hmrc-logo)
- [the language selector](#language-selector)

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

- [the cookie banner](#the-cookie-banner)
- [the GOV.UK header](#the-gov.uk-header)
- [a sign out link](#sign-out-link)
- [a phase banner](#phase-banner) unless the service is live
- [HMRC logo](#hmrc-logo)
- [last logged in status](#last-logged-in-status)
- [the language selector](#language-selector)

## Header elements

### The cookie banner

#### Current behaviour





The link to the cookie policy should go to the [HMRC cookie policy](#) page. You should add information on service specific cookie information should be added to your services.

*Where should services talk about cookies that are service specific?*

The cookie banner is displayed the first time a person visits GOV.UK on the page they land on first. It's not displayed on subsequent pages unless the cookies change

*Is the above statement true?*

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