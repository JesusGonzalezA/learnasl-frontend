
export const fetchVideoAndSet = (url : string, token : string, ref : React.RefObject<HTMLVideoElement>) => {
    fetch(url, { method: 'GET', headers: { Authorization: `Bearer ${token}` }})
            .then(res => res.blob())
            .then((blob) => { if(ref.current !== null) ref.current.src = URL.createObjectURL(blob) })
            .catch(() => {})
}