import type { AsyncDataOptions, NuxtError } from "#app"
import type { QueryBuilderWhere, SortOptions } from "@nuxt/content"
import { defu } from 'defu'

type Options<T> = Omit<AsyncDataOptions<T>, 'default'> & {
    default?: T | (() => T)
    callback?: (data: T) => T
    where?: QueryBuilderWhere,
    limit?: number
    skip?: number
    sort?: SortOptions
    locale?: string
    count?: boolean
}

export default <T extends Record<string, any>, E = NuxtError>(key: string, options?: Options<T>) => {
    const { locale } = useI18n()

    return useLazyAsyncData<T, E>(key, async () => {
            const _locale = new RegExp(`^(${locale.value})?$`)
            const query = queryContent<T>(key).where({ _locale })

            if (options?.where) query.where(options.where)
            if (options?.limit) query.limit(options.limit)
            if (options?.skip) query.skip(options.skip)
            if (options?.sort) query.sort(options.sort)
            if (options?.locale) query.locale(options.locale)
            if (options?.count) query.count()

            const response = await query.find()
            const content =  defu<T, T[]>({}, ...response)
            if (options?.callback) return options.callback(content)
            else return content
        },
       {
        watch: [locale],
        ...options as AsyncDataOptions<T>,
       }
    )
}