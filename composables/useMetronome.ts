export const useMetronome = () => {
  const isPlaying = useState<boolean>('isPlaying', () => false)
  const bpm = useState<number>('bpm', () => 80)
  const beatCount = useState<number>('beatCount', () => 0)
  const timeoutId = useState<number | null>('timeoutId', () => null)

  const wasPlaying = ref(false)
  const debounceTimeout = ref<number | null>(null)

  const tickSound = '/click.mp3'

  const playTick = () => {
    const tick = new Audio(tickSound)
    tick.volume = 1
    tick.play()
    beatCount.value++
  }

  let nextTickTime = performance.now()

  const scheduleTick = () => {
    const interval = 60000 / bpm.value
    const now = performance.now()

    nextTickTime += interval

    playTick()

    const delay = nextTickTime - performance.now()

    timeoutId.value = window.setTimeout(scheduleTick, Math.max(0, delay))
  }

  const start = () => {
    nextTickTime = performance.now()
    beatCount.value = 0
    isPlaying.value = true
    scheduleTick()
  }

  const stop = () => {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
      timeoutId.value = null
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
      wasPlaying.value = false
    } else {
      start()
      wasPlaying.value = true
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
