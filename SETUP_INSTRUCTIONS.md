# FarmLogic — Build Instructions
## Turn FarmLogic into a Windows .exe

---

## STEP 1 — Install Node.js
1. Go to https://nodejs.org
2. Download the LTS version (left green button)
3. Run installer, click Next through everything
4. Open Command Prompt and confirm it worked:
   node --version
   (Should show something like v20.11.0)

---

## STEP 2 — Copy your project files
1. Create a folder:  C:\FarmLogic
2. Copy ALL files from this zip into C:\FarmLogic
   Your folder structure must look like this:

   C:\FarmLogic\
   ├── package.json
   ├── electron\
   │   └── main.js
   ├── public\
   │   └── index.html
   └── src\
       ├── index.js
       └── App.jsx

---

## STEP 3 — Install dependencies
Open Command Prompt and run:

   cd C:\FarmLogic
   npm install

This downloads all required packages. Takes 2-5 minutes.
You will see a lot of text scrolling — this is normal.
Wait until you see the cursor again.

---

## STEP 4 — Test it runs (optional but recommended)
Run this to open FarmLogic in development mode:

   npm run electron-dev

A window should open showing FarmLogic.
Login with:  admin / farmlogic
If it works, close it and move to Step 5.

---

## STEP 5 — Build the .exe installer
Run this command:

   npm run package-win

This takes 3-10 minutes. It will:
- Build the React app
- Package it with Electron
- Create an installer

When done you will see:
   C:\FarmLogic\dist\FarmLogic Setup 1.0.0.exe

---

## STEP 6 — Install and run
1. Go to C:\FarmLogic\dist\
2. Double-click "FarmLogic Setup 1.0.0.exe"
3. Click through the installer (you can choose install location)
4. FarmLogic will appear on your Desktop and Start Menu
5. Double-click to open — login with admin / farmlogic

---

## TROUBLESHOOTING

Problem: "npm is not recognized"
Solution: Restart Command Prompt after installing Node.js

Problem: npm install fails with errors
Solution: Run this first:  npm install --legacy-peer-deps

Problem: "electron-builder" error during package-win
Solution: Run:  npm install electron-builder --save-dev --legacy-peer-deps
           Then try:  npm run package-win  again

Problem: White screen when app opens
Solution: Wait 5-10 seconds, the app is loading.
          If still blank, close and reopen.

Problem: App opens but shows blank page in built version
Solution: In electron/main.js the loadFile path is correct.
          Make sure the build folder exists after running npm run build.

---

## CHANGING THE PASSWORD
Currently login is:  admin / farmlogic
To change it, open src/App.jsx
Find this line:
   if(u==="admin"&&p==="farmlogic")onLogin();
Change "admin" and "farmlogic" to whatever you want.
Then rebuild with:  npm run package-win

---

## SHARING WITH OTHER FARMERS
Once you have the .exe installer file:
- Copy "FarmLogic Setup 1.0.0.exe" to a USB drive
- Install on any Windows PC
- No internet required, no extra software needed
- Each PC stores its own data locally

---

## CREATING AN APP ICON (optional)
1. Create a 256x256 PNG image of your logo
2. Convert it to .ico format at https://convertio.co/png-ico/
3. Save it as:  C:\FarmLogic\public\icon.ico
4. Rebuild with npm run package-win

