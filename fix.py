with open('src/PointsAway.jsx') as f:
    content = f.read()

content = content.replace(
    'onClick={()=>{setSelected(name);setAiInsight("");}}',
    'onClick={()=>{setSelected(name);setAiInsight("");if(isMobile)setShowDetail(true);}}',
    1
)

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)

print("Done:", 'if(isMobile)setShowDetail(true)' in content)