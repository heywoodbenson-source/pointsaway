with open('src/PointsAway.jsx') as f:
    content = f.read()

content = content.replace(
    '\n            <div style={{fontSize:9,color:"red"}}>{isMobile?"MOBILE":"DESKTOP"} {typeof window !== "undefined" ? window.innerWidth : "?"}</div>',
    ''
)

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)

print("Done:", 'MOBILE' not in content or 'isMobile?"MOBILE"' not in content)
