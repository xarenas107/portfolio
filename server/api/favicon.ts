export default defineEventHandler(async (event) => {
  const { color = 'black' } = getQuery(event)
 
  const regex = /^([0-9a-f]{3}){1,2}$/i
  const value = regex.test(`${color}`) ? `#${ color }` : color

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 53.2" style="enable-background:new 0 0 48 53.2;">
      <style type="text/css">
        .bg{ fill:none }
        .fill{ fill:black }
        .accent{ fill:${ value }
      </style>
      <rect class="bg" width="48" height="53.2"/>
      <polygon class='fill' points="47.8 15.4 36 3.6 24.2 15.4 12.4 27.2 24.2 39 24.2 39 36 50.8 47.8 39 36 27.2 47.8 15.4"/>
      <polygon class="accent" points="12 3.3 22.4 13.8 10.4 25.7 0 15.2 12 3.3"/>
      <polygon class="accent" points="10.5 28.6 22.4 40.5 11.9 51 0 39 10.5 28.6"/>
    </svg>
  `

  const blob = new Blob([svg], { type: 'image/svg+xml' })
  return blob
})
