export default () => {
	const { t } = useI18n()
	const { now } = useNow({ controls: true, interval: 5000 })

	return computed(() => {
		const hours = new Date(now.value).getHours()

		const greetins = (hours < 12)
			? t('greetings.moorning')
			: (hours < 18)
					? t('greetings.afternoon')
					: t('greetings.evening')

		return greetins
	})
}
