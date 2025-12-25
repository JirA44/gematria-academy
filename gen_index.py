import codecs
html = open('index_template.txt', 'r', encoding='utf-8').read()
with codecs.open('index.html', 'w', 'utf-8') as f: f.write(html)
print('Done')
