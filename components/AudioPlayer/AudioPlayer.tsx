import './AudioPlayer.less'

export function AudioPlayer({ id, partnership_id }) {
  return (
    <audio controls>
      <source src='public/test.mp3' type='audio/mp3' />
    </audio>
  )
}
