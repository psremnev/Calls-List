import { Box } from '@mui/material'
import { Accordion } from './Accordion'
import { Content } from './Content'

export default function App() {
  return (
    <section style={{ display: 'flex', height: '100%' }}>
      <Accordion />
      <Content />
    </section>
  )
}
