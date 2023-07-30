
// get role
export const getRole = async (email) => {
    const response = await fetch(`https://grow-green-server.vercel.app/users/${email}`);
    const user = await response.json();
    return user?.role;
};
