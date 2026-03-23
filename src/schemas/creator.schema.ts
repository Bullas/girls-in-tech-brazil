import { z } from 'zod'

export const CREATOR_CATEGORIES = [
  'AI',
  'Backend',
  'Career',
  'Cloud',
  'Community',
  'Data',
  'DevOps',
  'Education',
  'Engineering Leadership',
  'Frontend',
  'Full Stack',
  'Mobile',
  'Open Source',
  'Product',
  'Security',
  'UX/UI',
] as const

export type Category = (typeof CREATOR_CATEGORIES)[number]

export const BRAZILIAN_UFS = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
] as const

export type BrazilianUF = (typeof BRAZILIAN_UFS)[number]

export const LINK_KEYS = [
  'blog',
  'github',
  'instagram',
  'linkedin',
  'newsletter',
  'podcast',
  'twitter',
  'website',
  'youtube',
] as const

export type ContentType = (typeof LINK_KEYS)[number]

const categorySchema = z.enum(CREATOR_CATEGORIES)
const regionSchema = z.enum(BRAZILIAN_UFS)
const linkKeySchema = z.enum(LINK_KEYS)

const kebabCasePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/
const titleCaseTagPattern =
  /^(?:[A-Z0-9À-Ý][A-Za-z0-9À-ÿ]*|[A-Z0-9À-Ý]{2,})(?: (?:[A-Z0-9À-Ý][A-Za-z0-9À-ÿ]*|[A-Z0-9À-Ý]{2,}))*$/

function normalizeWhitespace(value: string) {
  return value.trim().replace(/\s+/g, ' ')
}

function normalizeTag(value: string) {
  return normalizeWhitespace(value)
    .split(' ')
    .filter(Boolean)
    .map((part) => {
      if (/^[A-Z0-9À-Ý]{2,}$/.test(part)) {
        return part
      }

      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    })
    .join(' ')
}

function isStrictIsoDate(value: string) {
  const match = isoDatePattern.exec(value)
  if (!match) {
    return false
  }

  const [year, month, day] = value.split('-').map((part) => Number(part))
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return false
  }

  if (month < 1 || month > 12 || day < 1) {
    return false
  }

  const utcDate = new Date(Date.UTC(year, month - 1, day))
  return (
    utcDate.getUTCFullYear() === year &&
    utcDate.getUTCMonth() === month - 1 &&
    utcDate.getUTCDate() === day
  )
}

const withNormalizedString = <T extends z.ZodType<string>>(schema: T) =>
  z.preprocess((value) => (typeof value === 'string' ? normalizeWhitespace(value) : value), schema)
const publicUrlSchema = withNormalizedString(
  z
    .string()
    .url('Informe uma URL válida.')
    .refine((value) => /^https?:\/\//i.test(value), 'Informe uma URL HTTP ou HTTPS válida.'),
)
const localAvatarPattern = /^\/images\/creators\/[a-z0-9-]+\.(?:jpg|jpeg|png|webp|avif|gif|svg)$/i

const linksSchema = z
  .object(
    Object.fromEntries(LINK_KEYS.map((key) => [key, publicUrlSchema.optional()])) as Record<
      ContentType,
      z.ZodOptional<typeof publicUrlSchema>
    >,
  )
  .refine(
    (links) => Object.values(links).some((value) => typeof value === 'string' && value.length > 0),
    {
      message: 'Informe pelo menos um link público para a criadora.',
    },
  )

const tagsSchema = z
  .array(
    withNormalizedString(
      z
        .string()
        .min(2, 'Cada tag deve ter pelo menos 2 caracteres.')
        .max(24, 'Cada tag deve ter no máximo 24 caracteres.'),
    )
      .transform(normalizeTag)
      .refine((tag: string) => titleCaseTagPattern.test(tag), 'Cada tag deve estar em Title Case.'),
  )
  .max(8, 'Você pode informar no máximo 8 tags.')
  .superRefine((tags, ctx) => {
    const seenTags = new Set<string>()

    for (const tag of tags) {
      if (seenTags.has(tag)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `A tag "${tag}" está duplicada.`,
        })
        continue
      }

      seenTags.add(tag)
    }
  })

export const creatorFileSchema = z.object({
  slug: withNormalizedString(
    z
      .string()
      .regex(kebabCasePattern, 'O slug deve estar em kebab-case.')
      .min(1, 'O slug é obrigatório.'),
  ),
  name: withNormalizedString(z.string().min(1, 'O nome é obrigatório.')),
  headline: withNormalizedString(
    z
      .string()
      .min(10, 'A headline deve ter pelo menos 10 caracteres.')
      .max(80, 'A headline deve ter no máximo 80 caracteres.'),
  ),
  bio: withNormalizedString(
    z
      .string()
      .min(50, 'A bio deve ter pelo menos 50 caracteres.')
      .max(500, 'A bio deve ter no máximo 500 caracteres.'),
  ),
  region: regionSchema.optional(),
  categories: z.array(categorySchema).min(1, 'Informe pelo menos uma categoria para a criadora.'),
  tags: tagsSchema.optional(),
  links: linksSchema,
  avatar: withNormalizedString(z.string())
    .refine(
      (value) => value.startsWith('https://') || localAvatarPattern.test(value),
      'O avatar deve ser uma URL HTTPS ou um caminho local em /images/creators/.',
    )
    .optional(),
  createdAt: withNormalizedString(
    z
      .string()
      .regex(isoDatePattern, 'createdAt deve usar o formato YYYY-MM-DD.')
      .refine(isStrictIsoDate, 'createdAt deve ser uma data válida.'),
  ),
  featured: z.boolean().default(false),
})

export type CreatorFile = z.infer<typeof creatorFileSchema>

export type Creator = CreatorFile & {
  contentTypes: ContentType[]
}

export function deriveContentTypes(links: CreatorFile['links']): ContentType[] {
  return linkKeySchema.options.filter((key) => {
    const value = links[key]
    return typeof value === 'string' && value.length > 0
  })
}
