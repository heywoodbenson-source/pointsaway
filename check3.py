with open('src/PointsAway.jsx') as f:
    content = f.read()

idx = content.find('function Tracker({')
ret = content.find('return (', idx)
end = content.find('\nfunction ', ret)
block = content[ret:end]

# Find the detail panel closing - look for the last closing div before the outer closing
detail_start = block.find('flex:1,overflowY:"auto",padding:isMobile?"16px":"22px 26px"')
print("Detail panel area:")
print(block[detail_start:detail_start+200])
print("...")
# Find what comes after the detail panel
print(repr(block[-300:]))
