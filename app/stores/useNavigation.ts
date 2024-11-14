export default () => {
    const { locale } = useI18n()
    const hash = useHashRoute()
    const { data, execute, status } = useLazyAsyncData('navigation:links', async () => {
        const pick = ['id', 'icon', 'order', 'title']
        const response = await queryContent('section').locale('').only(pick).sort({ order: 1 }).find()
        
        for (const route of response) {
          const path = `section/${route.id}`
          const { title } = await queryContent(path).locale(locale.value).only('title').findOne() ?? {}
          route.title = title
        }
      
        return response
      }, {
        server: false,
        dedupe: 'defer',
        default: () => [],
        watch: [locale],
    })

    const links = computed(() => {
        const items = new Set(data.value)
        return Array.from(items)?.map( ({ id, icon, title }) => {
          return {
            id,
            icon,
            label: title,
            to: `/#${id}`,
            active: hash.value === `#${id}`
          }
        })
      })

    const states = useStatus(status)
    
    const actions = {
      go: (value: string, callback?: () => void) => {
        hash.value = value
  
        if (typeof callback === "function") callback()
        const element  = document.querySelector(`#${value}`)
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      },
      execute,
    }
   
    return reactive({
      data: links,
      ...states,
      ...actions
    })
}