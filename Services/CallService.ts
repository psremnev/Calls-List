import { CallType } from '../enums'
import axios from 'axios'

export class CallService {
  service = axios.create({
    baseURL: 'https://api.skilla.ru/mango',
    timeout: 3000,
    headers: { Authorization: 'Bearer testtoken' }
  })

  async getCallsList(
    date: string[] = ['2022-08-01', '2023-01-01'],
    type: null | number = CallType.ALL,
    searchString?: string
  ): Promise<object[]> {
    const [start, end] = date
    const res = await this.service.post(
      `/getList?date_start=${start}&date_end=${end}&in_out=${type}`,
      {search: searchString}
    )
    return res.data.results
  }

  async getCallRecord(id: string, partnership_id: string): Promise<File> {
    const res = await this.service.post(
      `/getRecord?record=${id}&partnership_id=${partnership_id}`
    )
    return res.data.results
  }

  async callInit(phone: string): Promise<{ success: boolean }> {
    const res = await this.service.post(`/getCallback?phone=${phone}`)
    return res.data.results
  }

  async sendAbuse(callId: string): Promise<{ result: boolean }> {
    const res = await this.service.post(`/sendAbuse?mango_id=${callId}`)
    return res.data.results
  }

  async answerAbuse(
    id: string,
    message,
    penalty = '',
    penalty_comment = ''
  ): Promise<{ result: boolean }> {
    const res = await this.service.post(`/answerAbuse`, {
      mango_id: id,
      message,
      penalty,
      penalty_comment
    })
    return res.data.results
  }
}
