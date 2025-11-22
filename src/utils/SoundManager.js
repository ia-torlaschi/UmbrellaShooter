class SoundManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)()
        this.masterGain = this.ctx.createGain()
        this.masterGain.gain.value = 0.3 // Master volume
        this.masterGain.connect(this.ctx.destination)
    }

    playShootSound() {
        if (this.ctx.state === 'suspended') this.ctx.resume()

        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.connect(gain)
        gain.connect(this.masterGain)

        // Laser-like pew pew
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(880, this.ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.15)

        gain.gain.setValueAtTime(0.5, this.ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15)

        osc.start()
        osc.stop(this.ctx.currentTime + 0.15)
    }

    playImpactSound() {
        if (this.ctx.state === 'suspended') this.ctx.resume()

        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.connect(gain)
        gain.connect(this.masterGain)

        // Low thud
        osc.type = 'square'
        osc.frequency.setValueAtTime(150, this.ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.1)

        gain.gain.setValueAtTime(0.5, this.ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1)

        osc.start()
        osc.stop(this.ctx.currentTime + 0.1)
    }

    playFootstepSound() {
        if (this.ctx.state === 'suspended') this.ctx.resume()

        const bufferSize = this.ctx.sampleRate * 0.05 // 50ms
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
        const data = buffer.getChannelData(0)

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1
        }

        const noise = this.ctx.createBufferSource()
        noise.buffer = buffer

        const gain = this.ctx.createGain()

        // Filter to make it sound like a boot on concrete (Low Pass)
        const filter = this.ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.value = 1000 // Increased from 600 for more "snap"

        noise.connect(filter)
        filter.connect(gain)
        gain.connect(this.masterGain)

        gain.gain.setValueAtTime(1.0, this.ctx.currentTime) // Increased from 0.5
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1) // Longer decay

        noise.start()
    }

    playJumpSound() {
        if (this.ctx.state === 'suspended') this.ctx.resume()

        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.connect(gain)
        gain.connect(this.masterGain)

        // Whoosh
        osc.type = 'sine'
        osc.frequency.setValueAtTime(200, this.ctx.currentTime)
        osc.frequency.linearRampToValueAtTime(600, this.ctx.currentTime + 0.2)

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.2)

        osc.start()
        osc.stop(this.ctx.currentTime + 0.2)
    }
}

export default new SoundManager()
