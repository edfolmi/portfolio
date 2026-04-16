/**
 * Live-session call audio: waiting tone while connecting, pickup chime when
 * connected, optional hang-up sting. Uses bundled MP3s (user gesture unlocks
 * playback per browser autoplay policy).
 */

const waitingUrl = new URL(
  "./ElevenLabs_Call_waiting_tone,_a_soft_beep_interrupting_a_conversation.mp3",
  import.meta.url,
).href;

const answeredUrl = new URL(
  "./ElevenLabs_Call_connection_sound,_a_satisfying_click_when_answered.mp3",
  import.meta.url,
).href;

const hangUpUrl = new URL(
  "./ElevenLabs_Hang-up_sound,_a_definitive_click_signaling_the_end_of_a_call.mp3",
  import.meta.url,
).href;

const WAITING_VOLUME = 0.55;
const ANSWERED_VOLUME = 0.72;
const HANG_UP_VOLUME = 0.78;

export interface ConnectionSoundHandle {
  /** Start looping waiting / ringing tone */
  start: () => void;
  /** Stop waiting tone and play one-shot “answered” chime */
  finishConnected: () => void;
  /** Stop waiting tone only; no pickup chime */
  abort: () => void;
  /** Full teardown without pickup chime */
  dispose: () => void;
}

function makeAudio(src: string, loop: boolean, volume: number): HTMLAudioElement {
  const el = new Audio(src);
  el.preload = "auto";
  el.loop = loop;
  el.volume = volume;
  return el;
}

/**
 * Creates an isolated sound instance. Prefer one instance per connect attempt
 * so stop/dispose cannot leak across sessions.
 */
export function createConnectionSound(): ConnectionSoundHandle {
  let waiting: HTMLAudioElement | null = null;

  const stopWaiting = () => {
    if (!waiting) return;
    try {
      waiting.pause();
      waiting.currentTime = 0;
    } catch {
      /* noop */
    }
    waiting = null;
  };

  const teardown = () => {
    stopWaiting();
  };

  return {
    start() {
      teardown();
      waiting = makeAudio(waitingUrl, true, WAITING_VOLUME);
      void waiting.play().catch(() => {});
    },

    finishConnected() {
      stopWaiting();
      const pickup = makeAudio(answeredUrl, false, ANSWERED_VOLUME);
      void pickup.play().catch(() => {});
    },

    abort() {
      teardown();
    },

    dispose() {
      teardown();
    },
  };
}

/** One-shot hang-up sound when the user ends a live session */
export function playHangUpSound(): void {
  const el = makeAudio(hangUpUrl, false, HANG_UP_VOLUME);
  void el.play().catch(() => {});
}
