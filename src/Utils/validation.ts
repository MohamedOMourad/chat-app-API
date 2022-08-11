export const createUserValiation = (firstName: string, lastName: string, email: string, password: string, res: any) => {
    if (!firstName) return res.status(406).send("First Name is required!")
    else if (!lastName) return res.status(406).send("Last Name is required!")
    else if (!email) return res.status(406).send("Email is required!")
    else if (!password || password.length < 8) return res.status(406).send("Password is required and more than 8-cahrcters!")
    else return true;
}