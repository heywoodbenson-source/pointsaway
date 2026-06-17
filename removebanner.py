with open('src/PointsAway.jsx') as f:
    content = f.read()
content = content.replace(
    '{isMobile && <div style={{position:"fixed",top:56,left:0,right:0,background:"red",color:"white",zIndex:999,padding:4,fontSize:11,textAlign:"center"}}>{showDetail?"DETAIL SHOWING":"LIST SHOWING - tap item"}</div>}\n      ',
    ''
)
with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)
print("Done")
