export const useMetronome = () => {
  const isPlaying = useState<boolean>('isPlaying', () => false)
  const bpm = useState<number>('bpm', () => 80)
  const beatCount = useState<number>('beatCount', () => 0)
  const intervalId = useState<number | null>('intervalId', () => null)

  const wasPlaying = ref(false)
  const debounceTimeout = ref<number | null>(null)

  const tickSound = '/click.mp3'

  const playTick = () => {
    const tick = new Audio(tickSound)
    tick.volume = 1
    tick.play()
    beatCount.value++
  }

  const start = () => {
    const interval = 60000 / bpm.value
    beatCount.value = 0
    playTick()
    intervalId.value = setInterval(playTick, interval)
    isPlaying.value = true
  }

  const stop = () => {
    if (intervalId.value) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
    isPlaying.value = false
    beatCount.value = 0
  }

  const handleBpmChange = () => {
    if (debounceTimeout.value) {
      clearTimeout(debounceTimeout.value)
    }

    stop()

    debounceTimeout.value = setTimeout(() => {
      if (wasPlaying.value) {
        start()
      }
    }, 300)
  }

  const toggle = () => {
    if (isPlaying.value) {
      stop()
      wasPlaying.value = false;
    } else {
      start()
      wasPlaying.value = true;
    }
  }

  watch(bpm, handleBpmChange)

  onBeforeUnmount(() => stop())

  return {
    isPlaying,
    bpm,
    beatCount,
    start,
    stop,
    toggle,
  }
}
