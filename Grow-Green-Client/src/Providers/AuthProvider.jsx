import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import { getRole } from "../Api/auth";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        if (user) {
            getRole(user?.email)
                .then(data => setUserRole(data))
                .catch(error => {
                    console.error(error);
                });
        }
    }, [user])


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
    //         setUser(currentUser);
    //         console.log('current user', currentUser);

    //         // get and set token
    //         // if (currentUser) {
    //         //     axios.post('https://grow-green-server.vercel.app/jwt', { email: currentUser.email })
    //         //         .then(data => {
    //         //             // console.log(data);
    //         //             // console.log(data.data);
    //         //             // console.log(data.data.token);
    //         //             localStorage.setItem('access-token', data.data.token)
    //         //             setLoading(false);
    //         //         })
    //         // }
    //         // else {
    //         //     localStorage.removeItem('access-token')
    //         // }
    //         // setLoading(false);
    //     });

    //     return () => {
    //         return unsubscribe();
    //     }
    // }, [])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, loggedUser => {
            // console.log('logged in user inside auth state observer', loggedUser)
            setUser(loggedUser);
            setLoading(false);
        })

        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        userRole,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;