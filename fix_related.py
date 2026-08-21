import os
import re

for filename in os.listdir('.'):
    if filename.startswith('blog-') and filename.endswith('.html') and filename != 'blog.html':
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # The bad block starts at the first </article> after "<!-- Author Profile -->"
        # and ends at the </article> just before "<!-- Sidebar -->"
        author_idx = content.find('<!-- Author Profile -->')
        if author_idx != -1:
            sidebar_idx = content.find('<!-- Sidebar -->', author_idx)
            if sidebar_idx != -1:
                # We want to keep up to the first </article>
                first_article_end = content.find('</article>', author_idx) + 10
                
                # And replace everything between that and <!-- Sidebar --> with nothing (just newlines)
                if first_article_end != -1 and first_article_end < sidebar_idx:
                    # But wait, the first </article> we already inserted via the JS script earlier.
                    # It looks like:
                    # </div>
                    #             </div>
                    #         </article>
                    #                     <article class="bg-white rounded-lg shadow overflow-hidden dark:bg-gray-800">
                    
                    # We can just use a regex:
                    # from `</article>\s*<article class="bg-white rounded-lg shadow overflow-hidden dark:bg-gray-800">`
                    # up to `</div>\s*</div>\s*</article>`
                    
                    pattern = re.compile(r'(</article>)\s*<article class="bg-white rounded-lg shadow overflow-hidden dark:bg-gray-800">.*?</article>\s*</div>\s*</div>\s*</article>', re.DOTALL)
                    
                    new_content = pattern.sub(r'\1', content)
                    
                    with open(filename, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed {filename}")
