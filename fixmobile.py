with open('src/PointsAway.jsx') as f:
    content = f.read()

# Fix Transfer list item - add setShowDetail(true)
old1 = 'onClick={()=>setSelectedPartner(d.partner)}'
new1 = 'onClick={()=>{setSelectedPartner(d.partner);if(isMobile)setShowDetail(true);}}'
c1 = content.count(old1)
content = content.replace(old1, new1)
print(f"Transfer list click fix: {c1}")

# Also fix the second click handler
old2 = 'onClick={()=>setSelectedPartner(g.partner)}'
new2 = 'onClick={()=>{setSelectedPartner(g.partner);if(isMobile)setShowDetail(true);}}'
c2 = content.count(old2)
content = content.replace(old2, new2)
print(f"Transfer group click fix: {c2}")

# Check Transfer detail panel has position fixed
t2_idx = content.find('function TransferTracker({')
end2 = content.find('\nexport default', t2_idx)
block2 = content[t2_idx:end2]
print(f"Transfer has position:fixed: {'position:isMobile' in block2}")

with open('src/PointsAway.jsx', 'w') as f:
    f.write(content)
print("Done")
