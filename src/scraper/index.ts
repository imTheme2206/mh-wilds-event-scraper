import axios from 'axios'
import { JSDOM } from 'jsdom'

export default async function scrape(url: string): Promise<any> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        Referer: 'https://info.monsterhunter.com/',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Cache-Control': 'no-cache',
      },
    })
    const dom = new JSDOM(response.data)

    return dom.window.document.documentElement.innerHTML
  } catch (error) {
    console.error('Error scraping the URL:', error)
    return []
  }
}
