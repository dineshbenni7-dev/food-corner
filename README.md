# Food Corner — Food Ordering Website

A responsive, premium-style static website starter for **Food Corner**. It includes a menu, search and filters, cart, checkout form, and WhatsApp order-message flow.

## Run it locally
1. Download and extract `food-corner-website.zip`.
2. Open `index.html` in a browser. For the best experience, use a local static server or deploy it to GitHub Pages.

## Important: configure your real business details
Open `app.js` and check the top:
```js
const BUSINESS_NAME = "Food Corner";
const BUSINESS_WHATSAPP = "916281807448";
```
The WhatsApp number is configured as India country code `91` + `6281807448`. Confirm this is the WhatsApp number for the business. Use digits only: country code plus full number, with no `+`, spaces, or dashes.

## Before you publish
- Replace the sample dishes, prices, descriptions and images in the `menu` array in `app.js`.
- Check every dish photo and make sure you have permission to use the image.
- Add your actual delivery area, minimum order, delivery fee, opening hours, and return/cancellation policy.
- Test an order from a different phone before sharing the site.
- Do not add real payment details or collect sensitive information unless you have an appropriate secure service.

## How order notifications work in this free starter
1. The customer adds dishes and enters contact and delivery details.
2. The website opens WhatsApp with the order details pre-filled to the configured business number.
3. The customer must press **Send** in WhatsApp.
4. The order arrives in your business WhatsApp chat, which you can manage on your phone.

**This does not send an automatic notification in the background.** A static website cannot securely deliver reliable server-side notifications by itself, and a WhatsApp message link requires the customer to press Send.

## Free hosting with GitHub Pages
1. Create a GitHub repository, for example `food-corner`.
2. Upload `index.html`, `styles.css`, `app.js`, and `README.md` to the repository root.
3. In the repository, open **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/(root)`, then Save.
5. Wait for GitHub Pages to publish the site. The address will be similar to `https://YOUR-USERNAME.github.io/food-corner/`.
6. Open the published site on a phone and test the full checkout flow.

GitHub Pages can host the static website at no charge under its current free offering, subject to GitHub's terms and limits.

## If you want automatic notifications later
For automatic alerts without the customer pressing Send, connect a backend/database and notification provider. Common options include:
- **Supabase or Firebase:** store orders and power a private admin order dashboard. Free tiers have quotas and can change.
- **Email notification provider:** send a message from a server-side function; free quotas/eligibility vary.
- **WhatsApp Business Platform / Cloud API:** can automate WhatsApp messages, but requires business setup, approved templates in relevant cases, and may incur provider or Meta charges. Never put API tokens or secret keys in `app.js` or any public GitHub repository.

A secure automated version requires backend configuration and credentials. Do not publish secrets in this static project.

## Project files
- `index.html` — page structure and checkout UI
- `styles.css` — responsive premium design
- `app.js` — sample menu, search, cart, checkout and WhatsApp handoff
