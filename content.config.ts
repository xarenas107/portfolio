import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const exprience = z.object({
	provider: z.string().optional(),
	abbreviation: z.string().optional(),
	job: z.string().optional(),
	description: z.string().optional(),
	location: z.string().optional()
})

const section = z.object({
	title: z.string().optional()
})

const skill = z.object({
	title: z.string().optional(),
	content: z.string().array().optional()
})

const certificate = z.object({
	title: z.string().optional(),
	provider: z.string().optional(),
	credentials: z.string().array().optional()
})

const project = z.object({
	title: z.string().optional(),
	description: z.string().optional()
})

const sectionProject = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	summary: z.string().optional(),
	quote: z.string().optional(),
	statement: z.string().optional(),
	frustrations: z.string().array().optional(),
	goals: z.string().array().optional(),
	items: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		icon: z.string().optional()
	})
})

const user = z.object({
	description: z.string(),
	job: z.string(),
	location: z.string()
})
export default defineContentConfig({
	collections: {
		sections: defineCollection({
			type: 'data',
			source: 'sections/**.json',
			schema: z.object({
				id: z.string(),
				order: z.number().default(0),
				active: z.boolean().optional().default(true),
				icon: z.string(),
				en: section,
				es: section
			}).merge(section)
		}),
		user: defineCollection({
			type: 'data',
			source: 'curriculum/index.json',
			schema: z.object({
				name: z.string(),
				fullname: z.string().optional(),
				comment: z.string().optional(),
				resume: z.object({
					href: z.string().optional(),
					name: z.string().optional()
				}).optional(),
				image: z.string().optional(),
				en: user,
				es: user,
				portfolio: z.object({
					title: z.string(),
					icon: z.string(),
					href: z.string(),
					active: z.boolean().optional().default(true)
				}).array().default([]),
				contact: z.object({
					active: z.boolean().optional().default(true),
					title: z.string(),
					icon: z.string(),
					href: z.string()
				}).array().default([])
			}).merge(user)
		}),
		studies: defineCollection({
			type: 'data',
			source: 'curriculum/studies/**.json',
			schema: z.object({
				title: z.string().optional(),
				active: z.boolean().optional().default(true),
				provider: z.string().optional(),
				type: z.string().optional(),
				location: z.string().optional(),
				startAt: z.string().datetime(),
				current: z.boolean().default(false),
				endAt: z.string().datetime(),
				en: z.object({
					title: z.string().optional(),
					provider: z.string().optional(),
					type: z.string().optional(),
					location: z.string().optional()
				}),
				es: z.object({
					title: z.string().optional(),
					provider: z.string().optional(),
					type: z.string().optional(),
					location: z.string().optional()
				})
			})
		}),
		certificates: defineCollection({
			type: 'data',
			source: 'curriculum/certificates/**.json',
			schema: z.object({
				active: z.boolean().optional().default(true),
				startAt: z.string().datetime(),
				endAt: z.string().datetime().optional(),
				image: z.string().optional(),
				en: certificate,
				es: certificate
			}).merge(certificate)
		}),
		experiences: defineCollection({
			type: 'data',
			source: 'curriculum/experiences/**.json',
			schema: z.object({
				href: z.string().url(),
				active: z.boolean().optional().default(true),
				current: z.boolean().default(false),
				startAt: z.string().datetime(),
				endAt: z.string().datetime().optional(),
				en: exprience,
				es: exprience
			}).merge(exprience)
		}),
		skills: defineCollection({
			type: 'data',
			source: 'curriculum/skills/**.json',
			schema: z.object({
				title: z.string().optional(),
				active: z.boolean().optional().default(true),
				content: z.string().array().default([]),
				en: skill,
				es: skill
			}).merge(skill)
		}),
		projects: defineCollection({
			type: 'data',
			source: 'curriculum/projects/**.json',
			schema: z.object({
				id: z.string().optional(),
				active: z.boolean().optional().default(true),
				keys: z.string().array().optional(),
				cover: z.string().optional(),
				highlighted: z.boolean().optional(),
				pinned: z.boolean().optional(),
				layout: z.string().optional().default('project-base'),
				en: project,
				es: project,
				sections: z.object({
					'title': z.string().optional(),
					'description': z.string().optional(),
					'name': z.string().optional().default('project-base'),
					'columns': z.string().array().optional(),
					'aspect-ratio': z.string().optional(),
					'sliders': z.string().or(z.number()).array().length(2).array(),
					'background': z.string().optional(),
					'detail': z.union([z.boolean(), z.enum(['reverse'])]).optional(),
					'reverse': z.boolean().optional(),
					'vertical': z.boolean().optional(),
					'src': z.string().array().optional(),
					'small-title': z.boolean().optional(),
					'colors': z.string().array().default([]),
					'user': z.string().optional(),
					'alt': z.string().default('').optional(),
					'summary': z.string().optional(),
					'quote': z.string().optional(),
					'statement': z.string().optional(),
					'frustrations': z.string().array().optional(),
					'goals': z.string().array().optional(),
					'image': z.string().optional(),
					'props': z.string().or(z.number()).array().array().optional(),
					'items': z.object({
						title: z.string().optional(),
						description: z.string().optional(),
						icon: z.string().optional()
					}).partial().array().optional(),
					'en': sectionProject,
					'es': sectionProject
				}).merge(sectionProject).partial().array().default([])
			}).merge(project)
		})
	}
})
