import { defineContentConfig, defineCollection, z } from '@nuxt/content'

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
				title: z.string().optional(),
				en: z.object({
					title: z.string().default('')
				}),
				es: z.object({
					title: z.string().default('')
				})
			})
		}),
		user: defineCollection({
			type: 'data',
			source: 'curriculum/index.json',
			schema: z.object({
				name: z.string(),
				image: z.string().optional(),
				description: z.string().optional(),
				job: z.string().optional(),
				location: z.string().optional(),
				en: z.object({
					description: z.string(),
					job: z.string(),
					location: z.string()
				}),
				es: z.object({
					description: z.string(),
					job: z.string(),
					location: z.string()
				}),
				portfolio: z.object({
					title: z.string(),
					icon: z.string(),
					href: z.string(),
					active: z.boolean().optional().default(true)
				}).array().default([]),
				contact: z.object({
					title: z.string(),
					icon: z.string(),
					href: z.string()
				}).array().default([])
			})
		}),
		studies: defineCollection({
			type: 'data',
			source: 'curriculum/studies/**.json',
			schema: z.object({
				title: z.string().optional(),
				provider: z.string().optional(),
				type: z.string().optional(),
				location: z.string().optional(),
				startAt: z.string().datetime(),
				active: z.boolean().default(false),
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
				title: z.string().optional(),
				provider: z.string().optional(),
				credentials: z.string().array().optional(),
				startAt: z.string().datetime(),
				endAt: z.string().datetime().optional(),
				image: z.string().optional(),
				en: z.object({
					title: z.string().optional(),
					provider: z.string().optional(),
					credentials: z.string().array().optional()
				}),
				es: z.object({
					title: z.string().optional(),
					provider: z.string().optional(),
					credentials: z.string().array().optional()
				})
			})
		}),
		experiences: defineCollection({
			type: 'data',
			source: 'curriculum/experiences/**.json',
			schema: z.object({
				provider: z.string().optional(),
				abbreviation: z.string().optional(),
				job: z.string().optional(),
				description: z.string().optional(),
				active: z.boolean().default(false),
				startAt: z.string().datetime(),
				endAt: z.string().datetime().optional(),
				location: z.string().optional(),
				en: z.object({
					provider: z.string().optional(),
					abbreviation: z.string().optional(),
					job: z.string().optional(),
					description: z.string().optional(),
					location: z.string().optional()
				}),
				es: z.object({
					provider: z.string().optional(),
					abbreviation: z.string().optional(),
					job: z.string().optional(),
					description: z.string().optional(),
					location: z.string().optional()
				})
			})
		}),
		skills: defineCollection({
			type: 'data',
			source: 'curriculum/skills/**.json',
			schema: z.object({
				title: z.string().optional(),
				content: z.string().array().default([]),
				en: z.object({
					title: z.string().optional(),
					content: z.string().array().optional()
				}),
				es: z.object({
					title: z.string().optional(),
					content: z.string().array().optional()
				})
			})
		}),
		projects: defineCollection({
			type: 'data',
			source: 'curriculum/projects/**.json',
			schema: z.object({
				id: z.string().optional(),
				active: z.boolean().default(true),
				title: z.string().optional(),
				description: z.string().optional(),
				cover: z.string().optional(),
				highlighted: z.boolean().optional(),
				pinned: z.boolean().optional(),
				layout: z.string().optional().default('project-base'),
				en: z.object({
					title: z.string().optional(),
					description: z.string().optional()
				}),
				es: z.object({
					title: z.string().optional(),
					description: z.string().optional()
				}),
				sections: z.object({
					'name': z.string().optional().default('project-base'),
					'aspect-ratio': z.string().optional().default('16/9'),
					'background': z.string().optional(),
					'alt': z.string().default('').optional(),
					'detail': z.union([z.boolean(), z.enum(['reverse'])]).optional(),
					'reverse': z.boolean().optional(),
					'vertical': z.boolean().optional(),
					'src': z.string().array().default([]),
					'description': z.string().optional(),
					'title': z.string().optional(),
					'small-title': z.boolean().optional(),
					'colors': z.string().array().default([]),
					'user': z.string().optional(),
					'summary': z.string().optional(),
					'quote': z.string().optional(),
					'image': z.string().optional(),
					'statement': z.string().optional(),
					'goals': z.string().array().optional(),
					'frustrations': z.string().array().optional(),
					'props': z.string().or(z.number()).array().array().optional(),
					'items': z.object({
						title: z.string().optional(),
						description: z.string().optional(),
						icon: z.string().optional()
					}).partial().array().optional(),
					'en': z.object({
						description: z.string().optional()
					}),
					'es': z.object({
						description: z.string().optional()
					})
				}).array().default([])
			})
		})
	}
})
