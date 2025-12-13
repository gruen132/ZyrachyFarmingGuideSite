# Discord Access Code Instructions

## Overview
The Night Method section on tactics.html now requires users to complete a quiz and enter an access code obtained from Discord. This is a temporary solution until the website is fully completed.

## Current Access Code
The current access code is: **NIGHTOPS2025** (case-insensitive)

## How to Change the Access Code

### Step 1: Generate a new code
Choose a new access code. It can be any text string (letters, numbers, or a combination).

### Step 2: Generate the SHA-256 hash
Run the following command in your terminal (Linux/Mac) to generate the hash:

```bash
echo -n "yournewcode" | sha256sum
```

Replace `yournewcode` with your actual code. **Important:** The code you enter here should be in lowercase because the system automatically converts all codes to lowercase before hashing for case-insensitive comparison.

**Example:**
```bash
echo -n "nightops2025" | sha256sum
# Output: f5934e1ff34d352bf67df7661cd57e8a2bb09d97fb2abb6f7b3d2d7d322da0d9
```

For Windows (PowerShell):
```powershell
$text = "yournewcode"
$bytes = [System.Text.Encoding]::UTF8.GetBytes($text.ToLower())
$hash = [System.Security.Cryptography.SHA256]::Create().ComputeHash($bytes)
$hashString = -join ($hash | ForEach-Object { $_.ToString("x2") })
$hashString
```

### Step 3: Update tactics.html
1. Open `pages/tactics.html`
2. Find the line with `answerHash:` (around line 1432)
3. Replace the existing hash with your new hash:

```javascript
answerHash: 'your-new-hash-here'
```

### Step 4: Test the new code
1. Save the file
2. Open the tactics page in a browser
3. Navigate to the Night Method section
4. Complete the quiz through the minefield
5. Enter your new code to verify it works

### Step 5: Distribute via Discord
Share the new access code with users via Discord direct messages when they contact you.

## Security Notes
- The code is case-insensitive (converted to lowercase before hashing)
- Users cannot see the actual code by inspecting the source (only the hash is visible)
- **Security Trade-off:** Determined users could potentially brute-force the hash since it's client-side. This solution protects against casual F12 users but not against sophisticated attacks.
- **Recommendations for better security:**
  - Use complex, long codes (e.g., "NightOps2025-Alpha-Secure-7X9K")
  - Rotate the code regularly (weekly/monthly)
  - Consider this a temporary gatekeeping mechanism, not production security
- You can rotate the code periodically for additional security
- This is a temporary solution - consider implementing server-side validation for production
- Requires HTTPS or localhost for Web Crypto API to function

## Troubleshooting

### Code not working after update
- Make sure you generated the hash from the lowercase version of the code
- Verify there are no extra spaces or newlines in the code when generating the hash
- Clear browser cache and reload the page

### Users reporting issues
- Verify they're entering the code exactly as you provided
- Remind them the code is case-insensitive
- Check that they've completed all previous quiz questions successfully
