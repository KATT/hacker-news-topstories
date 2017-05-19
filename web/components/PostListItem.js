import Link from 'next/link'
import PostListItemDetails from './PostListItemDetails';

const POSTS_PER_PAGE = 10

function toggleItem(arr, id) {
  const index = arr.indexOf(id);

  if (index === -1) {
    return [...arr, id];
  }

  return arr.filter(idx => id !== idx);
}

function PostListItem ({ post, expanded }) {
  const isExpanded = expanded.includes(post.id)
  const nextArr = toggleItem(expanded, post.id)

  const href = nextArr.length ? `?expand=${nextArr.join(',')}` : './';
  return (
    <div>
      <Link href={href} scroll={false}>
        <a>
          {(isExpanded ? '- ' : '+ ')} {post.title}
        </a>
      </Link>
      {isExpanded && <PostListItemDetails {...{isExpanded, post}} />}
    </div>
  )
}

export default PostListItem;
