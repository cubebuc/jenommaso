import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, deleteDoc, DocumentData, arrayUnion, arrayRemove } from 'firebase/firestore'
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
// const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

export async function getProducts(): Promise<{ [key: string]: any }>
{
    const querySnapshot = await getDocs(collection(firestore, 'products'))
    const products: { [key: string]: DocumentData } = {}
    querySnapshot.forEach(doc => products[doc.id] = doc.data())
    return products
}

export async function addProduct(name: string, description: string, category: string[], usage: string[], price: number, stock: number, image: File): Promise<string>
{
    const docRef = doc(collection(firestore, 'products'))
    const imageRef = ref(storage, `images/${docRef.id}`)
    await uploadBytes(imageRef, image)
    await setDoc(docRef, { name, description, category, usage, price, stock, image: await getDownloadURL(imageRef) })
    return docRef.id
}

export async function deleteProduct(id: string)
{
    const imageRef = ref(storage, `images/${id}`)
    await deleteObject(imageRef)
    await deleteDoc(doc(collection(firestore, 'products'), id))
}

export async function getTags(): Promise<{ [key: string]: string[] }>
{
    const docRef = doc(firestore, 'misc', 'tags')
    const docSnap = await getDoc(docRef)
    return docSnap.data() as { [key: string]: string[] }
}

export async function addTag(type: string, tag: string)
{
    const docRef = doc(firestore, 'misc', 'tags')
    await setDoc(docRef, { [type]: arrayUnion(tag) }, { merge: true })
}

export async function deleteTag(type: string, tag: string)
{
    const docRef = doc(firestore, 'misc', 'tags')
    await setDoc(docRef, { [type]: arrayRemove(tag) }, { merge: true })
}