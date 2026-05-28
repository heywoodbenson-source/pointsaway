with open('src/PointsAway.jsx') as f:
    content = f.read()

# Find Tracker outer container
idx = content.find('function Tracker({')
block = content[idx:idx+500]
print("TRACKER START:")
print(block)
