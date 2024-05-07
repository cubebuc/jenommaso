import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth'
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, DocumentData, arrayUnion, arrayRemove } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyB_KWZi8mf1IdvDWsNg286_X6SzzDOIuiY',
    authDomain: 'maso-62fa1.firebaseapp.com',
    projectId: 'maso-62fa1',
    storageBucket: 'maso-62fa1.appspot.com',
    messagingSenderId: '1005137198174',
    appId: '1:1005137198174:web:39ab06d672c94fdde1c8cf'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const firestore = getFirestore(app)
const storage = getStorage(app)

// Create a new user account - default to unverified
export async function signUp(email: string, password: string, name: string, phone: string, address: string)
{
    await createUserWithEmailAndPassword(auth, email, password)
    const user = auth.currentUser as User
    await setDoc(doc(firestore, 'users', user.uid), { name, phone, address })
}

// Try to sign in with an email and password - allow only verified
export async function signIn(email: string, password: string): Promise<boolean>
{
    try
    {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        const docRef = doc(firestore, 'users', user.uid, 'private', 'rights')
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists() || !docSnap.data().verified)
        {
            await auth.signOut()
            return false
        }
    }
    catch
    {
        return false
    }
    return true
}

// Sign out the current user
export async function signOut()
{
    await auth.signOut()
}

// Check if the current user is verified
export async function isVerified(): Promise<boolean>
{
    try
    {
        const user = auth.currentUser as User
        const docRef = doc(firestore, 'users', user.uid, 'private', 'rights')
        const docSnap = await getDoc(docRef)
        return docSnap.exists() && docSnap.data().verified
    }
    catch
    {
        return false
    }
}

// Check if the current user is an admin
export async function isAdmin(): Promise<boolean>
{
    try
    {
        const user = auth.currentUser as User
        const docRef = doc(firestore, 'users', user.uid, 'private', 'rights')
        const docSnap = await getDoc(docRef)
        console.log("Done")
        return docSnap.exists() && docSnap.data().admin
    }
    catch (e)
    {
        return false
    }
}

// Get all products from Firestore
export async function getProducts(): Promise<{ [key: string]: any }>
{
    const querySnapshot = await getDocs(collection(firestore, 'products'))
    const products: { [key: string]: DocumentData } = {}
    querySnapshot.forEach(doc => products[doc.id] = doc.data())
    return products
}

// Add a new product to Firestore
export async function addProduct(name: string, description: string, category: string[], usage: string[], size: number, unit: number, pricePerUnit: number, packagePrice: number, stock: number, images: FileList): Promise<string>
{
    const docRef = doc(collection(firestore, 'products'))
    const imageURLs = await Promise.all(Array.from(images).map(async (image, index) =>
    {
        const imageRef = ref(storage, `images/${docRef.id}-${index}`)
        await uploadBytes(imageRef, image)
        return await getDownloadURL(imageRef)
    }))
    await setDoc(docRef, { name, description, category, usage, size, unit, pricePerUnit, packagePrice, stock, images: imageURLs })
    return docRef.id
}

// Edit an existing product in Firestore - if images are provided, delete the old images and upload the new ones, otherwise just update the product details
export async function editProduct(id: string, name: string, description: string, category: string[], usage: string[], size: number, unit: number, pricePerUnit: number, packagePrice: number, stock: number, images: FileList, imageCount: number): Promise<string>
{
    if (images.length === 0)
    {
        await updateDoc(doc(collection(firestore, 'products'), id), { name, description, category, usage, size, unit, pricePerUnit, packagePrice, stock })
        return id
    }

    for (let i = 0; i < imageCount; i++)
    {
        const imageRef = ref(storage, `images/${id}-${i}`)
        await deleteObject(imageRef)
    }

    const imageURLs = await Promise.all(Array.from(images).map(async (image, index) =>
    {
        const imageRef = ref(storage, `images/${id}-${index}`)
        await uploadBytes(imageRef, image)
        return await getDownloadURL(imageRef)
    }))
    console.log(id)
    await updateDoc(doc(collection(firestore, 'products'), id), { name, description, category, usage, size, unit, pricePerUnit, packagePrice, stock, images: imageURLs })
    return id
}

// Delete a product from Firestore - delete all images associated with the product
export async function deleteProduct(id: string, imageCount: number)
{
    for (let i = 0; i < imageCount; i++)
    {
        const imageRef = ref(storage, `images/${id}-${i}`)
        await deleteObject(imageRef)
    }
    await deleteDoc(doc(collection(firestore, 'products'), id))
}

// Get all tags from Firestore
export async function getTags(): Promise<{ [key: string]: string[] }>
{
    const docRef = doc(firestore, 'misc', 'tags')
    const docSnap = await getDoc(docRef)
    return docSnap.data() as { [key: string]: string[] }
}

// Add a new tag to Firestore
export async function addTag(type: string, tag: string)
{
    const docRef = doc(firestore, 'misc', 'tags')
    await updateDoc(docRef, { [type]: arrayUnion(tag) })
}

// Delete a tag from Firestore
export async function deleteTag(type: string, tag: string)
{
    const docRef = doc(firestore, 'misc', 'tags')
    await updateDoc(docRef, { [type]: arrayRemove(tag) })
}