with open('src/PointsAway.jsx') as f:
    content = f.read()

idx = content.find('function Tracker({')
ret = content.find('return (', idx)
end = content.find('\nfunction ', ret)
block = content[ret:end]

# Find detail panel
detail_idx = block.find('showDetail')
print("Around showDetail in return:")
print(repr(block[detail_idx-100:detail_idx+300]))
