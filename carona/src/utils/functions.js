export function formatarData(data) {
    const date = new Date(data);

    const day = String(date.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se necessário
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0, então soma-se 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function getFirstName(name) {
    return name.split(" ")[0];
}

export function captializeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export function isImageUrlValid(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);  // Retorna true se a imagem carregou corretamente
        img.onerror = () => resolve(false);  // Retorna false se houve erro ao carregar a imagem
        img.src = url;
    });
};

export function formatTime(time) {
    const [hours, minutes] = time.split(":");
    
    return `${hours}:${minutes}h`;
}