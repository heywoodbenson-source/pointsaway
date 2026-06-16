with open('src/PointsAway.jsx') as f:
    content = f.read()

# Find Tracker return
idx = content.find('function Tracker({')
ret = content.find('return (', idx)
print("TRACKER OUTER DIV:")
print(repr(content[ret:ret+300]))
