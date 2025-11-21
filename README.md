# MealTracker PWA 🔥

A Progressive Web App for tracking meals with visual feedback, built with React.

## ✨ Features

- ✅ **GitHub-Style Grid** - Visual meal history with color-coded squares
- ✅ **Streak System** - Flame icon that gets hotter as you log more meals
- ✅ **Quick Logging** - Floating action button for instant meal entry
- ✅ **Day Details** - Tap any day to see all meals with timestamps
- ✅ **Edit & Delete** - Modify or remove meal entries
- ✅ **Offline Support** - Works without internet connection
- ✅ **Installable** - Add to home screen like a native app
- ✅ **Local Storage** - All data saved on your device

## 🚀 Quick Start

### Option 1: Open Directly (Simplest)

1. Extract the files to a folder
2. **Double-click `index.html`** 
3. It will open in your browser - done! 🎉

> Note: Some browsers may restrict service workers when opening files directly. For full PWA features, use Option 2.

### Option 2: Use a Local Server (Recommended for Testing PWA Features)

#### Using Python (if installed):
```bash
# Navigate to the folder
cd MealTrackerPWA

# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

#### Using Node.js (if installed):
```bash
# Install http-server globally (one time)
npm install -g http-server

# Run server
cd MealTrackerPWA
http-server

# Then open: http://localhost:8080
```

#### Using VS Code:
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## 📱 Installing on Your iPhone

### Method 1: Test Locally First
1. Open the app in Safari on your Mac
2. Use your iPhone as a personal hotspot
3. Find your Mac's local IP (System Preferences → Network)
4. On iPhone Safari, visit `http://[YOUR_MAC_IP]:8000`
5. Tap Share → Add to Home Screen

### Method 2: Deploy Online (Best Experience)
See "Deployment" section below

## 🌐 Deployment Options

### Option A: GitHub Pages (Free & Easy)
1. Create a GitHub account (if needed)
2. Create a new repository
3. Upload all files
4. Go to Settings → Pages
5. Enable GitHub Pages
6. Your app will be at: `https://[username].github.io/[repo-name]`

### Option B: Netlify (Free, Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Sign up (free)
3. Drag and drop your MealTrackerPWA folder
4. Get instant URL like: `https://mealtracker-xyz.netlify.app`
5. Share or open on your iPhone!

### Option C: Vercel (Free, Fast)
1. Go to [vercel.com](https://vercel.com)
2. Sign up (free)
3. Import your project
4. Deploy with one click

## 📲 Using as an App on iPhone

Once deployed online:

1. **Open in Safari** (must be Safari, not Chrome)
2. Tap the **Share button** (square with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Name it "MealTracker"
5. Tap **"Add"**

Now you have a native-like app icon on your home screen! 🎉

## 🎨 Project Structure

```
MealTrackerPWA/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── app.jsx             # React application code
├── manifest.json       # PWA configuration
├── sw.js              # Service worker for offline support
├── icon-192.png.txt   # Icon placeholder (replace with real icon)
└── icon-512.png.txt   # Icon placeholder (replace with real icon)
```

## 🎯 How to Use

### Logging a Meal
1. Tap the blue **+** button (bottom-right)
2. Choose: Good (green), Neutral (yellow), or Bad (red)
3. Optionally add notes
4. Tap "Log Meal"

### Viewing Day Details
1. Tap any day header (e.g., "M 11/19")
2. See all meals with times and notes
3. Edit or delete meals

### Understanding Your Streak
- 🔥 Flame starts orange
- 🔥 Gets brighter with 10+ meals
- 🔥 Turns fiery orange-red at 25+ meals
- 🔥 Glows golden at 50+ meals

## 🎨 Customization

### Changing Colors
Edit `styles.css` and look for these variables:
```css
:root {
    --color-good: #4CAF50;      /* Green */
    --color-neutral: #FFC107;   /* Yellow */
    --color-bad: #F44336;       /* Red */
}
```

### Creating Custom Icons
1. Use a tool like [Favicon Generator](https://favicon.io/)
2. Create 192x192 and 512x512 PNG files
3. Name them `icon-192.png` and `icon-512.png`
4. Replace the placeholder files
5. Suggested design: Flame emoji or orange/red gradient

## 🔧 Technical Details

- **Framework**: React 18 (via CDN)
- **Storage**: LocalStorage API
- **Offline**: Service Worker
- **Installable**: Web App Manifest
- **No Build Step**: Runs directly in browser
- **Mobile-First**: Optimized for iPhone

## 📊 Data Storage

- All data stored locally in your browser
- Persists across sessions
- No server/database needed
- Private and secure (never leaves your device)

## 🔄 Updating the App

If you make changes:
1. Clear your browser cache
2. Unregister the service worker:
   - Open DevTools (F12)
   - Application tab → Service Workers
   - Click "Unregister"
3. Refresh the page

On iPhone:
1. Delete the app from home screen
2. Clear Safari cache
3. Revisit the URL and re-add to home screen

## ⚡ Performance Tips

- Works best in modern browsers (Chrome, Safari, Firefox)
- Safari on iOS required for "Add to Home Screen"
- Smooth scrolling optimized for touch devices
- Data loads instantly (all local)

## 🐛 Troubleshooting

**Grid not showing?**
- Check browser console for errors (F12)
- Ensure all files are in same folder
- Try a different browser

**Can't add to home screen?**
- Must use Safari on iOS
- Must be served over HTTPS (or localhost)
- Check that manifest.json is loading

**Data not saving?**
- Check browser doesn't block localStorage
- Try incognito/private mode to test
- Some browsers limit storage in file:// protocol

**Streak not increasing?**
- Streak counts total meals logged
- Make sure meals are saving (check day detail view)

## 🚀 Future Enhancements

Want to add more features? Consider:
- [ ] Achievement badges
- [ ] Weekly/monthly stats
- [ ] Export data to CSV
- [ ] Dark mode
- [ ] Custom meal categories
- [ ] Photo attachments
- [ ] Sync across devices (would need backend)

## 📱 Browser Compatibility

- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Safari (Desktop & iOS)
- ✅ Firefox (Desktop & Mobile)
- ⚠️ Internet Explorer (Not supported)

## 🎉 You're All Set!

Your MealTracker PWA is ready to use! Start logging meals and building your streak. 

Questions or want to add features? Just ask! 🔥

---

Built with React | No build tools required | Works offline
