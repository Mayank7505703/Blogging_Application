import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock3 } from 'lucide-react'
import { API_BASE_URL } from '../api/client'

const DEFAULT_IMAGES = ['default.png', 'Default.png', null, undefined, '']

function initials(name = '') {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || 'U'
}
function readingTime(content = '') { return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 180)) }

export default function PostCard({ post, featured = false }) {
  const hasImage = !DEFAULT_IMAGES.includes(post.imageName)
  const date = post.publishDate ? new Date(post.publishDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'

  if (featured) return (
    <Link to={`/post/${post.postId}`} className="group grid overflow-hidden rounded-[28px] border border-ink/10 bg-ink text-paper shadow-[0_25px_80px_rgba(28,26,23,.16)] lg:grid-cols-[1.08fr_.92fr]">
      <div className="flex min-h-[330px] flex-col justify-between p-7 sm:p-10">
        <div>
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[.16em] text-orange-200">{post.category?.categoryTitle || 'Featured story'}</span>
          <h2 className="mt-6 max-w-xl font-display text-4xl font-bold leading-[1.02] sm:text-5xl">{post.title}</h2>
          <p className="mt-5 line-clamp-3 max-w-xl text-base leading-7 text-paper/65">{post.content}</p>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-paper/65">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 font-bold text-paper">{initials(post.user?.name)}</span>
            <span>{post.user?.name || 'Unknown author'} · {date}</span>
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-paper text-ink transition group-hover:rotate-45"><ArrowUpRight size={19}/></span>
        </div>
      </div>
      <div className="relative min-h-[260px] overflow-hidden bg-white/5">
        {hasImage ? <img src={`${API_BASE_URL}/images/${post.imageName}`} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" /> : <div className="absolute inset-0 bg-gradient-to-br from-accent/80 via-orange-800 to-ink" />}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" />
      </div>
    </Link>
  )

  return (
    <Link to={`/post/${post.postId}`} className="group block overflow-hidden rounded-3xl border border-ink/10 bg-white/75 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(28,26,23,.09)]">
      <div className="relative h-48 overflow-hidden bg-ink/5">
        {hasImage ? <img src={`${API_BASE_URL}/images/${post.imageName}`} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="h-full w-full bg-gradient-to-br from-orange-100 via-paper to-stone-200"><div className="p-6 font-display text-3xl font-bold text-ink/10">Inkwell</div></div>}
        <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent backdrop-blur">{post.category?.categoryTitle || 'Story'}</span>
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-center gap-2 text-xs text-ink/45"><span>{date}</span><span>•</span><span className="flex items-center gap-1"><Clock3 size={12}/>{readingTime(post.content)} min read</span></div>
        <h3 className="font-display text-2xl font-bold leading-tight transition group-hover:text-accent">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/60">{post.content}</p>
        <div className="mt-5 flex items-center gap-2 border-t border-ink/8 pt-4 text-sm font-medium">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent/10 text-xs font-bold text-accent">{initials(post.user?.name)}</span>
          {post.user?.name || 'Unknown author'}
          <ArrowUpRight className="ml-auto text-ink/30 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" size={17}/>
        </div>
      </div>
    </Link>
  )
}
