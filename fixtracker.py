with open('src/PointsAway.jsx') as f:
    content = f.read()

# Fix Tracker detail panel
old1 = 'flex:1,overflowY:"auto",padding:"22px 26px",display:isMobile&&!showDetail?"none":"block"'
new1 = 'flex:1,overflowY:"auto",padding:isMobile?"16px":"22px 26px",display:isMobile&&!showDetail?"none":"flex",flexDirection:"column"'
c1 = content.count(old1)
content = content.replace(old1, new1, 1)

# Fix Transfer sidebar
old2 = 'width:260,background:"#0a160b",borderRight:`1px solid ${BORDER}`,display:isMobile&&showDetail?"none":"flex",flexDirection:"column",flexShrink:0,overflowY:"auto"'
new2 = 'width:isMobile?"100%":260,background:"#0a160b",borderRight:isMobile?"none":`1px solid ${BORDER}`,borderBottom:isMobile?`1px solid ${BORDER}`:"none",display:isMobile&&showDetail?"none":"flex",flexDirection:"column",flexShrink:0,overflowY:"auto",flex:isMobile?"1 0 auto":"0 0 260px"'
c2 = content.count(old2)
content = content.replace(old2, new2, 1)

# Fix Transfer detail panel
old3 = 'flex:1,overflowY:"auto",padding:"22px 28px",display:isMobile&&!showDetail?"none":"block"'
new3 = 'flex:1,overflowY:"auto",padding:isMobile?"16px":"22px 28px",display:isMobile&&!showDetail?"none":"flex",flexDirection:"column"'
c3 = content.count(old3)
content = content.replace(old3, new3, 1)

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)

print("Tracker detail:", c1)
print("Transfer sidebar:", c2)
print("Transfer detail:", c3)
