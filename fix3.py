with open('src/PointsAway.jsx') as f:
    content = f.read()

# Fix Tracker outer container - remove column direction, use relative positioning
old = '<div style={{display:"flex",flex:1,minHeight:0,overflow:"hidden",flexDirection:isMobile?"column":"row"}}>\n      <div style={{width:isMobile?"100%":250,background:"#0a160b",borderRight:isMobile?"none":`1px solid ${BORDER}`,borderBottom:isMobile?`1px solid ${BORDER}`:"none",display:showDetail&&isMobile?"none":"flex",flexDirection:"column",overflowY:"auto",flex:isMobile?"none":"0 0 250px"}}>'
new = '<div style={{display:"flex",flex:1,minHeight:0,overflow:"hidden",position:"relative"}}>\n      <div style={{width:250,background:"#0a160b",borderRight:`1px solid ${BORDER}`,display:isMobile&&showDetail?"none":"flex",flexDirection:"column",overflowY:"auto",flexShrink:0}}>'
count1 = content.count(old)
content = content.replace(old, new, 1)
print("Tracker outer:", count1)

# Fix Tracker detail panel
old2 = 'position:isMobile?"absolute":"relative",top:0,left:0,right:0,bottom:0,overflowY:"auto",padding:isMobile?"14px 16px":"22px 26px",display:!showDetail&&isMobile?"none":"block",zIndex:10,background:"#0c1a0e",flex:1'
new2 = 'flex:1,overflowY:"auto",padding:"22px 26px",display:isMobile&&!showDetail?"none":"block"'
count2 = content.count(old2)
content = content.replace(old2, new2, 1)
print("Tracker detail:", count2)

# Fix TransferTracker outer container
old3 = '<div style={{display:"flex",flex:1,minHeight:0,overflow:"hidden",flexDirection:isMobile?"column":"row"}}>\n\n      {/* \u2500\u2500 Sidebar: destination programs \u2500\u2500 */}\n      <div style={{width:isMobile?"100%":260,background:"#0a160b",borderRight:isMobile?"none":`1px solid ${BORDER}`,borderBottom:isMobile?`1px solid ${BORDER}`:"none",display:showDetail&&isMobile?"none":"flex",flexDirection:"column",flexShrink:0,overflowY:"auto",flex:isMobile?"none":"0 0 260px"}}>'
new3 = '<div style={{display:"flex",flex:1,minHeight:0,overflow:"hidden",position:"relative"}}>\n\n      {/* \u2500\u2500 Sidebar: destination programs \u2500\u2500 */}\n      <div style={{width:260,background:"#0a160b",borderRight:`1px solid ${BORDER}`,display:isMobile&&showDetail?"none":"flex",flexDirection:"column",flexShrink:0,overflowY:"auto"}}>'
count3 = content.count(old3)
content = content.replace(old3, new3, 1)
print("Transfer outer:", count3)

# Fix TransferTracker detail panel
old4 = 'position:isMobile?"absolute":"relative",top:0,left:0,right:0,bottom:0,overflowY:"auto",padding:isMobile?"14px 16px":"22px 28px",display:!showDetail&&isMobile?"none":"block",zIndex:10,background:"#0c1a0e",flex:1'
new4 = 'flex:1,overflowY:"auto",padding:"22px 28px",display:isMobile&&!showDetail?"none":"block"'
count4 = content.count(old4)
content = content.replace(old4, new4, 1)
print("Transfer detail:", count4)

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)
print("Done")
