with open('src/PointsAway.jsx') as f:
    content = f.read()

# The nuclear fix: on mobile, hide the detail panel entirely using a wrapper
# and show the list full width. Tapping an item hides the list and shows detail.

# Fix Tracker outer wrapper - force column on mobile
old1 = '<div style={{display:"flex",flex:1,minHeight:0,overflow:"hidden",position:"relative"}}>\n      <div style={{width:250,background:"#0a160b",borderRight:`1px solid ${BORDER}`,display:isMobile&&showDetail?"none":"flex",flexDirection:"column",overflowY:"auto",flexShrink:0}}>'
new1 = '<div style={{display:"flex",flex:1,minHeight:0,overflow:"hidden"}}>\n      <div style={{width:isMobile?"100%":250,background:"#0a160b",borderRight:isMobile?"none":`1px solid ${BORDER}`,display:isMobile&&showDetail?"none":"flex",flexDirection:"column",overflowY:"auto",flexShrink:0,flex:isMobile&&!showDetail?"1":"0 0 250px"}}>'
c1 = content.count(old1)
content = content.replace(old1, new1, 1)
print(f"Tracker outer: {c1}")

# Fix Transfer outer wrapper
old2 = '<div style={{display:"flex",flex:1,minHeight:0,overflow:"hidden",position:"relative"}}>\n\n      {/* ── Sidebar: destination programs ── */}\n      <div style={{width:isMobile?"100%":260,background:"#0a160b",borderRight:isMobile?"none":`1px solid ${BORDER}`,borderBottom:isMobile?`1px solid ${BORDER}`:"none",display:isMobile&&showDetail?"none":"flex",flexDirection:"column",flexShrink:0,overflowY:"auto",flex:isMobile?"1 0 auto":"0 0 260px"}}>'
new2 = '<div style={{display:"flex",flex:1,minHeight:0,overflow:"hidden"}}>\n\n      {/* ── Sidebar: destination programs ── */}\n      <div style={{width:isMobile?"100%":260,background:"#0a160b",borderRight:isMobile?"none":`1px solid ${BORDER}`,borderBottom:isMobile?`1px solid ${BORDER}`:"none",display:isMobile&&showDetail?"none":"flex",flexDirection:"column",flexShrink:0,overflowY:"auto",flex:isMobile&&!showDetail?"1":"0 0 260px"}}>'
c2 = content.count(old2)
content = content.replace(old2, new2, 1)
print(f"Transfer outer: {c2}")

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)
print("Done")
