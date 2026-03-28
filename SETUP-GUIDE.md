# Dalrymple Silicon Valley Properties
## Step-by-Step Guide: From Files to Live Website

---

## WHAT YOU HAVE

Three files that make up the entire website:

| File       | What it does                                      |
|------------|---------------------------------------------------|
| index.html | The structure — all the sections and content      |
| style.css  | All the colors, fonts, and layout                 |
| main.js    | Animations, the listings data, contact form logic |

---

## STEP 1 — Install the Tools (one-time setup)

### 1a. Install Visual Studio Code
1. Go to https://code.visualstudio.com
2. Click **Download for Mac** (or Windows/Linux)
3. Open the downloaded file and drag VS Code to your Applications folder
4. Open VS Code

### 1b. Install the "Live Server" extension
1. In VS Code, click the **Extensions** icon in the left sidebar (looks like 4 squares)
2. In the search bar, type: `Live Server`
3. Click the one by **Ritwick Dey** (it has millions of downloads)
4. Click **Install**

---

## STEP 2 — Open the Project in VS Code

1. Open VS Code
2. Go to **File → Open Folder**
3. Navigate to the `dalrymple-site` folder you downloaded
4. Click **Open**
5. You'll see the three files in the left sidebar:
   - `index.html`
   - `style.css`
   - `main.js`

---

## STEP 3 — Preview the Site Locally

1. Right-click on `index.html` in the left sidebar
2. Select **"Open with Live Server"**
3. Your browser will open automatically at `http://127.0.0.1:5500`
4. You'll see the full Dalrymple website! 🎉

> **Tip:** Any time you save a file (Ctrl+S / Cmd+S), the browser
> refreshes automatically so you see your changes instantly.

---

## STEP 4 — Customize the Content

### Change the Agent Names / Bio Text
Open `index.html` and find the About section (search for `id="about"`).
Edit the text inside the `<p class="about-body">` tags.

### Update the Listings
Open `main.js`. At the top you'll see a `listings` array like this:

```js
const listings = [
  {
    tag: 'Featured',
    address: '4821 Orchard Hill',
    city: 'Palo Alto, CA',
    price: '$4,850,000',
    beds: 5, baths: 4.5, sqft: '4,200',
    bgClass: 'bg-a',
  },
  ...
];
```

Edit the values to match real properties. To add more, copy one block
and paste it inside the array, separated by a comma.

### Update Testimonials
In `main.js`, find the `testimonials` array and edit the `text` and
`author` fields with real client reviews.

### Update the Stats Bar
In `index.html`, find the `stats-bar` section and change the numbers
and labels to match real stats.

---

## STEP 5 — Add Real Photos

### Hero Photo (big background image)
1. Create an `images` folder inside `dalrymple-site`
2. Add your photo as `images/hero.jpg`
3. Open `style.css`, find the comment that says:
   ```css
   /* .hero-img-main { background-image: url('images/hero.jpg'); ... } */
   ```
4. Remove the `/*` and `*/` to uncomment that line
5. Delete or comment out the line above it (the gradient background)

### Team Photo
1. Add your photo as `images/team-photo.jpg`
2. Open `index.html`, find the About section
3. Replace these two lines:
   ```html
   <div class="portrait-mono">B&A</div>
   <div class="portrait-lbl">Add your photo here</div>
   ```
   With:
   ```html
   <img src="images/team-photo.jpg" alt="Brianna and Albert Dalrymple" />
   ```

### Listing Photos
1. Add photos as `images/listing-1.jpg`, `images/listing-2.jpg`, etc.
2. In `main.js`, in each listing object, uncomment the `image:` line:
   ```js
   image: 'images/listing-1.jpg'
   ```

---

## STEP 6 — Connect the Contact Form (so emails actually arrive)

The form is ready — it just needs a free service to send the emails.
The easiest option is **Formspree** (free, no server needed):

1. Go to https://formspree.io and create a free account
2. Create a new form and copy your Form ID (looks like `xpzgkwqr`)
3. Open `main.js` and find the comment block that says:
   ```
   // TO CONNECT A REAL BACKEND:
   // Replace the simulated response below with:
   //   fetch('https://formspree.io/f/YOUR_ID', { ...
   ```
4. Follow the instructions in that comment — replace `YOUR_ID` with
   your actual Formspree ID
5. Delete the "simulated success" block below it

---

## STEP 7 — Make It Live on the Internet

The easiest and **free** way to host this site is **Netlify Drop**:

### Option A — Netlify Drop (simplest, free, 5 minutes)
1. Go to https://app.netlify.com/drop
2. Drag and drop your entire `dalrymple-site` folder onto the page
3. Netlify gives you a live URL like `https://amazing-turing-12345.netlify.app`
4. Share that link — the site is live!

### Option B — Netlify with a Custom Domain (e.g. siliconvalleyproperty4sale.com)
1. Sign up at https://netlify.com (free)
2. Click **"Add new site" → "Deploy manually"**
3. Drag and drop your `dalrymple-site` folder
4. Once deployed, click **"Domain settings"**
5. Click **"Add custom domain"** and enter `siliconvalleyproperty4sale.com`
6. Netlify will walk you through pointing your domain's DNS to them
   (usually takes 10-30 minutes to go live)

### Option C — GitHub + Netlify (best for ongoing updates)
This lets you push updates from VS Code directly to the live site.
1. Install Git: https://git-scm.com/downloads
2. In VS Code, open the Terminal (View → Terminal) and run:
   ```
   git init
   git add .
   git commit -m "Initial site"
   ```
3. Create a free GitHub account at https://github.com
4. Create a new repository and follow GitHub's instructions to push
5. Connect the GitHub repo to Netlify — every time you push changes,
   the live site updates automatically

---

## STEP 8 — Update Your Site Later

Whenever Brianna wants to change listings, prices, or text:
1. Open the `dalrymple-site` folder in VS Code
2. Edit `main.js` (for listings/testimonials) or `index.html` (for text)
3. Save the file
4. If using Netlify Drop: drag the folder again to redeploy
5. If using GitHub: commit and push — the site updates in ~30 seconds

---

## QUICK REFERENCE — Most Common Edits

| What to change       | Open this file | Search for this          |
|----------------------|---------------|--------------------------|
| Agent names/bio      | index.html    | `id="about"`             |
| Listing properties   | main.js       | `const listings`         |
| Testimonials         | main.js       | `const testimonials`     |
| Stats bar numbers    | index.html    | `class="stats-bar"`      |
| Nav links            | index.html    | `id="navLinks"`          |
| Phone / email info   | index.html    | `id="contact"`           |
| Colors               | style.css     | `:root {`                |
| Fonts                | style.css     | `--font-serif`           |

---

## NEED HELP?

- VS Code docs: https://code.visualstudio.com/docs
- Netlify docs: https://docs.netlify.com
- Formspree docs: https://help.formspree.io

Good luck, Brianna! 🏡
