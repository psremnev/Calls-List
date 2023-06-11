import {
  TimelineOutlined,
  DoneAllOutlined,
  MailOutlined,
  CallOutlined,
  PersonAddAltOutlined,
  DescriptionOutlined,
  PersonOutlineOutlined,
  WorkOutlineOutlined,
  HourglassEmptyOutlined,
  SettingsOutlined
} from '@mui/icons-material'
import { ReactNode } from 'react'

const iconStyle = {
  width: 16,
  height: 16,
  margin: '0 16px 0 12px'
}

export class MokiService {
  getAccordionList(): {
    id: number
    title: string
    icon: ReactNode
    active: boolean
  }[] {
    return [
      {
        id: 1,
        title: 'Итоги',
        icon: <TimelineOutlined sx={iconStyle} />,
        active: false
      },
      {
        id: 2,
        title: 'Заказы',
        icon: <DoneAllOutlined sx={iconStyle} />,
        active: false
      },
      {
        id: 3,
        title: 'Сообщения',
        icon: <MailOutlined sx={iconStyle} />,
        active: false
      },
      {
        id: 4,
        title: 'Звонки',
        icon: <CallOutlined sx={iconStyle} />,
        active: true
      },
      {
        id: 5,
        title: 'Контрагенты',
        icon: <PersonAddAltOutlined sx={iconStyle} />,
        active: false
      },
      {
        id: 6,
        title: 'Документы',
        icon: <DescriptionOutlined sx={iconStyle} />,
        active: false
      },
      {
        id: 7,
        title: 'Исполнители',
        icon: <PersonOutlineOutlined sx={iconStyle} />,
        active: false
      },
      {
        id: 8,
        title: 'Отчеты',
        icon: <WorkOutlineOutlined sx={iconStyle} />,
        active: false
      },
      {
        id: 9,
        title: 'База знаний',
        icon: <HourglassEmptyOutlined sx={iconStyle} />,
        active: false
      },
      {
        id: 10,
        title: 'Настройки',
        icon: <SettingsOutlined sx={iconStyle} />,
        active: false
      }
    ]
  }
}
