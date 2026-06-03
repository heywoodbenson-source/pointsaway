with open('src/PointsAway.jsx') as f:
    content = f.read()

# Find Tracker detail panel
idx = content.find('function Tracker({')
ret = content.find('return (', idx)
end = content.find('\nfunction ', ret)
block = content[ret:end]

detail = block.find('!showDetail')
print("TRACKER DETAIL:")
print(repr(block[detail-80:detail+150]))
print()

# Find Transfer sidebar
t2 = content.find('function TransferTracker({')
r2 = content.find('return (', t2)
e2 = content.find('\nfunction ', r2)
b2 = content[r2:e2]

sb = b2.find('Sidebar')
print("TRANSFER SIDEBAR:")
print(repr(b2[sb:sb+300]))
print()

detail2 = b2.find('!showDetail')
print("TRANSFER DETAIL:")
print(repr(b2[detail2-80:detail2+150]))
