with open('src/PointsAway.jsx') as f:
    content = f.read()

# Fix outer container - add position relative
old = 'display:"flex",flex:1,minHeight:0,overflow:"hidden"}}>\n      <div style={{width:isMobile?"100%":250'
new = 'display:"flex",flex:1,minHeight:0,overflow:"hidden",position:"relative"}}>\n      {isMobile && <div style={{position:"fixed",top:56,left:0,right:0,height:30,background:showDetail?"green":"red",zIndex:999,color:"white",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center"}}>{showDetail?"DETAIL=TRUE":"DETAIL=FALSE - tap item"}</div>}\n      <div style={{width:isMobile?"100%":250'
c = content.count(old)
content = content.replace(old, new, 1)
print(f"Fixed: {c}")

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)