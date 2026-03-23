import type { LucideIcon } from 'lucide-react'
import {
  BookOpenText,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Mic2,
  Play,
  Twitter,
} from 'lucide-react'
import type { ContentType } from '@/schemas/creator.schema'

type ContentTypeMeta = {
  label: string
  icon: LucideIcon
}

export const CONTENT_TYPE_META: Record<ContentType, ContentTypeMeta> = {
  blog: { label: 'Blog', icon: BookOpenText },
  github: { label: 'GitHub', icon: Github },
  instagram: { label: 'Instagram', icon: Instagram },
  linkedin: { label: 'LinkedIn', icon: Linkedin },
  newsletter: { label: 'Newsletter', icon: Mail },
  podcast: { label: 'Podcast', icon: Mic2 },
  twitter: { label: 'Twitter', icon: Twitter },
  website: { label: 'Website', icon: Globe },
  youtube: { label: 'YouTube', icon: Play },
}

export function getContentTypeLabel(type: ContentType) {
  return CONTENT_TYPE_META[type].label
}
