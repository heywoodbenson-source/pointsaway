with open('src/PointsAway.jsx') as f:
    content = f.read()

import re

# Fix 1: Tracker sidebar - must hide when showDetail is true on mobile
old1 = re.search(r'<div style=\{\{width:isMobile\?"100%":250[^\n]+\n', content)
if old1:
    new1 = '<div style={{width:isMobile?"100%":250,background:"#0a160b",borderRight:isMobile?"none":`1px solid ${BORDER}`,display:isMobile&&showDetail?"none":"flex",flexDirection:"column",overflowY:"auto",flexShrink:0,flex:isMobile?"1":"0 0 250px"}}>\n'
    content = content[:old1.start()] + new1 + content[old1.end():]
    print("Tracker sidebar: fixed")
else:
    print("Tracker sidebar: NOT FOUND")

# Fix 2: Tracker detail - position absolute overlay
old2 = re.search(r'<div style=\{\{[^}]*overflowY:"auto"[^}]*padding:isMobile\?"[^"]*":"22px 26px"[^\n]+\n', content)
if old2:
    new2 = '<div style={{position:isMobile?"absolute":"relative",top:0,left:0,right:0,bottom:0,flex:1,overflowY:"auto",padding:isMobile?"14px 16px":"22px 26px",display:showDetail||!isMobile?"flex":"none",flexDirection:"column",background:isMobile?BG:"transparent",zIndex:isMobile?10:0}}>\n'
    content = content[:old2.start()] + new2 + content[old2.end():]
    print("Tracker detail: fixed")
else:
    print("Tracker detail: NOT FOUND")

# Fix 3: Transfer sidebar
old3 = re.search(r'<div style=\{\{width:isMobile\?"100%":260[^\n]+\n', content)
if old3:
    new3 = '<div style={{width:isMobile?"100%":260,background:"#0a160b",borderRight:isMobile?"none":`1px solid ${BORDER}`,display:isMobile&&showDetail?"none":"flex",flexDirection:"column",flexShrink:0,overflowY:"auto",flex:isMobile?"1":"0 0 260px"}}>\n'
    content = content[:old3.start()] + new3 + content[old3.end():]
    print("Transfer sidebar: fixed")
else:
    print("Transfer sidebar: NOT FOUND")

# Fix 4: Transfer detail
old4 = re.search(r'<div style=\{\{[^}]*overflowY:"auto"[^}]*padding:isMobile\?"[^"]*":"22px 28px"[^\n]+\n', content)
if old4:
    new4 = '<div style={{position:isMobile?"absolute":"relative",top:0,left:0,right:0,bottom:0,flex:1,overflowY:"auto",padding:isMobile?"16px":"22px 28px",display:showDetail||!isMobile?"flex":"none",flexDirection:"column",background:isMobile?BG:"transparent",zIndex:isMobile?10:0}}>\n'
    content = content[:old4.start()] + new4 + content[old4.end():]
    print("Transfer detail: fixed")
else:
    print("Transfer detail: NOT FOUND")

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)
print("Done")
