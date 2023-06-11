import { PartnerPosition, PartnerBlocked } from '../enums'
import axios from 'axios'

export class PartnerService {
  service = axios.create({
    baseURL: 'https://api.skilla.ru/partnership',
    timeout: 3000,
    headers: { Authorization: 'Bearer testtoken' }
  })

  async getPersonsList(
    position: PartnerPosition[] = [PartnerPosition.ACCOUNT],
    isBlocked: PartnerBlocked = PartnerBlocked.unblocked
  ): Promise<object> {
    const res = await this.service.post(
      `/getPersonsList?position=${position}&is_blocked=${isBlocked}`
    )
    return res.data.results
  }

  async getProfile(): Promise<object> {
    const res = await this.service.post('/getProfile')
    return res.data.results
  }

  async getMenu(): Promise<object[]> {
    const res = await this.service.post('/getMenu')
    return res.data
  }
}
