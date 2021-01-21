---
layout: page
---

#### [ greetings ]

sup, this is my website.  it's built on [jekyll](https://jekyllrb.com), with javascript built via webpack and stuffed into jekyll assets.  aside from layouts and styles, everything is just markdown, and each markdown file gets a page -- including this readme. 

#### [ nifty bits ] 
to prove my credentials a **l33t hax0r**&#8482;, the site follows a loose terminal/shell theme with uncomfortable light on dark text. the cute little login sequence pretends that you've `ssh`-ed into a remote host and then install some mumbo jumbo and run it.  lowercase just for the aesthetic, and to scare away boomers.

#### [ less ] 
to keep with the terminal/shell theme, text pages are printed sorta like they would be if dumped to the terminal via the unix `less` utility.  mostly this just means that there's a little indicator in the bottom left that shows a colon when there is content remaining to scroll, and `(EOF)` when scrolled to the bottom. better still, `j` and `k` can be used to control the scroll position of the central content, once again à la `less`.

#### [ hacks ] 

the homepage is named with a tilde to keep with the whole shell theme, but this creates some
(maybe predictable) challenges.  it seems that jekyll doesn't like it if pages are named with
`~`, nor can i use `/~` as a permalink on a page with a different name.  but i'm determined
and stubborn, so using the magic of unicode we fake it with the similar-enough "full-width tilde" 
character: `～`. then we use this character both to name the page's markdown file and the permalink in 
its frontmatter.  as a last spicy complication, the jekyll `relative_url` filter seems to replace
`～` with `~`, so in a risky bet, we just skip this filter when generating the nav bar (in `_includes/header.html`) and voilà.  of course no one could ever be expected to type the correct tilde, so with a tricky little bit of javascript served on the 404 page, we rewrite any url starting with `~` to its equivalent using the jekyll-supported `～`.  this was a massive pain in the ass.
