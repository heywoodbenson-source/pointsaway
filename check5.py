with open('src/PointsAway.jsx') as f:
    content = f.read()

idx = content.find('function Tracker({')
ret = content.find('return (', idx)
print(repr(content[ret:ret+600]))
