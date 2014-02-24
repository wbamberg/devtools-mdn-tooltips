This add-on adds tooltips to the names of CSS properties in the [Inspector's Rules view](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector#Rules_view).

It's strictly a proof of concept/demo and isn't good code or production-ready or anything like that. But it should work well enough for you to see what this feature could look like in the Firefox devtools.

To use it, you can just download the built add-on "mdn-tooltips.xpi", in this directory, and open it in Firefox. Because of the horrible stuff it does to get access to examples for the properties, it takes a few seconds to initialize when it starts up.

Then open the Inspector, and move the mouse over a CSS property name in the Rules view. You should see the tooltip.