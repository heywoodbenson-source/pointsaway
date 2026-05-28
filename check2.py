with open('src/PointsAway.jsx') as f:
    content = f.read()

idx = content.find('function Tracker({')
# Find the return statement
ret = content.find('return (', idx)
block = content[ret:ret+800]
print("TRACKER RETURN:")
print(block)
