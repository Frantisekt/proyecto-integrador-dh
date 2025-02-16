export const getOnepackage = async (id) => {
    const response = await fetch(`/api/packages/${id}`)
    const data = await response.json()
    if (response.ok) {
        return data;
    } else {
        throw new Error('Error fetching package');
    }
}