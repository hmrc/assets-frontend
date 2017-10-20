# 404 page

404 pages (usually described as a 'page not found') tell users that the page they were trying to access is not there.

Processes and systems should be put in place to prevent users encountering 404 pages in the first place.

## Why users see 404 pages

There are three main reasons users encounter a 404 page:

1. they followed a link (URL) that is broken or pointing to the wrong location
2. they followed an old link or a link that has expired
3. they typed or copied a link incorrectly
4. 404 page design

As with all error messages, we should reassure users that their progress has been saved and then help them to fix the error.

## Broken links or moved pages

There are a few possible reasons why this may happen:

- if a user clicked a broken link
- if a user bookmarked a page and the page has been moved or removed

## Broken links

Testing should catch errors like this but because of the often disjointed nature of the services we build 100% coverage may not always be possible.

If a user has clicked a broken link, we will - in most cases - know this because the referring URL of the page will be from within a GOV.UK domain or other domain that we control. 404 errors should be logged and fixed as soon as possible.

In this situation, we can tell users that we are aware of the problem and are working to resolve it.

### Example 404 page telling users that we know about the problem

{{ example("404-page.html", scaled=true) }}
{{ markup("404-page.html") }}
