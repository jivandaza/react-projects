export const isMobile = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Comprobar si el dispositivo es Android
    if (/android/i.test(userAgent))
        return true;

    // Comprobar si el dispositivo es iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
        return true;

    // Comprobar otros dispositivos móviles
    if (/windows phone/i.test(userAgent) || /mobile/i.test(userAgent))
        return true;

    return false;
};