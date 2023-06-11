import { Header } from './Header'
import { CallList } from './CallList'

export function Content() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: 'rgba(234, 240, 250, 1)'
      }}
    >
      <Header />
      <CallList />
    </div>
  )
}
