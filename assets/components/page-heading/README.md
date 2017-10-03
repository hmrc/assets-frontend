# Accessible page heading

The current design pattern seems like it could be built a little better.
The page title reads "Contacting you — GOV.UK elements",
which isn't how the `h1` reads. Having a `span` in the `h1` gives
differing results, depending on the assistive technology used.

This new version splits the page name (`h1`) and the section name (`p`) –
which are now in the correct source order – and then positions the section
name above with CSS. This keeps the pattern visually identical, but brings
added accessibility wins.

The user can skip to the first header and they'll hear _just_ the page header. If they then key through the page, they'll hear which section they're in.
