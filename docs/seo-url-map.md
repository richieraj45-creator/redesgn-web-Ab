# Verified legacy URL mapping

This map covers the legacy About and Blog URLs verified during this update. It is not a full legacy URL inventory; the complete Search Console and sitemap exports still need to be checked before launch.

| Legacy path | New destination | Handling |
| --- | --- | --- |
| `/about-us/` | `/about` | Permanent redirect |
| `/blog/` | `/blogs` | Permanent redirect |
| `/why-askaran-binjraj-is-one-of-the-best-shopping-malls-in-assam/` | `/best-shopping-mall-in-assam/` | Permanent redirect to the retained priority landing page |
| `/why-askaran-binjraj-is-dhekiajulis-favourite-family-shopping-destination/` | `/blogs/a-family-shopping-destination-in-assam` | Permanent redirect |
| `/winter-ethnic-wear-guide-askaran-binjraj/` | `/blogs/winter-ethnic-wear-guide-askaran-binjraj` | Permanent redirect |
| `/best-shopping-mall-in-assam/` | Same path | Retained as a dedicated landing page; no redirect |
| `/shipping-policy/` | `/shipping-policy` | Existing path retained without the trailing slash |
| `/exchange-policy/` | `/exchange-policy` | Existing path retained without the trailing slash |

The redirects live in `vercel.json`. Add the remaining legacy URLs only after validating them against the old sitemap or Search Console exports.
