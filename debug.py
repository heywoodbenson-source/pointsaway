with open('src/PointsAway.jsx') as f:
    content = f.read()

# Add a visible debug indicator to the header
old = '<div style={{fontSize:16,fontWeight:700,letterSpacing:"0.07em",color:TEXT}}>POINTSAWAY</div>'
new = '<div style={{fontSize:16,fontWeight:700,letterSpacing:"0.07em",color:TEXT}}>POINTSAWAY</div>\n            <div style={{fontSize:9,color:"red"}}>{isMobile?"MOBILE":"DESKTOP"} {typeof window !== "undefined" ? window.innerWidth : "?"}</div>'
content = content.replace(old, new, 1)

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)
print("Done")
