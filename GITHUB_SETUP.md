# FarmLogic — GitHub Setup Guide
## For: dex4548 (Janwillem van Zyl)

---

## STEP 1 — Install GitHub Desktop
1. Go to: https://desktop.github.com
2. Download and install it
3. Sign in with your GitHub account (dex4548)

---

## STEP 2 — Create the repository on GitHub
1. Go to: https://github.com/new
2. Repository name: farmlogic
3. Set to PRIVATE (your code stays hidden)
4. Click "Create repository"

---

## STEP 3 — Upload your files using GitHub Desktop
1. Open GitHub Desktop
2. Click "Add an Existing Repository from your Hard Drive"
3. Choose C:\FarmLogic
4. Click "create a repository" if it asks
5. You will see all your files listed
6. In the bottom left, type "First upload" in the Summary box
7. Click "Commit to main"
8. Click "Publish repository"
9. Make sure "Keep this code private" is TICKED
10. Click "Publish Repository"

Your code is now safely on GitHub, private and protected.

---

## STEP 4 — Create a GitHub Token (needed for releases)
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: FarmLogic Release
4. Tick these boxes:
   - repo (tick the main box, all sub-boxes tick automatically)
5. Scroll down and click "Generate token"
6. COPY THE TOKEN immediately — you only see it once
7. Save it somewhere safe (notepad, phone notes)

---

## STEP 5 — Add the token to your repository
1. Go to: https://github.com/dex4548/farmlogic/settings/secrets/actions
2. Click "New repository secret"
3. Name: GH_TOKEN
4. Value: paste your token from Step 4
5. Click "Add secret"

---

## STEP 6 — Publish your first release (creates the download link)
Every time you want to release a new version:

1. In Command Prompt:
   cd C:\FarmLogic
   npm run build
   npx electron-builder --win --publish always

   This builds the .exe AND uploads it to GitHub automatically.

2. Go to: https://github.com/dex4548/farmlogic/releases
3. You will see a draft release — click "Edit"
4. Add release notes (e.g. "Version 1.0 - First release")
5. Click "Publish release"

Your download link is now:
https://github.com/dex4548/farmlogic/releases/latest

---

## HOW AUTO-UPDATE WORKS

When you publish a new release:
1. Every installed FarmLogic checks GitHub on startup
2. If a newer version exists it shows:
   "Version X.X available — Download Update?"
3. User clicks Download — it downloads in background
4. Next restart it installs automatically
5. Windows and Mac both update the same way

---

## HOW TO UPDATE THE APP IN FUTURE

Every time you make changes:
1. Replace C:\FarmLogic\src\App.jsx with the new file
2. Update the version number in package.json
   (change "version": "1.0.0" to "version": "1.1.0" etc.)
3. Open Command Prompt:
   cd C:\FarmLogic
   rd /s /q build
   rd /s /q dist
   npm run build
   npx electron-builder --win --publish always
4. Go to GitHub releases and publish the new release
5. All users get notified automatically

VERSION NUMBERING:
- Small fixes: 1.0.0 → 1.0.1
- New features: 1.0.0 → 1.1.0
- Major update: 1.0.0 → 2.0.0

---

## YOUR DOWNLOAD PAGE

Once you publish your first release, share this link:
https://github.com/dex4548/farmlogic/releases/latest

Windows users: download FarmLogic.Setup.X.X.X.exe
Mac users: download FarmLogic-X.X.X.dmg

---

## IS YOUR WORK PROTECTED?

YES. Three layers of protection:
1. LICENSE file — legally states all rights reserved, Janwillem van Zyl
2. Private repository — code is hidden from the public
3. Only the installer (.exe/.dmg) is public — not the source code

Anyone who steals and resells your app is breaking copyright law.

---

## QUESTIONS?
If you get stuck on any step, come back and ask for help.
