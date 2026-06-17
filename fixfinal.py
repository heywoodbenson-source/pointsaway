with open('src/PointsAway.jsx') as f:
    content = f.read()

old = 'return (\n    <div style={{display:"flex",flex:1,minHeight:0,overflow:"hidden",position:"relative"}}>\n      <div style={{width:isMobile?"100%":250'
new = 'return (\n    <div style={{display:"flex",flex:1,minHeight:0,overflow:"hidden",position:"relative"}}>\n      {isMobile && <div style={{position:"fixed",top:56,left:0,right:0,height:30,background:showDetail?"green":"red",zIndex:999,color:"white",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center"}}>{showDetail?"DETAIL=TRUE - tap worked!":"DETAIL=FALSE - tap an item"}</div>}\n      <div style={{width:isMobile?"100%":250'
c = content.count(old)
content = content.replace(old, new, 1)
print(f"Test bar: {c}")

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)