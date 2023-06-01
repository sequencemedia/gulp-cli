const URL = 'https://raw.githubusercontent.com/gulpjs/plugins/master/src/blackList.json'

export default async function getBlacklist () {
  const response = await fetch(URL)

  return response.json()
}
