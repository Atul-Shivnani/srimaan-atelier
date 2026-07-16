export type SceneName = "cloth" | "scissor" | "stitch" | "shirt" | "story";

interface CacheEntry {
  images: HTMLImageElement[];
  promise: Promise<HTMLImageElement[]>;
  loaded: number;
  total: number;
}

const cache = new Map<SceneName, CacheEntry>();

const PAD_WIDTH: Partial<Record<SceneName, number>> = {
  story: 4,
};

// Loading hundreds of large frames in one synchronous burst can stall the
// renderer (decode + paint contention). Feed the browser smaller batches,
// yielding between them, instead of firing every request at once.
const BATCH_SIZE = 24;

const pad = (n: number, width: number) => String(n).padStart(width, "0");

function whenIdle(fn: () => void) {
  const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void })
    .requestIdleCallback;
  if (ric) ric(fn, { timeout: 200 });
  else setTimeout(fn, 32);
}

export function preloadScene(scene: SceneName, frameCount: number): Promise<HTMLImageElement[]> {
  const existing = cache.get(scene);
  if (existing) return existing.promise;

  const width = PAD_WIDTH[scene] ?? 3;
  const images: HTMLImageElement[] = new Array(frameCount);
  const entry: CacheEntry = { images, promise: null as unknown as Promise<HTMLImageElement[]>, loaded: 0, total: frameCount };

  entry.promise = new Promise<HTMLImageElement[]>((resolve) => {
    let nextIndex = 0;

    function loadBatch() {
      const end = Math.min(nextIndex + BATCH_SIZE, frameCount);
      for (let i = nextIndex; i < end; i++) {
        const img = new Image();
        img.decoding = "async";
        img.src = `/frames/${scene}/frame_${pad(i + 1, width)}.jpg`;
        img.onload = img.onerror = () => {
          entry.loaded++;
          if (entry.loaded === frameCount) resolve(images);
        };
        images[i] = img;
      }
      nextIndex = end;
      if (nextIndex < frameCount) whenIdle(loadBatch);
    }

    loadBatch();
  });

  cache.set(scene, entry);
  return entry.promise;
}

export function getCachedScene(scene: SceneName): HTMLImageElement[] | null {
  const entry = cache.get(scene);
  return entry && entry.loaded === entry.total ? entry.images : null;
}

const SCENE_ORDER: SceneName[] = ["cloth", "scissor", "stitch", "shirt"];

export function preloadAllScenes(frameCount: number) {
  return SCENE_ORDER.reduce(
    (chain, scene) => chain.then(() => preloadScene(scene, frameCount)),
    Promise.resolve<HTMLImageElement[]>([]),
  );
}
