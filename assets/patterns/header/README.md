# HMRC Header

<div class="alert alert--info">
  <p class="alert__message">This patterns is work in progress.</p>
  <p class="alert__message">View the to do list for this pattern on <a href="https://github.com/hmrc/design-language-documentation/issues/4">GitHub</a>.</p>
</div>
  

## Header design

The HMRC header is an variant of the [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer) all elements that are imported from the GOV.UK header should be consistent and should not be changed in any way.

### HMRC Logo

The HMRC logo is included for services where there is a user need to reassure users that they are using an HMRC service.
For example, when they are making a payment and need to be sure that the money is going to the right government department.

More user research is needed to prove if the HMRC logo reassures users.

## Choosing the right header

There are 2 different headers that you can use in your service:

1. the [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer)
2. the HMRC header

You should start by using the GOV.UK header.

If you find - through user research - there is a user need for the HMRC header to be used, for example, because users need to know that they are dealing with HRMC then you should use the HMRC header.

## GOV.UK Header

You can see the [GOV.UK header](https://www.gov.uk/service-manual/design/add-the-govuk-header-and-footer) in the service manual

## HMRC Header

There are 2 versions of this header one that is used when a user is not signed in to a service and one that is used when a user is signed in to a service. We do not have a signed out version of the header.

### Header

Use this:

* in services that do not require users to authenticate
* when a user is not signed in to a service
* when it's important to users that they know they are using an HMRC service

<div class="example">
  <div class="scale-wrapper">
    <div class="scale">{% include "header.html" %}</div>
  </div>
</div>

[View in a new window](blank/header.html)

The link to the cookie policy should go to the [HMRC cookie policy](#) information on adding service spesific cookie information should be added to your services *where should services add cookies that are service spesific?*

This version of the header should contain:

* the GOV.UK header
* a phase banner unless the service is live
* HMRC logo
* Welsh toggle

---

### Header signed in

<div class="example">
  <div class="scale-wrapper">
    <div class="scale">{% include "header--signed-in.html" %}</div>
  </div>
</div>

[View in a new window](header--signed-in.html)

Should be used for services when there is a need to identify the service as an HMRC service and when users can have a signed in state.

This version of the header should contain:

* the GOV.UK header
* a sign out link
* a phase banner unless the service is live
* HMRC logo
* Last logged in status
* Welsh toggle
