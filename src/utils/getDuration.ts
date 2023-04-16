export const getDuration = async (url: string) =>
  new Promise<number>((resolve, reject) => {
    try {
      const audio = new Audio();
      audio.onloadedmetadata = event => {
        if (audio.readyState > 0) {
          resolve(audio.duration);
        }
      };
      audio.onerror = event => {
        reject(event);
      };
      audio.src = url;
    } catch (e) {
      reject(e);
    }
  });
