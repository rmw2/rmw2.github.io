# robwhit.sh



## Hacks

### the gd tilde
The homepage is named with a tilde to keep with the whole shell theme, but this creates some
(maybe predictable) challenges.  It seems that jekyll doesn't like it if pages are named with
"~", nor can we use "/~" as a permalink on a page with a different name.  But we are determined
and stubborn, so we found a neat workaround where we use the "full-width tilde" character, "～".
We use this character both to name the page's markdown file and the permalink in its frontmatter.
As a last spicy complication, the jekyll `relative_url` filter seems to replace "～" with "~", so
in a risky bet, we omit this filter when generating the nav bar (in `_includes/header.html`).
