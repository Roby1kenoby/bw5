// file che contiene tutte le operazioni CRUD usate dall'app per le questioni dell'autore
const URI = `${process.env.REACT_APP_API_URL}/profile`
console.log(URI)
// se devo passare dei file, devo avere file come argomento
export const NewProfile = async (profileData, file1) => {
    try {
        console.log(profileData)
        // formData è un tipo di dati che permette il passaggio di file
        const formData = new FormData()

        formData.append('email', profileData.email)
        formData.append('password', profileData.password)
        formData.append('name', profileData.name)
        formData.append('surname', profileData.surname)
        formData.append('role', profileData.role)
        formData.append('description', profileData.description)
        formData.append('avatar', file1)
        // formData.append('backgroundImage', file2)
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }
        const resp = await fetch(URI,{
            method: 'POST',
            body: formData
        })
        const data = await resp.json()
        
        if(!resp.ok) throw new Error(resp)
        
        return data
    } catch (error) {
        console.log(error)
    }
}