with open('src/PointsAway.jsx') as f:
    content = f.read()

idx = content.find('function Tracker({')
ret = content.find('return (', idx)
end = content.find('\nfunction ', ret)
block = content[ret:end]

# Find all divs with showDetail
import re
for m in re.finditer('showDetail', block):
    print(repr(block[m.start()-80:m.start()+120]))
    print("---")
