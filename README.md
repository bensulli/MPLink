
# MPLink
Allow visitors to email their MP just by entering their postal code. Uses open data from OpenNorth.ca. **Huge** thanks to the OpenNorth.ca project for making all this data openly available and making it easier for Canadians to make their voices heard in Parliament.

# Usage
This script and HTML will work as-is on your own website if you host the mpLink.js and update the HTML to point to your own hosted script.

However, if you'd like to use this script without hosting the js file, you can simply paste the contents of mpLink.js (not mpLink.ts) instead of loading the mpLink.js source. To do so, replace the line `<script src="mpLink.js" type="text/javascript"></script>` with `<script> [PASTE ENTIRE mpLink.js HERE] </script>`.

# Caveats
This was my first JavaScript project! I'm sure it doesn't follow best practices because I haven't learned them yet. Please feel free to submit PRs.

# To Do
I'd like to expand this to allow searching for MLAs and providing more details like phone/fax numbers.

# Demo
You can find a working version of this code at https://climatemessengers.ca/contact-your-mp/, which I originally created it for.
