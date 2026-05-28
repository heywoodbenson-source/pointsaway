with open('src/PointsAway.jsx') as f:
    content = f.read()

old = 'display:showDetail&&isMobile?"none":"flex",flexDirection:"column",overflowY:"auto",maxHeight:isMobile?"45%":"100%"'
new = 'display:showDetail&&isMobile?"none":"flex",flexDirection:"column",overflowY:"auto",flex:isMobile?"none":"0 0 250px"'
count1 = content.count(old)
content = content.replace(old, new)

old2 = 'flex:1,overflowY:"auto",padding:isMobile?"14px 16px":"22px 26px",display:!showDetail&&isMobile?"none":"block"'
new2 = 'position:isMobile?"absolute":"relative",top:0,left:0,right:0,bottom:0,overflowY:"auto",padding:isMobile?"14px 16px":"22px 26px",display:!showDetail&&isMobile?"none":"block",zIndex:10,background:"#0c1a0e",flex:1'
count2 = content.count(old2)
content = content.replace(old2, new2)

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)

print("Sidebar fixes:", count1)
print("Detail fixes:", count2)
