with open('src/PointsAway.jsx') as f:
    content = f.read()

# Find the Tracker sidebar display logic
idx = content.find('function Tracker({')
block = content[idx:idx+2000]

# Find display property of sidebar
import re
displays = re.findall(r'display:[^,}]+', block)
print("Display values in Tracker:")
for d in displays[:10]:
    print(" ", d)
