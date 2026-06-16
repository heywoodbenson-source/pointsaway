with open('src/PointsAway.jsx') as f:
    content = f.read()

# Simple approach: make the outer container position:relative
# and use position:absolute on detail panel when on mobile to overlay it
# This way the list takes full width and detail slides over it

# Fix Tracker - make detail panel absolute on mobile
old1 = 'flex:1,overflowY:"auto",padding:isMobile?"16px":"22px 26px",display:isMobile&&!showDetail?"none":"flex",flexDirection:"column"'
new1 = 'position:isMobile?"fixed":"relative",top:isMobile?56:0,left:0,right:0,bottom:isMobile?60:0,overflowY:"auto",padding:isMobile?"16px":"22px 26px",display:isMobile&&!showDetail?"none":"flex",flexDirection:"column",background:isMobile?BG:"transparent",zIndex:isMobile?50:0'
c1 = content.count(old1)
content = content.replace(old1, new1, 1)
print(f"Tracker detail: {c1}")

# Fix Transfer - same approach
old2 = 'flex:1,overflowY:"auto",padding:isMobile?"16px":"22px 28px",display:isMobile&&!showDetail?"none":"flex",flexDirection:"column"'
new2 = 'position:isMobile?"fixed":"relative",top:isMobile?56:0,left:0,right:0,bottom:isMobile?60:0,overflowY:"auto",padding:isMobile?"16px":"22px 28px",display:isMobile&&!showDetail?"none":"flex",flexDirection:"column",background:isMobile?BG:"transparent",zIndex:isMobile?50:0'
c2 = content.count(old2)
content = content.replace(old2, new2, 1)
print(f"Transfer detail: {c2}")

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)
print("Done")
