export const formatDate = (date: string) => {
    let d = new Date(date);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}