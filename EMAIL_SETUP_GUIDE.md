# 📧 Contact Form — Email Setup Guide

Your contact form is wired up and ready. You just need to plug in credentials
for **one** of the two methods below. Both are free.

---

## ✅ METHOD 1 — EmailJS (Recommended)

EmailJS lets your React app send emails directly without any backend server.
**Free plan: 200 emails/month.**

### Step 1 — Create an EmailJS account
1. Go to → https://www.emailjs.com/
2. Click **Sign Up** → sign up with your Google account (harshitaverma0526@gmail.com)

### Step 2 — Add an Email Service
1. In the EmailJS dashboard, go to **Email Services** → **Add New Service**
2. Choose **Gmail**
3. Click **Connect Account** → authorize your Gmail
4. Give it a name (e.g. `portfolio_gmail`)
5. Click **Create Service**
6. Copy the **Service ID** (looks like `service_abc1234`) → you'll need this

### Step 3 — Create an Email Template
1. Go to **Email Templates** → **Create New Template**
2. Set the template like this:

   **To:** `harshitaverma0526@gmail.com`  
   **From:** `{{from_name}} <{{from_email}}>`  
   **Reply To:** `{{reply_to}}`  
   **Subject:** `{{subject}}`  
   **Body:**
   ```
   You have a new message from your portfolio!

   Name:    {{from_name}}
   Email:   {{from_email}}
   Subject: {{subject}}

   Message:
   {{message}}
   ```
3. Click **Save**
4. Copy the **Template ID** (looks like `template_xyz5678`) → you'll need this

### Step 4 — Get your Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (looks like `abcDEFghiJKLmnop`) → you'll need this

### Step 5 — Plug the values into Contact.jsx
Open `src/pages/Contact.jsx` and replace lines 13–15:

```js
const EMAILJS_SERVICE_ID  = 'service_abc1234';   // ← your Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz5678';  // ← your Template ID
const EMAILJS_PUBLIC_KEY  = 'abcDEFghiJKLmnop';  // ← your Public Key
```

Also make sure line 10 says:
```js
const SEND_METHOD = 'emailjs';
```

### Step 6 — Done! Redeploy
```bash
npm run build
vercel --prod
```

---

## ✅ METHOD 2 — Formspree (Simplest)

Formspree receives your form submissions and forwards them to your email.
**Free plan: 50 submissions/month.**

### Step 1 — Create a Formspree account
1. Go to → https://formspree.io/
2. Sign up with your email (harshitaverma0526@gmail.com)

### Step 2 — Create a new form
1. Click **+ New Form**
2. Name it `Portfolio Contact`
3. Set **Email** to `harshitaverma0526@gmail.com`
4. Click **Create Form**
5. You'll see an endpoint like:
   ```
   https://formspree.io/f/xpwzabcd
   ```
   Copy this URL.

### Step 3 — Verify your email
Formspree will send a verification email to harshitaverma0526@gmail.com — click the link.

### Step 4 — Plug into Contact.jsx
Open `src/pages/Contact.jsx` and:

1. Change line 10 to:
   ```js
   const SEND_METHOD = 'formspree';
   ```
2. Replace line 18:
   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpwzabcd'; // ← your endpoint
   ```

### Step 5 — Done! Redeploy
```bash
npm run build
vercel --prod
```

---

## 🔒 Hiding credentials with .env (Optional but recommended)

To keep your keys out of the source code, use environment variables:

1. Create a file called `.env` in the root of your project:
   ```
   REACT_APP_EMAILJS_SERVICE_ID=service_abc1234
   REACT_APP_EMAILJS_TEMPLATE_ID=template_xyz5678
   REACT_APP_EMAILJS_PUBLIC_KEY=abcDEFghiJKLmnop
   REACT_APP_FORMSPREE_ENDPOINT=https://formspree.io/f/xpwzabcd
   ```

2. Update `Contact.jsx` lines 13–18 to:
   ```js
   const EMAILJS_SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID;
   const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
   const EMAILJS_PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
   const FORMSPREE_ENDPOINT  = process.env.REACT_APP_FORMSPREE_ENDPOINT;
   ```

3. Add `.env` to your `.gitignore` so it's never pushed to GitHub:
   ```
   .env
   ```

4. If deploying to **Vercel**, add the same variables in:
   Vercel Dashboard → Your Project → Settings → **Environment Variables**

---

## 🧪 Testing

After setup, fill in your contact form and submit.
- Check `harshitaverma0526@gmail.com` for the email (check Spam/Promotions too the first time)
- EmailJS also shows logs in its dashboard under **Email Logs**
- Formspree shows submissions in its dashboard under your form

---

## 📌 Summary

| Feature | EmailJS | Formspree |
|---|---|---|
| Free emails/month | 200 | 50 |
| Setup time | ~10 min | ~5 min |
| Backend needed | No | No |
| Custom template | Yes (full control) | Basic |
| Spam protection | Yes | Yes |
| Recommended for | Most users | Quick setup |
