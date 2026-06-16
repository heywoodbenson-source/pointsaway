with open('src/PointsAway.jsx') as f:
    content = f.read()

idx = content.find('function Tracker({')
ret = content.find('return (\n    <div', idx)
# Count to find matching closing div
depth = 0
pos = ret
while pos < ret + 50000:
    if content[pos:pos+4] == '<div':
        depth += 1
    elif content[pos:pos+6] == '</div>':
        depth -= 1
        if depth == 0:
            print(f"Outer div closes at position: {pos}")
            print("Content around close:")
            print(repr(content[pos-200:pos+20]))
            break
    pos += 1
